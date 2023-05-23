const { Router } = require('express');
const axios = require ('axios');
const {Dogs, Temperamentos} = require ("../db");
const { Sequelize, Op } = require('sequelize');
const {APIKEY} = process.env;


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
    return await Dogs.findAll({
        include: {
            model: Temperamentos,
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
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    
    if(name){
        let dogsName = dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase))
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send('No existe la raza');
    } else{
        res.status(200).send(dogsTotal)
    }
});






router.get('/dogs/name', async (req, res) => {
  const {name} = req.query;
  try {
    const dogsDB = await Dogs.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: {
        model: Temperamentos,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });

    

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${APIKEY}`);
    const dogApi = await Promise.all(response.data.map(async dog => {
      const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}&api_key=${APIKEY}`);
      const imageData = imageResponse.data[0];
      return {
        id: dog.id,
        name: dog.name,
        weight: dog.weight,
        height: dog.height,
        image: imageData.url,
        temperament: dog.temperament?.split(',').map(t => t.trim()) || []
      };
    }));
    const dogs = [...dogsDB, ...dogApi];

    if (dogs.length === 0) {
      return res.status(404).json({error: 'No se encontraron razas de perro con ese nombre'});
    }
    res.json(dogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Error server'});
  }
});



  

router.get('/temperaments', async (req, res) => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds/');

    const breeds = response.data;
    const temperaments = [];

    // Obtener los temperamentos únicos de todas las razas
    breeds.forEach((breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(', ');
        breedTemperaments.forEach((temp) => {
          if (!temperaments.includes(temp)) {
            temperaments.push(temp);
          }
        });
      }
    });

    // Guardar los temperamentos en la base de datos
    await Temperamentos.bulkCreate(
      temperaments.map((temp) => ({ name: temp }))
    );

    // Obtener los temperamentos guardados en la base de datos
    const savedTemperaments = await Temperamentos.findAll();
    res.status(200).json(savedTemperaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los temperamentos' });
  }
});

  
    


router.post('/dogs', async (req,res) =>{
    const { name, height, weight, life_span, image, temperament, createdInDb } = req.body;
    

  // Crea un nuevo objeto dog con los datos
  const dog = {
    name: 'Tita',
    height: 60,
    weight: 80,
    life_span:"10-14 years",
    image: "file:///Users/eduardopablogimenez/Desktop/IMG_0342.JPG",
    temperament: "Curious, Playful, Adventurous, Active, Fun-loving",
    createdInDb: new Date()
  };

  try {
    // Guarda el objeto dog en la base de datos utilizando Sequelize
    const createdDog = await Dogs.create(dog);
    res.status(200).json(createdDog); // Devuelve el objeto dog creado en la respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el perro' });
  }
    
});


router.get('/dogs/:id', async (req,res) => {
    const {id} = req.params;
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${APIKEY}`);
      const breedData = response.data;
  
      // Check if breedData contains reference_image_id
      if (!breedData.reference_image_id) {
        throw new Error('Reference image ID not found');
      }
  
      // Realizar una segunda solicitud para obtener la imagen utilizando el reference_image_id
      const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${breedData.reference_image_id}?api_key=${APIKEY}`);
      const imageData = imageResponse.data;

        const dogId ={
            name: response.data.name,
            height: response.data.height,
            weight: response.data.weight,
            life_span: response.data.life_span,
            temperament: response.data.temperament,
            reference_image_id: breedData.reference_image_id,
            url: imageData.url
           
        };
        res.status(200).json(dogId)
    } catch (error) {
        console.error(error);
        res.status(500).send('No se encontro el ID del personaje');
    }

    
 });



module.exports = router, Sequelize;
