import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { ProgramOptions } from '../common/program-options';
import { NetworkTypes } from '../networks/network-types';
import { CommandTypes } from './command-types';

const help = Helpers.getHelpMessageByCommandType(CommandTypes.networks);

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

    Logger.log('supported networks:');
    Logger.log('');
    for (const network of (<any>Object).values(NetworkTypes)) {
      Logger.log(network);
    }
  },
};
