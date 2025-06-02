const InMemoryDB = [
    { id: 1645477708708, name: "garrafa térmica", price: 105.5 },
    { id: 1645477708709, name: "caneca cerâmica", price: 19.9 },
    { id: 1645477708710, name: "filtro de papel", price: 12. }
]

const validateItem = item => {
    return item?.price && item?.name
}

module.exports = function (app) {
    app
        .route('/item')
        .get((req, res) => {
            const { filter } = req.query
            const itemList = [...InMemoryDB];
            if (filter === 'asc')
                return res.status(200).json(itemList.sort((a, b) => a.price - b.price));
            if (filter === 'desc')
                return res.status(200).json(itemList.sort((a, b) => -a.price + b.price));

            return res.status(200).json(itemList);
        })
        .post((req, res) => {
            //Documentação extra para swagger-autogen
            /* #swagger.parameters['item] ={
                in: 'body',
                schema: {
                    $name: 'Dripper V60',
                    $price: 65.5
                }
            }*/
            const item = req.body
            if (!validateItem(item)) {
                return res.status(400).send('Price and Name are both required')
            }
            const id = Date.now()
            InMemoryDB.push({ id, ...item })
            return res.status(201).send(`New item created with ID ${id}`)
        })

    app
      .route("/item/:id")
      .get((req, res) => {
        const { id } = req.params;
        const index = InMemoryDB.findIndex((item) => item.id === +id);
        if (index === -1) {
          return res
            .status(404)
            .send(`ID ${id} does not match an existing item`);
        }

        return res.status(200).json(InMemoryDB.at(index));
      })
      .put((req, res) => {
        /* #swagger.parameters['item] ={
                in: 'body',
                schema: {
                    $name: 'Dripper V60',
                    $price: 65.5
                }
            }*/
        const { id } = req.params;
        const index = InMemoryDB.findIndex((item) => item.id === +id);
        if (index === -1) {
          return res
            .status(404)
            .send(`ID ${id} does not match an existing item`);
        }
        const newItem = req.body;
        if (!validateItem(newItem)) {
          return res.status(400).send("Price and Name are both required");
        }
        InMemoryDB[index] = { id: +id, ...newItem };

        return res.status(200).send(`Item (ID ${id}) was updated successfully`);
      })
      .delete((req, res) => {
        const { id } = req.params;
        const index = InMemoryDB.findIndex((item) => item.id === +id);
        if (index === -1) {
          return res
            .status(404)
            .send(`ID ${id} does not match an existing item`);
        }
        InMemoryDB.splice(index, 1);

        return res.status(200).send(`Item (ID ${id}) was deleted successfully`);
      });

}