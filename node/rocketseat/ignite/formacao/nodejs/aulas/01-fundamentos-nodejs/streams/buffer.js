//Buffer é a forma que o node tem nativo para representar os dados binários na memória
const buffer = Buffer.from('Hello')

console.log(buffer)
console.log(buffer.toJSON())