const fs = require('fs');
const pa11y = require('pa11y');

const config = {
    defaults: {
        concurrency: 1,
        standard: 'WCAG2AA',
        runner: ['axe'],
        chromeLaunchConfig: {
            args: ['--no-sandbox']
        },
        timeout: 60000
    },
    urls: [
        'https://jd5pri3k2r.eu-west-1.awsapprunner.com/',
        'https://jd5pri3k2r.eu-west-1.awsapprunner.com/job-roles'
    ]
};

async function runPa11y() {
    for (const url of config.urls) {
        try {
            console.log(`Running Pa11y tests on ${url}`);
            const results = await pa11y(url, config.defaults);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `pa11y-results-${url.replace(/https?:\/\//, '').replace(/[\/:]/g, '-')}-${timestamp}.json`;
            fs.writeFileSync(fileName, JSON.stringify(results, null, 2));
            console.log(`Results saved to ${fileName}`);
        } catch (error) {
            console.error(`Error running Pa11y on ${url}:`, error);
        }
    }
}

runPa11y().catch(error => {
    console.error('Error running Pa11y tests:', error);
});
