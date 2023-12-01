import { Readable, Writable } from "node:stream";

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
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStreamWithDelay()
    .pipe(new MultiplyByTenStream())

// Result
// $ node streams/examples/example3.js 
// 10
// 20
// 30
// 40
// 50
// 60
// 70
// 80
// 90
// 100
// 110
// 120
// 130
// 140
// 150
// 160
// 170
// 180
// 190