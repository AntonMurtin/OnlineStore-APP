const IrrigationSystems = require('../models/IrrigationSystems');

exports.create = (cardData) => IrrigationSystems.create(cardData);

exports.getAll = () => IrrigationSystems.find();

exports.getById = (cardId) => IrrigationSystems.findById(cardId);

exports.update = (cardId, cardData) => IrrigationSystems.findByIdAndUpdate(cardId, cardData);

exports.delete = (cardId) => IrrigationSystems.findByIdAndDelete(cardId);

exports.searchName = (searchName) => IrrigationSystems.find({title:{$regex: searchName, $options: 'i'}});

exports.searchWish = (userId) => IrrigationSystems.find({wish:{$elemMatch:{_id:userId}}});

exports.searchBuy = (userId) => IrrigationSystems.find({buy:{$elemMatch:{_id:userId}}});
