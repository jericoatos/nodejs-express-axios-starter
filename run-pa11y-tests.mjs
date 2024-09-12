import pa11y from 'pa11y';

async function runPa11y() {
    const results = await pa11y('https://example.com');
    console.log(results);
}

runPa11y();
