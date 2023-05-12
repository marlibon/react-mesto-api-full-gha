const Card = require('../models/card');
const {
  HTTP_STATUS_CREATED,
  handleErrors,
} = require('../utils/handleErrors');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { NotFoundError } = require('../errors/NotFoundError');

// получение всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([
      { path: 'likes', model: 'user' },
      { path: 'owner', model: 'user' },
    ])
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

// создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => handleErrors(err, res));
};

// удаление карточки
module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;

  Card.findOne({ _id })
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка уже удалена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }
      Card.findByIdAndDelete({ _id })
        .populate([
          { path: 'owner', model: 'user' },
        ])
        .then((deletedCard) => { res.send(deletedCard); });
    })
    .catch((err) => handleErrors(err, res));
};

// постановка лайка
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate([
      { path: 'likes', model: 'user' },
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => handleErrors(err, res));
};

// снятие лайка
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate([
      { path: 'likes', model: 'user' },
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => handleErrors(err, res));
};
