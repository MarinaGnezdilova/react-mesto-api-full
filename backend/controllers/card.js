const Card = require('../models/card');

const CREATED = 201;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    /*.populate(['owner', 'likes'])*/
    .then((cards) => res.send({ data: cards })
    )
    .catch((e) => {
      next(e);
    });
};

module.exports.postCard = (req, res, next) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user.id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((e) => {get
      if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для создании карточки.'));
      } else {
        next(e);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(() => {
    next(new NotFoundError('Карточка по указанному _id не найдена.'));
  })
    .then((data) => {
      if (data.owner.toString() === req.user.id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => res.send({ data: card }));
      } else {
        next(new Forbidden('Удаление карточки невозможно.'));
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для удаления карточки.'));
      } else {
        next(e);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },

    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Карточка по указанному _id не найдена.'));
    })
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для добавления лайка.'));
      } else {
        next(e);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },

    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка по указанному _id не найдена.');
    })
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для удаления лайка.'));
      } else {
        next(e);
      }
    });
};
