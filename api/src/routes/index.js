const { Router } = require('express');
const axios = require ('axios');
const {Dog, Temperamento} = require ("../db");
const { APIKEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${APIKEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            img: el.img,
            id: el.char_id,
            height: el.height,
            weight: el.weight,
            yearsOfLife: el.yearsOfLife
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperamento,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}


router.get('/dogs', async (req, res) =>{
    const breed = req.query.name
    let dogsTotal = await getAllDogs();
    if(breed){
        let dogsBreeds = await dogsTotal.filter(el => el.breed.tolowerCase().includes(breed))
        dogsBreeds.lenght ?
        res.status(200).send(dogsBreeds) :
        res.status(404).send('No existe la raza');
    } else{
        res.status(200).send(dogsTotal)
    }
})

router.get('temperaments', async(req,res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${APIKEY}`)
    const temperaments = temperamentsApi.data.map(el => el.temperament)
    const occEach = temperaments.map(el => {
        for (let i=0; i<el.lenght; i++) return el[i]})
        console.log(occEach)
        occEach.forEach(el => {
            Temperamento.findOrCreate({
                where: {name: el}
            })
        })
        const allTemperaments = await Temperamento.findAll();
        res.send(allTemperaments);
})

router.post('/dogs', async (req,res) =>{
    let {
        name,
        height,
        weight,
        image,
        yearsOfLife

    } = req.body;

    let dogCreated = await Dog.create({
        name, 
        height,
        weight,
        image,
        yearsOfLife,
        createdInDb
    })

    let temperamentDb = await Temperamento.findAll({where: {name: temperament}})
    dogCreated.addTemperament(temperamentDb)

    res.send('Dog created succesfully!')
});


module.exports = router;
