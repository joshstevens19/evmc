import commands from '../commands';
import { CommandTypes } from '../commands/command-types';
import { generateHelpMessages } from '../commands/help-messages';
import Helpers from '../common/helpers';
import { Logger } from '../common/logger';

/**
 * Execute the CLI commands
 * @param packageVersion The package version
 */
export async function execute(packageVersion: string): Promise<void> {
  const args = Helpers.getProgramArguments();

  if (args.command === 'version' || args.options.v || args.options.version) {
    return Logger.log(packageVersion);
  }

  if (
    args.command === 'help' ||
    (!args.command && args.options.help) ||
    (!args.command && args.options.h)
  ) {
    return Logger.log(Helpers.buildUpHelpMessage(generateHelpMessages));
  }

  switch (args.command) {
    case CommandTypes.get:
      return await commands.get.action(args);
    case CommandTypes.networks:
      return await commands.networks.action(args);
    default:
      return Logger.error("unsupported command, try 'help'");
  }
}
