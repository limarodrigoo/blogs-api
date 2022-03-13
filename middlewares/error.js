const error = (e, _req, res, _next) => {
  console.log(e.message);
  return res.status(500).json({ message: 'Algo deu errado' });
};

module.exports = error;