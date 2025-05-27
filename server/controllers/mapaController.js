const Mapa = require('../models/MapaMental');

exports.listarMapas = async (req, res) => {
  try {
    const mapas = await Mapa.find().populate("autor", "nome");

    const resultado = mapas.map((mapa) => ({
      _id: mapa._id,
      titulo: mapa.titulo,
      nodes: mapa.nodes,
      edges: mapa.edges,
      criadorId: mapa.autor?._id.toString(),
      nomeCriador: mapa.autor?.nome || "Desconhecido",
    }));

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao listar mapas");
  }
};
