const HOST = process.argv[2];
const FILEPATH = process.argv[3];
const fs = require('fs');
const request = require('request');
const chalk = require('chalk');

console.log(HOST, FILEPATH);

request(HOST, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  fs.open(FILEPATH, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(chalk.red(`${FILEPATH} already exists`));
        return;
      }
  
      throw err;
    }
    fs.write(fd, body, (err) => {
      if (err) console.error(chalk.bgRed('Scream incoherently because file didn\t write!'));
      if (!err) console.log(`Downloaded and saved ${chalk.green(body.length)} bytes to ${chalk.magenta(FILEPATH)}`);
    });
  });
});
