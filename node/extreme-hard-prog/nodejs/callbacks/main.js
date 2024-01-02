function pedirPizza(callbackAviso) {
    setTimeout(() => {
        const pizzaPronta = {
            sabor: 'Bacalhau',
            preco: 100
        }

        return callbackAviso(pizzaPronta)
    }, 1000)
}

pedirPizza((pizza)=>{
    console.log(pizza)
})