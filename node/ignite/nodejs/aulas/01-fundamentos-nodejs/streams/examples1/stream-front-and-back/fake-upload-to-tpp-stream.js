import { Readable } from "node:stream";

class OneToHundredStreamWithDelay extends Readable {
  index = 1;

  //Método obrigatório
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        //Quando trabalhamos com stream, devemos sempre retornar em buffer
        //Buffer sempre deve ser retornado em string
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      }
    }, 1000);
  }
}

//Envia requisição usando o nativo do node Fetch
fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStreamWithDelay(),
  duplex: "half",
});
