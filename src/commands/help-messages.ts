export interface HelpMessage {
  commands: string[];
  examples: string[];
  usage: string;
}

export const generateHelpMessagesGet: HelpMessage = {
  commands: [],
  examples: [
    'evmc get <network> <contractAddress>',
    'evmc get <network> <contractAddress> --hardhat',
    'evmc get <network> <contractAddress> --hardhat --output=PATH_DIRECTORY',
    'evmc get <network> <contractAddress> --output=PATH_DIRECTORY',
  ],
  usage:
    'evmc get <network> <contractAddress> [--hardhat] [--output=PATH_DIRECTORY]',
};

export const generateHelpMessagesNetworks: HelpMessage = {
  commands: [],
  examples: ['evmc networks'],
  usage: 'evmc networks',
};

export const generateHelpMessages: HelpMessage = {
  commands: [],
  examples: [
    ...generateHelpMessagesGet.examples,
    ...generateHelpMessagesNetworks.examples,
  ],
  usage: `
    ${generateHelpMessagesGet.usage}
    ${generateHelpMessagesNetworks.usage}
    `,
};
