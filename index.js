const puppeteer = require('puppeteer');

(async () => {
  try {
    // Array de RUCs
    const rucs = [
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' '
    ];

    // Init browser
    const browser = await puppeteer.launch({ headless: false }); // change to true if you don't want to see the browser
    const page = await browser.newPage();

    for (const ruc of rucs) {
      try {
        // Go to the page 
        await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp'); 
        
        await page.waitForSelector('#txtRuc'); // Selector 
        await page.type('#txtRuc', ruc); // RUC code

        await new Promise(resolve => setTimeout(resolve, 1000)); // Sleep 1 second

        await page.waitForSelector('#btnAceptar', { visible: true });
        await page.click('#btnAceptar');

        // Wait for the page to load results (you might need to adjust this wait time)
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Adjust page viewport for better PDF rendering
        await page.setViewport({ width: 1280, height: 1024 });

        // Create PDF with better layout
        await page.pdf({ 
          path: `./assets/${ruc}.pdf`, 
          format: 'A4',
          printBackground: true,
          landscape: false, // Change to true if you need landscape orientation
          preferCSSPageSize: true,
          margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
        });

      } catch (error) {
        console.error(`Error processing RUC ${ruc}:`, error);
      }
    }

    await browser.close();

  } catch (error) {
    console.error('Error:', error);
  }
})();
