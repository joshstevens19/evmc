import { promises as fs } from 'fs';
import path from 'path';
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
  constructorArguments: string
) => {
  return `
import { ethers } from 'hardhat';

async function main() {
  console.log('ethers version', ethers.version);

  // pre-filled with the constructor arguments and contracts
  const ${contractName} = await ethers.getContractFactory('${contractName}');
  const instance = await ${contractName}.deploy('${constructorArguments}');
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
        "compile": "hardhat compile"
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
3. Start writing your tests (npm run test)
4. Start writing your scripts (npm run deploy)
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

export const generateHardhatProject = async (
  address: string,
  contractInfo: EtherscanCodeResult
) => {
  await fs.mkdir(path.join(contractInfo.ContractName, 'scripts'), {
    recursive: true,
  });

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'scripts', 'deploy.ts'),
    buildHardhatDeployScript(
      contractInfo.ContractName,
      contractInfo.ConstructorArguments
    ),
    'utf8'
  );

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'package.json'),
    buildHardhatPackageJson(contractInfo.ContractName),
    'utf8'
  );

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'hardhat.config.ts'),
    buildHardhatConfig(contractInfo.CompilerVersion),
    'utf8'
  );

  await fs.writeFile(
    path.join(contractInfo.ContractName, '.gitignore'),
    gitIgnore,
    'utf8'
  );

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'tsconfig.json'),
    tsconfig,
    'utf8'
  );

  await fs.writeFile(
    path.join(contractInfo.ContractName, 'README.md'),
    readme(address),
    'utf8'
  );
};
