const pa11y = require('pa11y');

// List of URLs to test
const urls = [
    'https://jd5pri3k2r.eu-west-1.awsapprunner.com/',
    'https://jd5pri3k2r.eu-west-1.awsapprunner.com/job-roles'
];

(async () => {
    for (const url of urls) {
        console.log(`Running accessibility test for ${url}`);
        const results = await pa11y(url);
        console.log(results);
    }
})();
