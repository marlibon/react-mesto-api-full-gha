const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/validate/userValidate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');

const {
  handleErrors,
  NotFoundError,
} = require('../utils/handleErrors');
router.get('/crash-test', (req, res) => {
  res.send({ message: 'Сервер сейчас упадёт' });
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.get('/signout', logout);

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => {
  const newError = new NotFoundError('По указанному вами адресу ничего не найдено');
  handleErrors(newError, res);
});
module.exports = router;
