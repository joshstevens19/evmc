import { defaultAbiCoder, parseBytes32String } from 'ethers/lib/utils';
import path from 'path';
import { ContractWriter } from '../../contract-writer';
import { EtherscanCodeResult } from '../../etherscan-code-result';

const buildHardhatConfig = (compilerVersion: string) => {
  const extractedVersion = compilerVersion.substring(
    1,
    compilerVersion.indexOf('+')
  );
  return `
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
solidity: "${extractedVersion}",
};

export default config;
    `;
};

const buildHardhatDeployScript = (
  contractName: string,
  abi: string,
  constructorArguments: string
) => {
  const constructorInput = JSON.parse(abi).find(
    (c: any) => c.type === 'constructor'
  ) as {
    inputs: { name: string; type: string }[];
  };

  const constructParams: string[] = constructorArguments.match(
    /.{1,64}/g
  ) as string[];

  const decodedParams = [];
  for (let i = constructorInput.inputs.length - 1; i >= 0; i--) {
    if (constructorInput.inputs[i]) {
      let result = '';

      if (constructorInput.inputs[i].type === 'string') {
        result = '0x' + constructParams[i];
      } else if (constructorInput.inputs[i].type === 'bytes') {
        result = parseBytes32String(constructParams[i]);
      } else {
        result = defaultAbiCoder.decode(
          [constructorInput.inputs[i].type],
          '0x' + constructParams[i]
        )[0];
      }

      decodedParams.push(`'${result}'`);
    }
  }

  let deployMethod = `${contractName}.deploy()`;
  if (decodedParams.length > 0) {
    deployMethod = `${contractName}.deploy(${decodedParams
      .reverse()
      .join(', ')})`;
  }

  return `
import { ethers } from 'hardhat';

async function main() {
  console.log('ethers version', ethers.version);

  // pre-filled with the constructor arguments and contracts
  const ${contractName} = await ethers.getContractFactory('${contractName}');
  const instance = await ${deployMethod};
  await instance.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
`;
};

const buildHardhatPackageJson = (contractName: string) => {
  return `
{
  "name": "${contractName.toLowerCase()}-hardhat-project",
  "scripts": {
      "compile": "hardhat compile",
      "node": "hardhat node",
      "deploy": "hardhat run --network localhost scripts/deploy.ts"
  },
  "devDependencies": {
      "@nomicfoundation/hardhat-toolbox": "^2.0.0",
      "hardhat": "^2.12.2"
  }
}
`;
};

const gitIgnore = `
node_modules
.env
coverage
coverage.json
typechain
typechain-types

#Hardhat files
cache
artifacts
`;

const readme = (contractAddress: string) => `
# Sample Hardhat Project

This project has created a basic Hardhat template using the contracts from address ${contractAddress}.

It has injected all the contracts into the contract file and built you a template so you can start using it.

## Getting Started

1. Install dependencies (npm install)
2. Compile the contracts (npm run compile)
3. Run locally (npm run node) and deploy the contract (npm run deploy)
4. Start coding, this is a basic template to get you started.
`;

const tsconfig = `
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
`;

const _writeHardhatScripts = async (
  contractInfo: EtherscanCodeResult,
  contractWriter: ContractWriter
) => {
  await contractWriter.mkdir('scripts');

  await contractWriter.writeFile(
    path.join('scripts', 'deploy.ts'),
    buildHardhatDeployScript(
      contractInfo.ContractName,
      contractInfo.ABI,
      contractInfo.ConstructorArguments
    ),
    true
  );
};

const _writeHardhatPackageJson = async (
  contractInfo: EtherscanCodeResult,
  contractWriter: ContractWriter
) => {
  await contractWriter.writeFile(
    'package.json',
    buildHardhatPackageJson(contractInfo.ContractName)
  );
};

const _writeHardhatConfig = async (
  contractInfo: EtherscanCodeResult,
  contractWriter: ContractWriter
) => {
  await contractWriter.writeFile(
    'hardhat.config.ts',
    buildHardhatConfig(contractInfo.CompilerVersion),
    true
  );
};

const _writeHardhatGitIgnore = async (contractWriter: ContractWriter) => {
  await contractWriter.writeFile('.gitignore', gitIgnore);
};

const _writeHardhatTsConfig = async (contractWriter: ContractWriter) => {
  await contractWriter.writeFile('tsconfig.json', tsconfig);
};

const _writeHardhatReadme = async (
  address: string,
  contractWriter: ContractWriter
) => {
  await contractWriter.writeFile('README.md', readme(address));
};

export const generateHardhatProject = async (
  address: string,
  contractInfo: EtherscanCodeResult,
  contractWriter: ContractWriter
) => {
  await Promise.all([
    _writeHardhatScripts(contractInfo, contractWriter),
    _writeHardhatPackageJson(contractInfo, contractWriter),
    _writeHardhatConfig(contractInfo, contractWriter),
    _writeHardhatGitIgnore(contractWriter),
    _writeHardhatTsConfig(contractWriter),
    _writeHardhatReadme(address, contractWriter),
  ]);
};
