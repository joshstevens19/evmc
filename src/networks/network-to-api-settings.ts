import { NetworkTypes } from './network-types';

export const networkToApiSettings = (
  network: NetworkTypes
): { apiKey: string; endpointOrigin: string } => {
  switch (network) {
    case NetworkTypes.eth_main:
      return {
        apiKey: '75H438D1KX861D9S2J33BNJDBPAM99N2ZJ',
        endpointOrigin: 'https://api.etherscan.io/',
      };
    case NetworkTypes.eth_goerli:
      return {
        apiKey: 'BMGYUPB41NU4MDUBZMWITTGQI77ETB5EV6',
        endpointOrigin: 'https://api-goerli.etherscan.io/',
      };
    case NetworkTypes.eth_kovan:
      return {
        apiKey: 'BMGYUPB41NU4MDUBZMWITTGQI77ETB5EV6',
        endpointOrigin: 'https://api-kovan.etherscan.io/',
      };
    case NetworkTypes.eth_rinkeby:
      return {
        apiKey: '75H438D1KX861D9S2J33BNJDBPAM99N2ZJ',
        endpointOrigin: 'https://api-rinkeby.etherscan.io/',
      };
    case NetworkTypes.eth_ropston:
      return {
        apiKey: 'BMGYUPB41NU4MDUBZMWITTGQI77ETB5EV6',
        endpointOrigin: 'https://api-ropsten.etherscan.io/',
      };
    case NetworkTypes.eth_sepolia:
      return {
        apiKey: '75H438D1KX861D9S2J33BNJDBPAM99N2ZJ',
        endpointOrigin: 'https://api-sepolia.etherscan.io/',
      };
    case NetworkTypes.avalance:
      return {
        apiKey: 'JT5QG7494HW6H4IYFUVFSMH7SHQD2EZP7B',
        endpointOrigin: 'https://api.snowtrace.io/',
      };
    case NetworkTypes.avalance_testnet:
      return {
        apiKey: 'DTDZ429FV1YYCEWZYDQAERB68KBVEH1AR1',
        endpointOrigin: 'https://api-testnet.snowtrace.io/',
      };
    case NetworkTypes.polygon:
      return {
        apiKey: 'BVR3511GFGJ3I8746AKATB7JJ4WN34MHZ1',
        endpointOrigin: 'https://api.polygonscan.com/',
      };
    case NetworkTypes.mumbai:
      return {
        apiKey: 'T5G3261WQSKXUYHJABS9ICZ8XEYU9AR6GW',
        endpointOrigin: 'https://api-testnet.polygonscan.com/',
      };
    case NetworkTypes.optimism:
      return {
        apiKey: 'ZHV8ABBC7HVF7V5D8RT2V4XY53MD4Q92NU',
        endpointOrigin: 'https://api-optimistic.etherscan.io/',
      };
    case NetworkTypes.optimism_goerli:
      return {
        apiKey: 'HCCIZN2A3YDWTI3HDIDGAWKY37QY9H8WTC',
        endpointOrigin: 'https://api-goerli-optimistic.etherscan.io/',
      };
    case NetworkTypes.fantom:
      return {
        apiKey: 'X5BRMACFH2C5AMZZZKVYMIT9R5DKSIBRNJ',
        endpointOrigin: 'https://api.ftmscan.com/',
      };
    case NetworkTypes.fantom_testnet:
      return {
        apiKey: '7KS9C669D7FJU2JKFXHQHEB21GXRNZQKGQ',
        endpointOrigin: 'https://api-testnet.ftmscan.com/',
      };
    case NetworkTypes.arbitrum:
      return {
        apiKey: 'B26V9KXSEWHXNPFHDMZX7Z8Q18CVBWFH41',
        endpointOrigin: 'https://api.arbiscan.io/',
      };
    case NetworkTypes.arbitrum_goerli:
      return {
        apiKey: 'ZUU7QBGTTWSXVFCUSDWKCZK57HYJHXF9UW',
        endpointOrigin: 'https://api-goerli.arbiscan.io/',
      };
    case NetworkTypes.bsc:
      return {
        apiKey: 'VXBQTFUWUGT31P8MIKTBW81Q9H69625XTN',
        endpointOrigin: 'https://api.bscscan.com/',
      };
    case NetworkTypes.bsc_testnet:
      return {
        apiKey: 'B1TBAM558UK8ZZMWETTI85DSF3XV6T3B6J',
        endpointOrigin: 'https://api-testnet.bscscan.com/',
      };
    case NetworkTypes.cronos:
      return {
        apiKey: '5X3Q11D81YY2P725GJA84UUZ1KAMZRHYHV',
        endpointOrigin: 'https://api.cronoscan.com/',
      };
    case NetworkTypes.cronos_testnet:
      return {
        apiKey: 'DV84PHAGN47EQ1YYY7RPHI28348NHXK8XU',
        endpointOrigin: 'https://api-testnet.cronoscan.com/',
      };
  }
};
