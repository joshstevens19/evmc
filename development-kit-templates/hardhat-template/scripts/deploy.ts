import { ethers } from 'hardhat';

async function main() {
  console.log('ethers version', ethers.version);

  // example in how to deploy replace with your own mappings
  const CErc20Delegator = await ethers.getContractFactory('CErc20Delegator');
  const instance = await CErc20Delegator.deploy();
  await instance.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
