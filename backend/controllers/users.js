const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  handleErrors,
  HTTP_STATUS_CREATED,
  NotFoundError,
} = require('../utils/handleErrors');
const { JWT_SECRET } = require('../config');

module.exports.getCurrentUserData = (req, res) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};
module.exports.getUserDataById = (req, res) => {
  const _id = req.params.userId;
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => res.status(HTTP_STATUS_CREATED).send(user))
      .catch((err) => handleErrors(err, res)));
};

module.exports.logout = (_, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли из профиля' });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('token', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7дней
          sameSite: true,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

// функция для обновления данных пользователя
const updateUser = (req, res, updateData) => {
  User.findByIdAndUpdate(
    req.user._id,
    updateData,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => handleErrors(err, res));
};

// декоратор для обновления имени и описания пользователя
module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

// декоратор для обновления аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};
