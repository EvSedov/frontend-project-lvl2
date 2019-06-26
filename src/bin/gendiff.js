#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../gendiff';

commander
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    genDiff(firstConfig, secondConfig);
  });

commander.parse(process.argv);