#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

commander
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'plain')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, commander.format);
    console.dir(result, { showHidden: false, depth: null, colors: true });
  });

commander.parse(process.argv);
