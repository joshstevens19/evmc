#!/usr/bin/env node

import 'reflect-metadata';
import { execute } from './execute';

// we can create typings for this but its just getting the version
// if we import it then it wants the package.json in the src folder
// which we dont want
// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

(async () => {
  await execute(packageJson.version);
})().catch((err) => console.error(err.message));
