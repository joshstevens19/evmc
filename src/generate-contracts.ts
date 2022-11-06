import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { DevelopmentKitTypes } from './development-kits/development-kit-types';
import { generateHardhatProject } from './development-kits/hardhat';
import { EtherscanCodeResult } from './etherscan-code-result';
import { networkToOrigin } from './networks/network-to-origin';
import { NetworkTypes } from './networks/network-types';

const _isSingleContract = (contractInfo: EtherscanCodeResult) => {
  return contractInfo.SourceCode.substring(0, 1) !== '{';
};

const _generateDirectoryFoundations = async (
  contractInfo: EtherscanCodeResult
) => {
  await fs.rm(contractInfo.ContractName, { recursive: true, force: true });
  await fs.mkdir(contractInfo.ContractName);

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'ABI.json'),
    contractInfo.ABI,
    'utf8'
  );
};

const _getSourceCode = async (network: NetworkTypes, address: string) => {
  const response = await fetch(
    `${networkToOrigin(
      network
    )}/api?module=contract&action=getsourcecode&address=${address}&apikey=75H438D1KX861D9S2J33BNJDBPAM99N2ZJ`
  );

  const data = await response.json();

  // always be [0] as we only ever pass in 1 address
  const contractInfo: EtherscanCodeResult = data.result[0];

  return contractInfo;
};

const _generateSingleContract = async (contractInfo: EtherscanCodeResult) => {
  await _generateDirectoryFoundations(contractInfo);

  await fs.mkdir(path.join(contractInfo.ContractName, 'contracts'));

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'contracts', 'contract.sol'),
    contractInfo.SourceCode,
    'utf8'
  );
};

export interface GenerateContractsOptions {
  network: NetworkTypes;
  address: string;
  developmentKit?: DevelopmentKitTypes;
}

export const generateContracts = async (options: GenerateContractsOptions) => {
  const contractInfo: EtherscanCodeResult = await _getSourceCode(
    options.network,
    options.address
  );

  const isSingleContract = _isSingleContract(contractInfo);

  if (isSingleContract) {
    return await _generateSingleContract(contractInfo);
  }

  const sourceCode: {
    language: string;
    sources: Record<string, { content: string }>;
  } = JSON.parse(
    contractInfo.SourceCode.substring(1, contractInfo.SourceCode.length - 1)
  );

  await fs.writeFile('debug.json', JSON.stringify(sourceCode), 'utf8');

  if (sourceCode.language !== 'Solidity') {
    throw new Error('Not a Solidity contract');
  }

  await _generateDirectoryFoundations(contractInfo);

  // loop through object
  for (const [key, value] of Object.entries(sourceCode.sources)) {
    const dictionarySegments = key.split('/');
    // remove .sol name
    dictionarySegments.pop();

    await fs.mkdir(
      path.join(contractInfo.ContractName, dictionarySegments.join('/')),
      {
        recursive: true,
      }
    );

    await fs.writeFile(
      path.join(contractInfo.ContractName, key),
      value.content
    );
  }

  if (options.developmentKit === DevelopmentKitTypes.HARDHAT) {
    await generateHardhatProject(options.address, contractInfo);
  }
};
