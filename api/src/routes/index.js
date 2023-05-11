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
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            image: el.image,
            id: el.id,
            height: el.height,
            weight: el.weight,
            life_span: el.life_span,
            temperament: el.temperament
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperamento,
            attributes: ['id', 'name'],
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
        let dogsBreeds = await dogsTotal.filter(el => el.breed.tolowerCase().includes(id, name, height, weight, breed, yearsOfLife, image))
        dogsBreeds.lenght ?
        res.status(200).send(dogsBreeds) :
        res.status(404).send('No existe la raza');
    } else{
        res.status(200).send(dogsTotal)
    }
});


router.get('/dogs/name', async (req, res) => {
    const {name} = req.query;
    try {
        const dogDB = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: {
                model: Temperamento,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });

        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${name}`);
        const dogApi = response.data.map(dog => ({
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            temperament: dog.temperament?.split(','.map(e => e.trim())) || []
        }));

        const dogs = [...dogDB, ...dogApi];

        if (dogs.lenght === 0) {
            return res.status(404).json({error: 'No hay ningun perro con ese nombre'});
        }
        res.json(dogs);
    }catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});



router.get('/temperaments', async(req,res) => {
    try {
        let temperament = await Temperamento.findAll();
        if(temperament.lenght === 0) {
            const response = await axios.get('https://api.thedogapi.com/v1/breeds');
            console.log(response.data.results);
            const apiTemperament = response.data.results;
            apiTemperament.forEach(async (temperament) => {
                const newTemperament = new Temperamento({name: temperament.name});
                await newTemperament.save();
                console.log( `Se guardo correctamente ${temperament.name} en la base de datos`);
            });
            temperament =  await Temperamento.findAll();
        }
        res.json(temperament);
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error.message});
    }
});

router.post('/dogs', async (req,res) =>{
    const {
        name,
        height,
        weight,
        image,
        life_span, 
        createdInDb,
        temperament

    } = req.body;

    let dogCreated = await Dog.create({
        name, 
        height,
        weight,
        image,
        life_span,
        createdInDb

    })

    let temperamentDb = await Temperamento.findAll({where: {name: temperament}})
    dogCreated.addTemperament(temperamentDb)

    res.send('Dog created succesfully!')
});

router.get('/dogs/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const response = await axios.get (`https://api.thedogapi.com/v1/breeds/${id}`);

        const dogId ={
            name: response.data.name,
            height: response.data.height.metric,
            weight: response.data.weight.metric,
            life_span: response.data.life_span,
            temperament: response.data.temperament,
            reference_image_id: response.data.reference_image_id,
        };
        res.status(200).json(dogId)
    } catch (error) {
        console.error(error);
        res.status(500).send('No se encontro el ID del personaje');
    }

    
 });



module.exports = router;
