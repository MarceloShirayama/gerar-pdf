// eslint-disable-next-line import/no-extraneous-dependencies
import express, { Request, Response } from 'express';
import path from 'path';
import ejs from 'ejs';
import pdf from 'html-pdf';

const app = express();

const passengers = [
  { name: 'Joyce', flightNumber: 7859, time: '18h00' },
  { name: 'Brock', flightNumber: 7859, time: '18h00' },
  { name: 'Eve', flightNumber: 7859, time: '18h00' },
];

app.get('/', (request: Request, response: Response) => {
  const filePath = path.join(__dirname, 'print.ejs');

  // eslint-disable-next-line consistent-return
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.send('Erro na leitura do arquivo');
    }

    // criar pdf
    const options = {
      height: '11.25in',
      width: '8.5in',
      header: { height: '20mm' },
      footer: { height: '20mm' },
    };

    // eslint-disable-next-line no-shadow,  no-unused-vars
    pdf.create(html, options).toFile('report.pdf', (err: string, data: string) => {
      if (err) {
        return response.send('Erro ao gerar PDF');
      }
      // enviar para o navegador
      return response.send(`
        <h3>Arquivo gerado com sucesso em:</h3>
        <p>${filePath}</p>
      `);
      // return response.send(html);
    });
  });
});

app.listen(3333);
