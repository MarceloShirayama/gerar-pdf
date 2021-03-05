// eslint-disable-next-line import/no-extraneous-dependencies
import express, { Request, Response } from 'express';
import path from 'path';
import ejs from 'ejs';
import puppeteer from 'puppeteer';

const app = express();

const passengers = [
  { name: 'Joyce', flightNumber: 7859, time: '18h00' },
  { name: 'Brock', flightNumber: 7859, time: '18h00' },
  { name: 'Eve', flightNumber: 7859, time: '18h00' },
];

// eslint-disable-next-line no-unused-vars
app.get('/pdf', async (request: Request, response: Response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3333/', {
    waitUntil: 'networkidle0',
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'a4',
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px',
    },
  });

  await browser.close();

  response.contentType('application/pdf');

  return response.send(pdf);
});

app.get('/', (request: Request, response: Response) => {
  const filePath = path.join(__dirname, 'print.ejs');

  // eslint-disable-next-line consistent-return
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.send('Erro na leitura do arquivo');
    }
    // enviar para o navegador
    return response.send(html);
  });
});

app.listen(3333);
