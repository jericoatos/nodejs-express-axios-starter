import chai from 'chai';
const expect = chai.expect;
import { Builder, By} from 'selenium-webdriver';
import 'mocha';
describe('List of Job Roles', function () {
    describe('LocalHost Job Roles', function () {
            it('should display list of Job Roles', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('http://localhost:3000');
                    await driver.sleep(1000);
                    await driver.findElement(By.id('careerslink')).click();
                    await driver.sleep(1000);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('http://localhost:3000/job-roles');

                } finally {
                    await driver.quit();
                }
            });
    });
    describe('AWS Job Roles', function () {
            it('should display list of Job Roles', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('https://jd5pri3k2r.eu-west-1.awsapprunner.com');
                    await driver.sleep(2000);
                    await driver.findElement(By.id('careerslink')).click();
                    await driver.sleep(1000);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('https://jd5pri3k2r.eu-west-1.awsapprunner.com/job-roles');

                } finally {
                    await driver.quit();
                }
            });
    });
})
