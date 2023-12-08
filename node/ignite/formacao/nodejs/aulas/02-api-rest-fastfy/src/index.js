function calculateAgeOfYear(user){
    return new Date().getFullYear() - user.birthYear
}

//  Quando chamamos as funções abaixo, o código javascript simplesmente não mostra que tem erro, que vai ocasionar erros, até porque a função requer parametros e logicamente requer um integer.
//  Só iremos saber quando é executado o Runtime Type Checking, ou seja, só saberemos que tudo está ok ou não no momento da execução. E no caso abaixo, só irá mostrar o erro durante a execução.
calculateAgeOfYear('Arnaldo')
calculateAgeOfYear() 