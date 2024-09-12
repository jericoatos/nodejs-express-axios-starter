import pa11y from 'pa11y';

// Define the URLs you want to test
const urls = [
    "https://jd5pri3k2r.eu-west-1.awsapprunner.com/",
    "https://jd5pri3k2r.eu-west-1.awsapprunner.com/job-roles",
    "https://jd5pri3k2r.eu-west-1.awsapprunner.com/loginForm",
    "http://localhost:3000/",
    "http://localhost:3000/quiz",
    "http://localhost:3000/loginErrorMessage",
    "http://localhost:3000/loginForm"
];

async function runPa11y() {
    for (const url of urls) {
        try {
            const results = await pa11y(url);
            console.log(`Results for ${url}:`);
            console.log(results);
        } catch (error) {
            console.error(`Error testing ${url}:`, error);
        }
    }
}

runPa11y();
