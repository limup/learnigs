import { Readable, Writable, Transform } from "node:stream";

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

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStreamWithDelay()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())

// Result
// $ node streams/examples/example4.js 
// -10
// -20
// -30
// -40
// -50
// -60
// -70
// -80
// -90
// -100