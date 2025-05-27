const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Usuário já existe" });

    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    user = new User({ nome, email, senha: hashedSenha });
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
};

// Login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: "Credenciais inválidas" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-senha'); // remove a senha
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    res.json({ id: user._id, nome: user.nome, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};

