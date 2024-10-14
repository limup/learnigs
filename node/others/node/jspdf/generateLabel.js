const { jsPDF } = require("jspdf");
const fs = require("fs");
const bwipjs = require("bwip-js");

// Função para gerar código de barras em base64
function generateBarcode(data) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128", // Tipo do código de barras
        text: data, // Dados para codificação
        scale: 3, // Escala do código de barras
        height: 10, // Altura do código de barras
        includetext: true, // Incluir texto
        textxalign: "center", // Alinhar texto
      },
      (err, png) => {
        if (err) {
          reject(err);
        } else {
          const base64 = png.toString("base64");
          resolve(`data:image/png;base64,${base64}`);
        }
      }
    );
  });
}

async function generateLabel() {
  const doc = new jsPDF();

  // Definir variáveis dinâmicas
  const remetente = "ZOU";
  const telefone = "11987802133";
  const destinatario = "MARISA HELENE DE AMORIM";
  const endereco = "RUA AMOIPIRA, 201 APTO 78A, VILA ISA";
  const cep = "04689-070";
  const cidade = "SÃO PAULO";
  const data = "18/01/2024";
  const remessa = "1846132225";

  // Adicionar imagens (substitua pelos seus base64)
  const logoJGExpress = "data:image/jpeg;base64,..."; // Base64 da imagem JG Express
  const logoVestApp = "data:image/jpeg;base64,..."; // Base64 da imagem VestApp

  // Gerar código de barras
  const barcode = await generateBarcode(remessa);

  // Adicionar texto
  doc.setFontSize(12);
  doc.rect(10, 5, 150, 150);
  doc.stroke();

  doc.text("JG EXPRESS", 9, 5);
  doc.text("Cliente", 10, 20);
  doc.text("VESTAPP", 20, 20);
  doc.text("Remetente", 10, 30);
  doc.text(remetente, 20, 30);

  doc.text("Telefone", 10, 40);
  doc.text(telefone, 20, 40);

  doc.text("Destinatário", 10, 50);
  doc.text(destinatario, 20, 50);

  doc.text("Endereço de Entrega", 10, 60);
  doc.text(endereco, 20, 60);

  doc.text("CEP:", 10, 70);
  doc.text(cep, 20, 70);
  doc.text(cidade, 50, 70);

  doc.text(data, 10, 80);
  doc.text("Remessa/Transferência:", 10, 90);
  doc.text(remessa, 50, 90);

  // Adicionar imagens
  doc.addImage(logoJGExpress, "JPEG", 150, 10, 30, 10); // Posição e tamanho da imagem
  doc.addImage(logoVestApp, "JPEG", 150, 30, 30, 10); // Posição e tamanho da imagem

  // Adicionar código de barras
  doc.addImage(barcode, "PNG", 150, 50, 30, 10);

  // Salvar o PDF
  doc.save("label.pdf");

  // Opcionalmente, você pode salvar o PDF no sistema de arquivos
  const pdfOutput = doc.output();
  fs.writeFileSync("label.pdf", pdfOutput);
}

generateLabel();
