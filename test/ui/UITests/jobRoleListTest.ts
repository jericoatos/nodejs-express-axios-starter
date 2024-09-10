import chai from 'chai';
const expect = chai.expect;
import { Builder, By} from 'selenium-webdriver';
import 'mocha';
describe('List of Job Roles', function () {
    describe('Local Job Roles - Not Logged In', function () {
            it('should display Login Error Message', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('http://localhost:3000/');
                    await driver.sleep(500);
                    await driver.findElement(By.id('careerslink')).click();
                    await driver.sleep(500);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('http://localhost:3000/loginErrorMessage');

                } finally {
                    await driver.quit();
                }
            });
    });
    describe('Local Job Roles - Logged In', function () {
            it('should display list of Job Roles', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('http://localhost:3000/loginForm');
                    await driver.findElement(By.id('email')).sendKeys('user@email.com');
                    await driver.findElement(By.id('password')).sendKeys('regularU$er123');
                    await driver.sleep(500);
                    await driver.findElement(By.id('submit')).click();
                    await driver.sleep(500);
                    await driver.findElement(By.id('careerslink')).click();
                    await driver.sleep(500);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('http://localhost:3000/job-roles');

                } finally {
                    await driver.quit();
                }
            });
    });
    describe('AWS Job Roles - Not Logged In', function () {
            it('should display Login Error Message', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('https://jd5pri3k2r.eu-west-1.awsapprunner.com');
                    await driver.sleep(500);
                    await driver.findElement(By.id('careerslink')).click();
                    await driver.sleep(500);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('https://jd5pri3k2r.eu-west-1.awsapprunner.com/loginErrorMessage');

                } finally {
                    await driver.quit();
                }
            });
    });
    describe('AWS Job Roles - Logged In', function () {
            it('should display list of Job Roles', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('https://jd5pri3k2r.eu-west-1.awsapprunner.com/loginForm');
                    await driver.findElement(By.id('email')).sendKeys('user@email.com');
                    await driver.findElement(By.id('password')).sendKeys('regularU$er123');
                    await driver.sleep(500);
                    await driver.findElement(By.id('submit')).click();
                    await driver.sleep(500);
                    await driver.findElement(By.id('careerslink')).click();
                    await driver.sleep(500);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('https://jd5pri3k2r.eu-west-1.awsapprunner.com/job-roles');

                } finally {
                    await driver.quit();
                }
            });
    });
})
