import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the new URL to add: ', (newUrl) => {
    const path = './Accessability/pa11y-config.json';
    const config = JSON.parse(fs.readFileSync(path, 'utf8'));
    config.urls.push(newUrl);
    fs.writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
    console.log('URL added successfully!');
    rl.close();
});
