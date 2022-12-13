const Animals = require('../routes/controllers/animal-controller');
const { User, authenticated  } = require('../routes/controllers/auth-controller');

const express = require('express');
const router = express.Router();

// user/auth
router.post('/Login', User.login);
router.post('/Register', User.register);

// animals crud
router.get('/Animals', authenticated, Animals.list);
router.post('/Animals', authenticated, Animals.create);
router.delete('/Animals/:id', authenticated, Animals.delete);

module.exports = router;