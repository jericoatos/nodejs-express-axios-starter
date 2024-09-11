import chai from 'chai';
const expect = chai.expect;
import { Builder, By} from 'selenium-webdriver';
import 'mocha';


describe('Home Button Test', function () {
    describe('LocalHost - Home Button Test', function () {
            it('Should return to homepage', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('http://localhost:3000');
                    await driver.sleep(500);
                    await driver.findElement(By.id('login')).click();
                    await driver.sleep(500);
                    await driver.findElement(By.id('KainoslogoLink')).click();
                    await driver.sleep(1000);
                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('http://localhost:3000/');
                } finally {
                    await driver.quit();
                }
            });
    });
    describe('AWS - Home Button Test', function () {
        it('Should return to homepage', async function loginTest() {
            this.timeout(15000);
               const driver = await new Builder().forBrowser("chrome").build();
               try {
                    await driver.get('https://jd5pri3k2r.eu-west-1.awsapprunner.com');
                    await driver.sleep(500);
                    await driver.findElement(By.id('login')).click();
                    await driver.sleep(500);
                    await driver.findElement(By.id('KainoslogoLink')).click();
                    await driver.sleep(1000);
                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('https://jd5pri3k2r.eu-west-1.awsapprunner.com/');
                } finally {
                    await driver.quit();
                }
            });
        });
})
