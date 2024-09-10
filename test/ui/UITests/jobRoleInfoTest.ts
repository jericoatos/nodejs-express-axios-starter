import chai from 'chai';
const expect = chai.expect;
import { Builder, By} from 'selenium-webdriver';
import 'mocha';
describe('Job Role Information', function () {
    describe('LocalHost Job Role Information', function () {
            it('Should display relevant Job Role Information', async function loginTest() {
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

			        const element = await driver.findElement(By.xpath("//table[@id='jobRoleListTable']/tbody/tr/td/a"));
			        const href = await element.getAttribute('href');

                    await driver.findElement(By.xpath("//table[@id='jobRoleListTable']/tbody/tr/td/a")).click();
                    await driver.sleep(1000);

                    const regex = /\d$/;
                    expect(href).to.match(regex, 'URL does not end with the ID number');

                } finally {
                    await driver.quit();
                }
            });
    });
    describe('AWS Job Role Information', function () {
                it('Should display relevant Job Role Information', async function loginTest() {
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

                        const element = await driver.findElement(By.xpath("//table[@id='jobRoleListTable']/tbody/tr/td/a"));
                        const href = await element.getAttribute('href');

                        await driver.findElement(By.xpath("//table[@id='jobRoleListTable']/tbody/tr/td/a")).click();
                        await driver.sleep(1000);

                        const regex = /\d$/;
                        expect(href).to.match(regex, 'URL does not end with the ID number');

                    } finally {
                        await driver.quit();
                    }
                });
        });
})
