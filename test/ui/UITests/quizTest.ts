import chai from 'chai';
const expect = chai.expect;
import { Builder, By} from 'selenium-webdriver';
import 'mocha';


describe('Quiz Test', function () {
    describe('LocalHost Quiz Test', function () {
            it('Should display the result of AI Response', async function loginTest() {
                this.timeout(15000);
                const driver = await new Builder().forBrowser("chrome").build();
                try {
                    await driver.get('http://localhost:3000');
                    await driver.sleep(500);
                    await driver.findElement(By.id('quizlink')).click();
                    await driver.sleep(500);


                    for (let i = 0; i < 5; i++) {
                    await driver.findElement(By.id('answer')).click();
                    await driver.sleep(200);
                    await driver.findElement(By.id('button')).click();
                    await driver.sleep(200);
                    }
                    await driver.findElement(By.id('submitAnswers')).click();
                    await driver.sleep(2000);

                    const currentUrl = await driver.getCurrentUrl();
                    expect(currentUrl).to.equal('http://localhost:3000/resultJob');

                } finally {
                    await driver.quit();
                }
            });
    });
    describe('AWS Quiz Test', function () {
        it('Should display the result of AI Response', async function loginTest() {
            this.timeout(15000);
               const driver = await new Builder().forBrowser("chrome").build();
               try {
                   await driver.get('https://jd5pri3k2r.eu-west-1.awsapprunner.com');
                   await driver.sleep(500);
                   await driver.findElement(By.id('quizlink')).click();
                   await driver.sleep(500);

                   for (let i = 0; i < 5; i++) {
                       await driver.sleep(250);
                       await driver.findElement(By.id('answer')).click();
                       await driver.sleep(250);
                       await driver.findElement(By.id('button')).click();
                       await driver.sleep(250);
                    }
                await driver.findElement(By.id('submitAnswers')).click();
                await driver.sleep(2000);

               const currentUrl = await driver.getCurrentUrl();
               expect(currentUrl).to.equal('https://jd5pri3k2r.eu-west-1.awsapprunner.com/resultJob');

                } finally {
                    await driver.quit();
                }
            });
        });
})
