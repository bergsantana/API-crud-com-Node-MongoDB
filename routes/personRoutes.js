const router = require('express').Router();
const { update } = require('../models/Person');
const Person = require('../models/Person');


// Create
router.post('/', async (req, res) => {
    
    // req.body
    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório.'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        // criando dados
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso.'});

    } catch (error){
        res.status(500).json({error: error})
    }


})

// Read - leitura de dados 
router.get('/', async (req, res) => {
    try{
        const people = await Person.find();
        res.status(200).json(people);

    } catch (error){    
        res.status(500).json({error: error});
    }
})

router.get('/:id', async (req, res)=>{
    //console.log(req);
    // extrair o dado da requisição pela url = rq.params
    const id = req.params.id
    //console.log('id enviada = ' , id);

    try{
        const person = await Person.findOne({ _id: id})
        //console.log('ID retornada = ', person);
        if(!person){
            res.status(422).json({
                message: 'Usuario nao encontrado'
            })
            return
        }

        res.status(200).json(person);
    }catch(error){
        res.status(500).json({error: error});
    }
})


// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async(req, res)=>{
    const id = req.params.id
    const {name, salary, approved} = req.body;

    const person = { 
        name,
        salary,
        approved
    }
    console.log(person);
    try{
        const updatedPerson = await Person.updateOne({_id: id}, person);

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({
                message: 'Usuario nao encontrado'
            })
            return 
        }

        res.status(200).json(person);
    }catch(error){
        res.status(500).json({error: error});

    }

})

// Delete

router.delete('/:id', async(req, res)=>{
    const id = req.params.id

    const person = await Person.findOne({ _id: id})

     if(!person){
        res.status(422).json({
            message: 'Usuario nao encontrado'
        })
        return
    }

    try{
        await Person.deleteOne({_id: id})
        res.status(200).json({message: 'Usuário removido com sucesso.'})
    }catch(error){
        res.status(500).json({error: error});

    }


})

module.exports  = router;