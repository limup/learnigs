import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    //Método obrigatório
    _read(){
        const i = this.index++

        if (i > 100) {
            this.push(null)
        }else{
            //Quando trabalhamos com stream, devemos sempre retornar em buffer
            //Buffer sempre deve ser retornado em string
            const buffer = Buffer.from(String(i))
            this.push(buffer);
        }
    }
}

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

new OneToHundredStream()
    .pipe(process.stdout)

new OneToHundredStreamWithDelay()
    .pipe(process.stdout);

// Result
// $ node streams/examples/example2.js 
// 12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061626364656667686970717273747576777879808182838485868
// 78889909192939495969798991001234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768697071727
// 37475767778798081828384858687888990919293949596979899100