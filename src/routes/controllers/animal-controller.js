const Animals = require('../../models/animals');

const Animal = {
    list: async (req,res) => {
        try {
            const animals = await Animals.find();
            res.status(200).send(animals);    
        } catch (error) {
            res.status(401).send('There was an error');
        }
    },
    create: async (req,res) => {
        try {
            const animal = new Animals(req.body);
            console.log(animal);
            const savedAnimal = await animal.save();
            res.status(201).send(savedAnimal._id);
        } catch(e) {
            res.status(400).send('The animal creation failed'); 
        } 
    },
    delete: async (req,res) => {
        try {
            const { id } = req.params;
            const animal = await Animals.findOne({ _id: id});
            if (animal) { animal.remove(); }
            res.status(204).send('The animal was deleted succesfully');
        } catch (error) {
            res.status(401).send('There was an error');
        }
    },
}

module.exports = Animal;