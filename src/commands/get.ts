import { getAddress } from 'ethers/lib/utils';
import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { ProgramOptions } from '../common/program-options';
import { DevelopmentKitTypes } from '../development-kits/development-kit-types';
import { generateContracts } from '../get-contracts';
import { NetworkTypes } from '../networks/network-types';
import { CommandTypes } from './command-types';

const help = Helpers.getHelpMessageByCommandType(CommandTypes.get);

export = {
  async action(cmd: ProgramOptions): Promise<void> {
    if (!cmd.command || cmd.command.length === 0) {
      return Logger.log(help);
    }

    console.log('cmd', cmd);

    let address;

    try {
      address = getAddress(cmd.subcommands[0]);
    } catch (error) {
      return Logger.error('Invalid contract address');
    }

    let developmentKit: DevelopmentKitTypes | undefined = undefined;
    if (cmd.options.hardhat) {
      developmentKit = DevelopmentKitTypes.HARDHAT;
    } else if (cmd.options.foundry) {
      developmentKit = DevelopmentKitTypes.FOUNDRY;
    }

    try {
      await generateContracts({
        network: NetworkTypes.eth_main,
        address,
        developmentKit,
      });
    } catch (error) {
      Logger.error((<Error>error).message);
    }
  },
};
