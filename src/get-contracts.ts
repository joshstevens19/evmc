import fetch from 'node-fetch';
import path from 'path';
import { ContractWriter } from './contract-writer';
import { DevelopmentKitTypes } from './development-kits/development-kit-types';
import { generateHardhatProject } from './development-kits/hardhat';
import { EtherscanCodeResult } from './etherscan-code-result';
import { networkToApiSettings } from './networks/network-to-api-settings';
import { NetworkTypes } from './networks/network-types';

const _isSingleContract = (contractInfo: EtherscanCodeResult) => {
  return contractInfo.SourceCode.substring(0, 1) !== '{';
};

const _getSourceCode = async (network: NetworkTypes, address: string) => {
  const apiSettings = networkToApiSettings(network);
  const response = await fetch(
    `${apiSettings.endpointOrigin}api?module=contract&action=getsourcecode&address=${address}&apikey=${apiSettings.apiKey}`
  );

  const data = await response.json();

  // always be [0] as we only ever pass in 1 address
  const contractInfo: EtherscanCodeResult = data.result[0];

  return contractInfo;
};

const _getSingleContract = async (
  contractInfo: EtherscanCodeResult,
  contractWriter: ContractWriter
) => {
  await contractWriter.mkdir('contracts');

  await contractWriter.writeFile(
    path.join('contracts', 'contract.sol'),
    contractInfo.SourceCode
  );
};

const _getMultifileContract = async (
  contractInfo: EtherscanCodeResult,
  contractWriter: ContractWriter
) => {
  const sourceCode: {
    language: string;
    sources: Record<string, { content: string }>;
  } = JSON.parse(
    contractInfo.SourceCode.substring(1, contractInfo.SourceCode.length - 1)
  );

  // await fs.writeFile('debug.json', JSON.stringify(sourceCode), 'utf8');

  if (sourceCode.language !== 'Solidity') {
    throw new Error('Not a Solidity contract');
  }

  // loop through object
  for (const [key, value] of Object.entries(sourceCode.sources)) {
    const dictionarySegments = key.split('/');
    // remove .sol name
    dictionarySegments.pop();

    await contractWriter.mkdir(dictionarySegments);
    await contractWriter.writeFile(key, value.content);
  }
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

  if (contractInfo.SourceCode.length === 0) {
    throw new Error('Contract source code not verified');
  }

  const contractWriter = new ContractWriter(contractInfo.ContractName);

  const isSingleContract = _isSingleContract(contractInfo);

  if (isSingleContract) {
    await _getSingleContract(contractInfo, contractWriter);
  } else {
    await _getMultifileContract(contractInfo, contractWriter);
  }

  if (!options.developmentKit) {
    await contractWriter.writeFile('ABI.json', contractInfo.ABI);
    return;
  }

  if (options.developmentKit === DevelopmentKitTypes.HARDHAT) {
    await generateHardhatProject(options.address, contractInfo, contractWriter);
  }
};
