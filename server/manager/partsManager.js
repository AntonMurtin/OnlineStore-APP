const Parts = require('../models/Parts');

exports.create = (cardData) => Parts.create(cardData);

exports.getAll = () => Parts.find();

exports.getById = (cardId) => Parts.findById(cardId);

exports.update = (cardId, cardData) => Parts.findByIdAndUpdate(cardId, cardData);

exports.delete = (cardId) => Parts.findByIdAndDelete(cardId);

exports.searchName = (searchName) => Parts.find({title:{$regex: searchName, $options: 'i'}});

exports.searchFavorite = (userId) => Parts.find({favorite:{$elemMatch:{_id:userId}}});

exports.searchBuy = (userId) => Parts.find({buy:{$elemMatch:{_id:userId}}});

exports.searchLastSeen = (userId) => Parts.find({lastSeen:{$elemMatch:{_id:userId}}});

