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


router.get('/dogs', async (req, res) => {
  const { name, temperament, origin } = req.query;

  let dogsTotal = await getAllDogs();

  if (name) {
    let dogsName = dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    if (dogsName.length) {
      dogsTotal = dogsName;
    } else {
      return res.status(404).send('No existe la raza');
    }
  }

  if (temperament) {
    let dogsTemperament = dogsTotal.filter(el => el.temperament.toLowerCase().includes(temperament.toLowerCase()));
    if (dogsTemperament.length) {
      dogsTotal = dogsTemperament;
    } else {
      return res.status(404).send('No se encontraron perros con ese temperamento');
    }
  }

  if (origin) {
    let dogsOrigin;
    if (origin === 'api') {
      dogsOrigin = dogsTotal.filter(el => el.createdInDb === false);
    } else if (origin === 'database') {
      dogsOrigin = dogsTotal.filter(el => el.createdInDb === true);
    }
    if (dogsOrigin && dogsOrigin.length) {
      dogsTotal = dogsOrigin;
    } else {
      return res.status(404).send('No se encontraron perros con ese origen');
    }
  }

  res.status(200).json(dogsTotal);
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
    const temperament = [];

    // Obtener los temperamentos únicos de todas las razas
    breeds.forEach((breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(', ');
        breedTemperaments.forEach((temp) => {
          if (!temperament.includes(temp)) {
            temperament.push(temp);
          }
        });
      }
    });

    // Guardar los temperamentos en la base de datos
    await Temperamentos.bulkCreate(
      temperament.map((temp) => ({ name: temp }))
    );

    // Obtener los temperamentos guardados en la base de datos
    const savedTemperaments = await Temperamentos.findAll();
    res.status(200).json(savedTemperaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los temperamentos' });
  }
});

  
    


router.post('/dogs', async (req, res) => {
  const dogsData = req.body;

  // Verifica si dogsData es una matriz antes de continuar
  if (!Array.isArray(dogsData)) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser una matriz de perros' });
  }

  try {
    // Recorre los datos de los perros recibidos en el cuerpo de la solicitud
    for (const dogData of dogsData) {
      const { id, name, height, weight, life_span, image, temperament } = dogData;

      // Validar los valores de altura y peso
      const minHeight = parseFloat(height.min);
      const maxHeight = parseFloat(height.max);
      const minWeight = parseFloat(weight.min);
      const maxWeight = parseFloat(weight.max);

      // Verificar si los valores de altura y peso son numéricos válidos
      if (isNaN(minHeight) || isNaN(maxHeight) || isNaN(minWeight) || isNaN(maxWeight)) {
        return res.status(400).json({ error: 'Los valores de altura y peso deben ser numéricos' });
      }

      // Guarda el objeto dog en la base de datos utilizando Sequelize
      const createdDog = await Dogs.create({
        id: id,
        name: name,
        height: minHeight,
        weight: minWeight,
        life_span: life_span,
        image: image,
        temperament: temperament,
        createdInDb: new Date()
      });

      console.log(`Perro creado con ID: ${createdDog.id}`);
    }

    res.status(200).json({ message: 'Perros creados exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear los perros' });
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
        console.log(dogId);
        res.status(200).json(dogId)
    } catch (error) {
        console.error(error);
        res.status(500).send('No se encontro el ID del personaje');
    }

    
 });



module.exports = router, Sequelize;
