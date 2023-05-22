const { Router } = require('express');
const axios = require ('axios');
const {Dogs, Temperamentos} = require ("../db");
const { Sequelize } = require('sequelize');
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






router.get('/dogs', async (req, res) => {
  try {
    const name = req.query.name; // Obtiene el nombre del query
    const regex = new RegExp(name, 'i'); // Crea una expresión regular para búsqueda no sensible a mayúsculas y minúsculas

    // Busca las razas de perros que coinciden con el nombre en la API externa
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${regex}&api_key=${APIKEY}`);

    const dogs = response.data;

    if (dogs.length === 0) {
      return res.status(404).json({ message: 'No se encontraron razas de perros con ese nombre.' });
    }

    return res.json(dogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.' });
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
