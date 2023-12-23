const { exec } = require('child_process');

async function requestLinkedinFromMention(title, content) {
    exec('python scraping/getMention.py', (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing command: ${error}`);
          return;
      }
      return stdout;
  });
}

const result = requestLinkedinFromMention();

console.log("result: ", result);