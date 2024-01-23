const Pipes = require('../models/Pipes');

exports.create = (cardData) => Pipes.create(cardData);

exports.getAll = () => Pipes.find();

exports.getById = (cardId) => Pipes.findById(cardId);

exports.update = (cardId, cardData) => Pipes.findByIdAndUpdate(cardId, cardData);

exports.delete = (cardId) => Pipes.findByIdAndDelete(cardId);

exports.searchName = (searchName) => Pipes.find({title:{$regex: searchName, $options: 'i'}});

exports.searchWish = (userId) => Pipes.find({wish:{$elemMatch:{_id:userId}}});

exports.searchBuy = (userId) => Pipes.find({buy:{$elemMatch:{_id:userId}}});
