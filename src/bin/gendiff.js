#!/usr/bin/env node
import commander from 'commander';

commander
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!commander.args.length) commander.help();
