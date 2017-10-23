#!/usr/bin/env node

const program = require('commander');

program
  .command('build-client')
  .description('build client code by webpack')
  .action(() => {
    const webpackProdConfig = require('./webpack-prod-config.js');
    const compiler = require('webpack')(webpackProdConfig);

    compiler.run((err) => {
      if (err) console.error(err);
    });
  });

if (!process.argv.slice(1).length) {
  program.help();
}

program.parse(process.argv);
