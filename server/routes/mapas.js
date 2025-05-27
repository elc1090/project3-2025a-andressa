const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Mapa = require("../models/MapaMental");

// GET /api/mapas - Listar todos os mapas com nome do criador 
router.get("/", async (req, res) => {
  try {
    const mapas = await Mapa.find().sort({ createdAt: -1 }).populate("autor", "nome");

    const resultado = mapas.map(mapa => ({
      _id: mapa._id,
      titulo: mapa.titulo,
      nodes: mapa.nodes,
      edges: mapa.edges,
      criadorId: mapa.autor?._id,
      nomeCriador: mapa.autor?.nome || "Desconhecido",
      criadoEm: mapa.createdAt,
    }));

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao buscar mapas" });
  }
});

// GET /api/mapas/meus - Listar mapas do usuário autenticado 
router.get("/meus", verifyToken, async (req, res) => {
  try {
    const mapas = await Mapa.find({ autor: req.user.userId }).sort({ createdAt: -1 });
    res.json(mapas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao buscar seus mapas" });
  }
});

// GET /api/mapas/:id - Obter um mapa individual 
router.get("/:id", async (req, res) => {
  try {
    const mapa = await Mapa.findById(req.params.id).populate("autor", "nome");
    if (!mapa) return res.status(404).json({ msg: "Mapa não encontrado" });

    res.json({
      _id: mapa._id,
      titulo: mapa.titulo,
      nodes: mapa.nodes,
      edges: mapa.edges,
      nomeCriador: mapa.autor?.nome || "Desconhecido",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao buscar o mapa" });
  }
});

// POST /api/mapas/salvar - Criar ou atualizar um mapa
router.post("/salvar", verifyToken, async (req, res) => {
  const { _id, titulo, nodes, edges } = req.body;

  if (!titulo || !nodes || !edges) {
    return res.status(400).json({ msg: "Campos obrigatórios ausentes." });
  }

  try {
    if (_id) {
      // Atualiza mapa se for do autor
      const mapaExistente = await Mapa.findOne({ _id, autor: req.user.userId });
      if (!mapaExistente) {
        return res.status(403).json({ msg: "Você não tem permissão para editar esse mapa." });
      }

      mapaExistente.titulo = titulo;
      mapaExistente.nodes = nodes;
      mapaExistente.edges = edges;

      const atualizado = await mapaExistente.save();
      return res.json(atualizado);
    }

    // Cria novo mapa
    const novoMapa = new Mapa({
      titulo,
      autor: req.user.userId,
      nodes,
      edges,
    });

    const salvo = await novoMapa.save();
    res.status(201).json(salvo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao salvar o mapa." });
  }
});


// PUT /api/mapas/:id - Atualizar um mapa existente 
router.put("/:id", verifyToken, async (req, res) => {
  const { titulo, nodes, edges } = req.body;
  const id = req.params.id;

  try {
    const mapa = await Mapa.findById(id);
    if (!mapa) return res.status(404).json({ msg: "Mapa não encontrado" });

    if (mapa.autor.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Você não tem permissão para editar esse mapa" });
    }

    const atualizado = await Mapa.findByIdAndUpdate(
      id,
      { titulo, nodes, edges },
      { new: true }
    );

    res.json(atualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao atualizar o mapa" });
  }
});

// DELETE /api/mapas/:id - Deletar um mapa existente 
router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const mapa = await Mapa.findById(id);
    if (!mapa) return res.status(404).json({ msg: "Mapa não encontrado" });

    if (mapa.autor.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Você não tem permissão para deletar esse mapa" });
    }

    await Mapa.findByIdAndDelete(id);
    res.json({ msg: "Mapa deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao deletar o mapa" });
  }
});

module.exports = router;
