export interface HelpMessage {
  commands: string[];
  examples: string[];
  usage: string;
}

export const generateHelpMessages: HelpMessage = {
  commands: [],
  examples: ['ethereum-abi-types-generator <abiFileLocation>'],
  usage: 'ethereum-abi-types-generator <abiFileLocation>',
};
