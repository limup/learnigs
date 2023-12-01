// Netflix & Spotify usam streams
// Streams foi um diferencial no node para o mercado

// Existem dois tipos de streams:
//     Readable => Leitura  
//     Writeble => Escrita

// Lembrando que o oservidor http os req e res são uma stream
// Pode ver como req.pipe() e res.pipe() => Pode receber e enviar aos poucos

// Vocabulário
//      pipe = encanamento/encaminhamento

// Exemplo1 - Stream de leitura simples ao digitar no terminal ele devolve o mesmo dado
// examples/example1.js

// Example2 - Trabalhando stream de leitura e retornando com buffer e timeout
// examples/example2.js

// Example3 - Trabalhando stream de leitura e escrita e retornando multiplicação por 10
// examples/example3.js

// Example4 - Trabalhando stream de leitura, escrita e transform e retornando numeros negativos. Serve para transformar um dado(chunk) em outro.
// examples/example4.js

// Utilizando a stream req e res para trabalhar com dados aos poucos com requisição aberta
// Example1/stream-front-and-back/stream-http-server.js
// Example1/stream-front-and-back/fake-upload-to-tpp-stream.js

// Utilizando a stream req e res para trabalhar com dados aos poucos com requisição aberta e retornar com os dados completos para o front
// Example1/stream-with-retention/stream-http-server.js
// Example1/stream-with-retention/fake-upload-to-tpp-stream.js
