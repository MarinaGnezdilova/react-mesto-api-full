const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const CREATED = 201;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Unauthoraized = require('../errors/unauthoraized');
const Coflict = require('../errors/conflict');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((e) => {
      next(e);
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Передан неверный _id пользователя.'));
      } else {
        next(e);
      }
    });
};

module.exports.postUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then((data) => res.status(CREATED).send({
        email: data.email, id: data._id, name: data.name, about: data.about, avatar: data.avatar,
      }))
      .catch((e) => {
        if (e.name === 'ValidationError') {
          next(new BadRequest('Данные для создания нового пользователя были переданы некорректно.'));
        } else if (e.code === 11000) {
          next(new Coflict('Такой пользователь уже существует.'));
        } else {
          next(e);
        }
      });
  });
};

module.exports.login = (req, res, next) => User.findUserByCredentials(req.body.email, req.body.password)
  .then((user) => {
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
    res.send({ token });
  })
  .catch((e) => {
    next(e);
  });

module.exports.patchUserProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, { name: req.body.name, about: req.body.about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для обновления пользователя.'));
      } else if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для обновления пользователя.'));
      } else {
        next(e);
      }
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для обновления пользователя.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для обновления пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Передан неверный _id пользователя.'));
      } else {
        next(e);
      }
    });
};
