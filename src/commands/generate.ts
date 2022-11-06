import { getAddress } from 'ethers/lib/utils';
import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { ProgramOptions } from '../common/program-options';
import { generateContracts } from '../generate-contracts';
import { NetworkTypes } from '../networks/network-types';
import { CommandTypes } from './command-types';

const help = Helpers.getHelpMessageByCommandType(CommandTypes.generate);

export = {
  async action(cmd: ProgramOptions): Promise<void> {
    if (!cmd.command || cmd.command.length === 0) {
      return Logger.log(help);
    }

    console.log('cmd', cmd);

    let address;

    try {
      address = getAddress(cmd.command);
    } catch (error) {
      return Logger.error('Invalid contract address');
    }

    try {
      await generateContracts(NetworkTypes.eth_main, address);
    } catch (error: any) {
      Logger.error('Could not fetch contracts. Please try again.');
      Logger.error(error.message);
    }
  },
};
