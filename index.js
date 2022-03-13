const express = require('express');
const userRouter = require('./router/userRouter');
const loginRouter = require('./router/loginRouter');
const error = require('./middlewares/error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(error);
app.use('/user', userRouter);
app.use('/login', loginRouter);
