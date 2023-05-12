const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCardData, validateCardById } = require('../utils/validate/cardValidate');

router.get('/', getCards);
router.post('/', validateCardData, createCard);
router.delete('/:cardId', validateCardById, deleteCard);
router.put('/:cardId/likes', validateCardById, likeCard);
router.delete('/:cardId/likes', validateCardById, dislikeCard);

module.exports = router;
