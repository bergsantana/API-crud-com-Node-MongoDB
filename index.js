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
const DB_USER = 'berg'
const DB_PASSWORD = 'UsjY137qSKrJVtyv'

mongoose
    .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.afvkx3s.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)
    .then(()=>{
        console.log('Conectamos ao MongoDB');
        app.listen(3000);
    })
    .catch((err)=> console.log(err))
