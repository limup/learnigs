interface User {
    birthYear: number
}

function calculateAgeOfYears(user: User){
    return new Date().getFullYear() - user.birthYear
}

calculateAgeOfYears({
    birthYear: 1992
}) 

//Como o node não entende de typescripts, nós devemos instalar a dependência dele para que o node converta os .ts em .js
//Instalando a dependencia com o comando: npm install -D typescript
//Após isso, devemos inicializar o tsc: npx tsc --init
//Comando para converter o arquivo .ts em .js: npx tsc src/index.ts