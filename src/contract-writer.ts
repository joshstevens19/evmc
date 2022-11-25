import { existsSync, mkdirSync, promises as fs } from 'fs';
import path from 'path';
import prettierTS from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';

export class ContractWriter {
  constructor(
    private _contractName: string,
    private _outputLocation: string | undefined
  ) {
    const contractFolder = this._outputLocation
      ? path.join(this._outputLocation, this._contractName)
      : this._contractName;
    if (existsSync(contractFolder)) {
      throw new Error(
        `Contract project ${this._contractName} already exists. Please remove it or generate this in a different location.`
      );
    }

    mkdirSync(contractFolder);
  }

  private _joinPathContract(location: string): string {
    if (this._outputLocation) {
      return path.join(this._outputLocation, this._contractName, location);
    }
    return path.join(this._contractName, location);
  }

  public async mkdir(location: string[] | string): Promise<void> {
    await fs.mkdir(
      this._joinPathContract(
        Array.isArray(location) ? location.join('/') : location
      ),
      {
        recursive: true,
      }
    );
  }

  public async writeFile(
    fileLocation: string,
    content: string,
    formatFile = false
  ): Promise<void> {
    if (formatFile) {
      content = this._format(content);
    }
    await fs.writeFile(this._joinPathContract(fileLocation), content, 'utf8');
  }

  private _format(content: string) {
    return prettier.format(content, {
      parser: 'typescript',
      trailingComma: 'es5',
      singleQuote: true,
      bracketSpacing: true,
      printWidth: 80,
      plugins: [prettierTS],
    });
  }
}
