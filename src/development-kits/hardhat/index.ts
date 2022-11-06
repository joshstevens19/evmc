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

const buildHardhatPackageJson = (contractName: string) => {
  return `
    {
        "name": "${contractName.toLowerCase()}-hardhat-project",
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

const readme = `
# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It has injected all the contracts into the contract file and built you a template so you can start using it.
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
  contractInfo: EtherscanCodeResult
) => {
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
    readme,
    'utf8'
  );
};
