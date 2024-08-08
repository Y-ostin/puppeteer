const puppeteer = require('puppeteer');

(async () => {
  try {

    const ruc = '20100190797';

    // init browser
    const browser = await puppeteer.launch({ headless: false }); // change to true if you don't want to see the browser
    const page = await browser.newPage();

    // go to the page 
    await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp'); 
    
    await page.waitForSelector('#txtRuc'); // Selector 
    await page.type('#txtRuc', ruc ); // codigo (RUC)

    await new Promise(resolve => setTimeout(resolve, 1000)); // sLeep 1 second

    await page.waitForSelector('#btnAceptar', { visible: true });
    await page.click('#btnAceptar');

    // Esperar unos segundos para ver los resultados (opcional)
    await new Promise(resolve => setTimeout(resolve, 5000)); // Pausa de 5 segundos

    await page.pdf({ path: `./assets/${ruc}.pdf`, format: 'A4' });

  } catch (error) {
    console.error('Error:', error);
  }
})();
