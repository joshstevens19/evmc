[![npm version](https://badge.fury.io/js/evmcontracts.svg)](https://badge.fury.io/js/evmcontracts)
![downloads](https://img.shields.io/npm/dw/evmcontracts)

# evm-contract-fetch (evmc)

When browsing any evm blockchain, it is often useful to be able to see the source code of a contract. This is especially true when trying to understand the behavior of a contract, or when trying to verify the behavior of a contract. This tool allows you to fetch the source code of a contract from the blockchain, and create you the full project files for you to view in your editor, support to deploy on a local node, compile if you choose to. This uses etherscan API to grab the verified sources of the contract.

## Features 🚀

🚀 Fetch the source code of a contract from the blockchain and use it in your favourite editor
<br/>
🚀 Support for hardhat project instantly creating you a hardhat project template with the compile, deploy scripts and local node running all ready to go.
<br/>

## Chains Supported 🌐

🌐 Ethereum Mainnet - eth
<br/>
🌐 Ethereum Ropsten - eth_ropsten
<br/>
🌐 Ethereum Rinkeby - eth_rinkeby
<br/>
🌐 Ethereum Goerli - eth_goerli
<br/>
🌐 Ethereum Kovan - eth_kovan
<br/>
🌐 Binance Smart Chain Mainnet - bsc
<br/>
🌐 Binance Smart Chain Testnet - bsc_testnet
<br/>
🌐 Polygon Mainnet - polygon
<br/>
🌐 Polygon Mumbai - mumbai
<br/>
🌐 Avalanche C-Chain - avalanche
<br/>
🌐 Avalanche Fuji - avalance_testnet
<br/>
🌐 Fantom - fantom
<br/>
🌐 Fantom Testnet - fantom_testnet
<br/>
🌐 Optimism - optimism
<br/>
🌐 Optimism Goerli - optimism_goerli
<br/>
🌐 Arbitrum - arbitrum
<br/>
🌐 Arbitrum Goerli - arbitrum_goerli
<br/>
🌐 Cronos - cronos
<br/>
🌐 Cronos Testnet - cronos_testnet

## Installation

### npm:

```bash
$ npm install evmcontracts -g
```

### yarn:

```bash
$ yarn global add evmcontracts
```

## CLI usage

Once installed it will expose a command called `evmc` which can be executed anywhere.

### Get

please note when executing these commands it will create a folder with the name of the contract in the current directory you are in, unless you use `--output`

### Just contracts

To get just the contracts without any development tool:

```bash
$ evmc get <network> <contractAddress>
```

### Development toolset project setup

#### hardhat

To get the contract and setup a hardhat development environment, with deploy scripts and compiling ready to go:

```bash
$ evmc get <network> <contractAddress> --hardhat
```

#### foundry

incoming :)

### To change the output path

```bash
$ evmc get <network> <contractAddress> --output=PATH_DIRECTORY
```

### Incoming features

The following features are coming soon:

🚀 support foundry development kit
<br/>
🚀 allow you to interact with the contract without downloading them on your machine
<br/>
🚀 ability to config your main network and development kit (to avoid repeating yourself)
<br/>
🚀 ability to fetch multiple contracts at once with a yaml file
