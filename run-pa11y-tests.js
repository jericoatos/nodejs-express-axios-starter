const pa11y = require('pa11y');

async function runPa11y() {
    const results = await pa11y('https://jd5pri3k2r.eu-west-1.awsapprunner.com');
    console.log(results);
}

runPa11y();
