const Waterpump = require('../models/Waterpumps');

exports.create = (cardData) => Waterpump.create(cardData);

exports.getAll = () => Waterpump.find();

exports.getById = (cardId) => Waterpump.findById(cardId);

exports.update = (cardId, cardData) => Waterpump.findByIdAndUpdate(cardId, cardData);

exports.delete = (cardId) => Waterpump.findByIdAndDelete(cardId);

exports.searchName = (searchName) => Waterpump.find({title:{$regex: searchName, $options: 'i'}});

exports.searchFavorite = (userId) => Waterpump.find({favorite:{$elemMatch:{_id:userId}}});

exports.searchBuy = (userId) => Waterpump.find({buy:{$elemMatch:{_id:userId}}});

exports.searchLastSeen = (userId) => Waterpump.find({lastSeen:{$elemMatch:{_id:userId}}});

