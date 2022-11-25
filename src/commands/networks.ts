import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { ProgramOptions } from '../common/program-options';
import { NetworkTypes } from '../networks/network-types';
import { CommandTypes } from './command-types';

const help = Helpers.getHelpMessageByCommandType(CommandTypes.get);

export = {
  async action(cmd: ProgramOptions): Promise<void> {
    if (!cmd.command || cmd.command.length === 0) {
      return Logger.log(help);
    }

    console.log('cmd', cmd);

    Logger.log('supported networks:');
    Logger.log('');
    for (const network of (<any>Object).values(NetworkTypes)) {
      Logger.log(network);
    }
  },
};
