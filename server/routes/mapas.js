const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { criarMapa, listarMapas } = require('../controllers/mapaController');

router.post('/', auth, criarMapa);
router.get('/', auth, listarMapas);

module.exports = router;
