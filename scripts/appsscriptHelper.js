#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

const filePath = __dirname + '/../appsscript.json';

const executeOptions = ['USER_DEPLOYING', 'USER_ACCESSING'];
const accessOptions = ['MYSELF', 'ANYONE', 'ANYONE_ANONYMOUS', 'DOMAIN'];
// NOTE: execute 'USER_ACCESSING' and access 'ANYONE_ANONYMOUS' is does not work

yargs(hideBin(process.argv))
  // webapp
  .command({
    command: 'webapp',
    describe: 'Change webapp access and execute options',
    builder: {
      execute: {
        type: 'string',
        choices: executeOptions,
        default: 'USER_DEPLOYING',
      },
      access: {
        type: 'string',
        choices: accessOptions,
        default: 'MYSELF',
      },
    },
    handler: (argv) => {
      if (
        argv.execute === 'USER_ACCESSING' &&
        argv.access === 'ANYONE_ANONYMOUS'
      ) {
        console.error(
          'ERROR: execute "USER_ACCESSING" and access "ANYONE_ANONYMOUS" can no be combined.'
        );
        process.exit(1);
      }
      let rawData = fs.readFileSync(filePath);
      let appscript = JSON.parse(rawData);

      appscript['webapp'] = {
        executeAs: argv.execute,
        access: argv.access,
      };

      fs.writeFileSync(filePath, JSON.stringify(appscript, null, 4));
    },
  })
  // timezone
  .command({
    command: 'timezone [timezone]',
    describe: 'Change timezone',
    builder: (yargs) => {
      return yargs.positional('timezone', {
        describe: 'Timezone to use. ex.: Europe/Berlin',
        default: 'Europe/Berlin',
      });
    },
    handler: (argv) => {
      let rawData = fs.readFileSync(filePath);
      let appscript = JSON.parse(rawData);

      appscript['timeZone'] = argv.timezone;

      fs.writeFileSync(filePath, JSON.stringify(appscript, null, 4));
    },
  })
  .demandCommand()
  .parse();
