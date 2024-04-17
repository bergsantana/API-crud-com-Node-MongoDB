// config inicial 
const express = require('express');
const mongoose = require('mongoose');
const app = express();

 
// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());


// rotas  da api
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);


// Rota inicial / endpoint
app.get('/',( req, res) => {

    //mostrar req
    res.json({message: 'oi express!'})




})

// Entregar uma porta
const DB_USER = ' '
const DB_PASSWORD = ' '

mongoose
    .connect(
    ` `
)
    .then(()=>{
        console.log('Conectamos ao MongoDB');
        app.listen(3000);
    })
    .catch((err)=> console.log(err))
