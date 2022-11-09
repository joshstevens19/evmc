import { CommandTypes } from '../commands/command-types';
import { generateHelpMessages, HelpMessage } from '../commands/help-messages';
import { ProgramOptions } from './program-options';
import yargs = require('yargs');

export default class Helpers {
  /**
   * This will get all the program arguments
   */
  public static getProgramArguments(): ProgramOptions {
    // tslint:disable-next-line: typedef
    const {
      _: [command, ...subcommands],
      ...options
    } = yargs.argv;
    return {
      command: command as string,
      options: Object.keys(options).reduce((r, v) => {
        // @ts-ignore
        r[v] = options[v];
        return r;
      }, {}),
      subcommands: subcommands as string[],
    };
  }

  /**
   * Gets the help message by the command type
   * @param commandType The command type
   */
  public static getHelpMessageByCommandType(commandType: CommandTypes): string {
    switch (commandType) {
      case CommandTypes.get:
        return this.buildUpHelpMessage(generateHelpMessages);
      default:
        throw new Error('No help message for this command');
    }
  }

  /**
   * Builds the help message up
   * @param helpMessage The help message object
   */
  public static buildUpHelpMessage(helpMessage: HelpMessage): string {
    let message = `Usage: ${helpMessage.usage}`;

    if (helpMessage.commands.length > 0) {
      message += '\n\nCommands:\n';
      for (let i = 0; i < helpMessage.commands.length; i++) {
        message += `    ${helpMessage.commands[i]}\n`;
      }
    } else {
      message += '\n';
    }

    message += '\nExamples:\n';

    for (let i = 0; i < helpMessage.examples.length; i++) {
      message += `    $ ${helpMessage.examples[i]}\n`;
    }

    return message;
  }

  /**
   * Remove all white spaces
   * @param value The value
   */
  public static removeAllWhiteSpace(value: string): string {
    return value.replace(/\s+/g, '');
  }

  /**
   * Deep clone a object
   * @param object The object
   */
  public static deepClone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
