[![npm version](https://badge.fury.io/js/evmcontracts.svg)](https://badge.fury.io/js/evmcontracts)

# evmc

When browsing any evm blockchain, it is often useful to be able to see the source code of a contract. This is especially true when trying to understand the behavior of a contract, or when trying to verify the behavior of a contract. You may be able to hack around and see it on etherscan but really you know your true home is your IDE (any IDE). This tool allows you to fetch the source code of a contract from the blockchain, and create you the full project files for you to view in YOUR IDE, support to deploy on a local node, compile if you choose to. This uses etherscan API to grab the verified sources of the contract.
It will keep the same directory structure as how the contract was deployed, alongside all of the dependencies it uses, the project evmc fetches for you will be ready to go!

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

already supported by the foundry team already it seems.. nice work!

### To change the output path

```bash
$ evmc get <network> <contractAddress> --output=PATH_DIRECTORY
```

### Incoming features

The following features are coming soon:

🚀 allow you to interact with the contract without downloading them on your machine
<br/>
🚀 ability to config your main network and development kit (to avoid repeating yourself)
<br/>
🚀 ability to fetch multiple contracts at once with a yaml file
<br/>
🚀 bring your own API key

### note

I have generated API keys so its plug and play but these are rate limited at 5 requests per second, this should be plenty as long as the tool does not used by thousands of people, these are free API keys so nobody has motive of stealing them. Above we bring a way to bring your own API key in anyway so if this ever happens we can migrate and make it best practice.
