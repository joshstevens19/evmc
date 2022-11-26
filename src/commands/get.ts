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
    if (
      !cmd.command ||
      cmd.command.length === 0 ||
      cmd.options.help ||
      cmd.options.h
    ) {
      return Logger.log(help);
    }

    let network = cmd.subcommands[0] as NetworkTypes;
    if (!(<any>Object).values(NetworkTypes).includes(network)) {
      Logger.error('Invalid network please use one of the following:');

      for (const network of (<any>Object).values(NetworkTypes)) {
        Logger.error(network);
      }

      return;
    }

    let address;

    try {
      address = getAddress(cmd.subcommands[1]);
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
      Logger.log('Generating contract files...');
      await generateContracts({
        network,
        address,
        outputLocation: cmd.options.output,
        developmentKit,
      });
      Logger.log('Generated contract files successfully');
    } catch (error) {
      Logger.error((<Error>error).message);
    }
  },
};
