const Mapa = require('../models/MapaMental');

exports.criarMapa = async (req, res) => {
  try {
    const novoMapa = new Mapa({ ...req.body, userId: req.user.id });
    const mapa = await novoMapa.save();
    res.json(mapa);
  } catch (err) {
    res.status(500).send("Erro ao criar mapa");
  }
};

exports.listarMapas = async (req, res) => {
  try {
    const mapas = await Mapa.find({ userId: req.user.id });
    res.json(mapas);
  } catch (err) {
    res.status(500).send("Erro ao listar mapas");
  }
};
