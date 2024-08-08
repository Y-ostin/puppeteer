const puppeteer = require('puppeteer');

(async () => {
  try {
    // Lanzar el navegador
    const browser = await puppeteer.launch({ headless: false }); // Cambia a true si no quieres ver el navegador
    const page = await browser.newPage();

    // Navegar a la página web deseada
    await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp'); // Reemplaza con la URL de la página que deseas abrir

    // Esperar a que el campo de entrada esté disponible y luego escribir el código
    await page.waitForSelector('#txtRuc'); // Selector basado en el id del campo de entrada
    await page.type('#txtRuc', '1076066728'); // Reemplaza con el código que deseas pegar

    // Esperar un poco más para asegurarse de que el campo esté lleno
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1 segundo

    // Esperar a que el botón de buscar esté disponible y visible, y luego hacer clic
    await page.waitForSelector('#btnAceptar', { visible: true });
    await page.click('#btnAceptar');

    // Esperar unos segundos para ver los resultados (opcional)
    await new Promise(resolve => setTimeout(resolve, 5000)); // Pausa de 5 segundos

    // Cerrar el navegador
  } catch (error) {
    console.error('Error:', error);
  }
})();
