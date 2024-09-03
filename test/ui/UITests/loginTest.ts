import chai from 'chai';
const expect = chai.expect;
import { Builder, By} from 'selenium-webdriver';
import 'mocha';

describe('Login', function () {
        it('should go back to login page', async function loginTest() {
            this.timeout(15000);
            const driver = await new Builder().forBrowser("chrome").build();
            try {
                await driver.get('http://localhost:3000');
                await driver.sleep(1000);
                await driver.findElement(By.id('login')).click();
                await driver.findElement(By.id('email')).sendKeys('user@email.com');
                await driver.findElement(By.id('password')).sendKeys('regularU$er123');
                await driver.sleep(1000);
                await driver.findElement(By.id('submit')).click();
                await driver.sleep(1000);
                await driver.findElement(By.id('logout-button')).click();
                await driver.sleep(1000);

                const currentUrl = await driver.getCurrentUrl();
                expect(currentUrl).to.equal('http://localhost:3000/loginForm');

            } finally {
                await driver.quit();
            }
        });
})