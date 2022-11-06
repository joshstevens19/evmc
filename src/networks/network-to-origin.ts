import { NetworkTypes } from './network-types';

export const networkToOrigin = (network: NetworkTypes): string => {
  // switch all networks
  switch (network) {
    case NetworkTypes.eth_main:
      return 'https://api.etherscan.io/';
    case NetworkTypes.eth_goerli:
      return 'https://api-goerli.etherscan.io/';
    case NetworkTypes.eth_kovan:
      return 'https://api-kovan.etherscan.io/';
    case NetworkTypes.eth_rinkeby:
      return 'https://api-rinkeby.etherscan.io/';
    case NetworkTypes.eth_ropston:
      return 'https://api-ropsten.etherscan.io/';
    case NetworkTypes.eth_sepolia:
      return 'https://api-sepolia.etherscan.io/';
    case NetworkTypes.avalance:
      return 'https://api.snowtrace.io/';
    case NetworkTypes.avalance_testnet:
      return 'https://api-testnet.snowtrace.io/';
    case NetworkTypes.polygon:
      return 'https://api.polygonscan.com/';
    case NetworkTypes.mumbai:
      return 'https://api-testnet.polygonscan.com/';
    case NetworkTypes.optimism:
      return 'https://api-optimistic.etherscan.io/';
    case NetworkTypes.optimism_goerli:
      return 'https://api-goerli-optimistic.etherscan.io/';
    case NetworkTypes.fantom:
      return 'https://api.ftmscan.com/';
    case NetworkTypes.fantom_testnet:
      return 'https://api-testnet.ftmscan.com/';
    case NetworkTypes.arbitrum:
      return 'https://api.arbiscan.io/';
    case NetworkTypes.arbitrum_goerli:
      return 'https://api-goerli.arbiscan.io/';
    case NetworkTypes.bsc:
      return 'https://api.bscscan.com/';
    case NetworkTypes.bsc_testnet:
      return 'https://api-testnet.bscscan.com/';
    case NetworkTypes.cronos:
      return 'https://api.cronoscan.com/';
    case NetworkTypes.cronos_testnet:
      return 'https://api-testnet.cronoscan.com/';
  }
};
