const router = require('express').Router();
const machinesManager = require('../manager/machinesManager');
const {errorMessages} =require('../utils/errorHelper');
const { error } = require('../config/constants');

router.get('/', async (req, res) => {

    try {
        const cards = await machinesManager.getAll()
        res.json(cards)
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
})

router.post('/create', async (req, res) => {

    try {
        const card = await machinesManager.create(req.body);

        res.json(card)
    } catch (error) {
        res.json({
            message: errorMessages(error)
        });
    }
});

router.put('/search', async (req, res) => {
    const searchName = req.body.searchName;

    try {
        if (searchName != '') {
            const card = await machinesManager.searchName(searchName);
            res.json(card);
        } else {
            const cards = await machinesManager.getAll();
            res.json(cards);
        }
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});


router.get('/:cardId', async (req, res) => {
    const cardId = req.params.cardId;
    try {
        const card = await machinesManager.getById(cardId)

        res.json(card)
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});

router.put('/:cardId/edit', async (req, res) => {
    const cardId = req.params.cardId;
    const cardData = req.body

    try {
        const card = await machinesManager.update(cardId, cardData);

        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

router.delete('/:cardId/delete', async (req, res) => {
    const cardId = req.params.cardId;


    try {
        await machinesManager.delete(cardId);

        res.status(204).end();
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

router.put('/:cardId/favorite', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;

    try {
        const card = await machinesManager.getById(cardId);
        const isFavorite = card.favorite.filter(x => x._id == userId);

        if (isFavorite.length > 0) {
            throw new Error(error.favorite)
        }

        card.favorite.push(userId);
        card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

router.get('/:userId/favorite', async (req, res) => {
    const userId = req.params.userId;

    try {
        const card = await machinesManager.searchFavorite(userId);

        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});

router.put('/:cardId/removeFavorite', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    try {
        const card = await machinesManager.getById(cardId);

        card.favorite = card.favorite.filter(x => x._id != userId);
        card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});
router.put('/:cardId/buyProduct', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    try {
        const card = await machinesManager.getById(cardId);

        const isBuy = card.buy.filter(x => x._id == userId);

        if (isBuy.length > 0) {
            throw new Error(error.buy)
        }

        card.buy.push(userId);
        card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

router.get('/:userId/buyProduct', async (req, res) => {
    const userId = req.params.userId;

    try {
        const card = await machinesManager.searchBuy(userId);

        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});

router.put('/:cardId/removeBuy', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    try {
        const card = await machinesManager.getById(cardId);

        card.buy = card.buy.filter(x => x._id != userId);
        card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});
router.put('/:cardId/addLastSeen', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    try {
        const card = await machinesManager.getById(cardId);

        const isSeen = card.lastSeen.filter(x => x._id == userId);

        if (isSeen.length === 0) {
            card.lastSeen.unshift(userId);
            card.save();
            res.json(card);
        }
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

router.get('/:userId/getLastSeen', async (req, res) => {
    const userId = req.params.userId;

    try {
        const card = await machinesManager.searchLastSeen(userId);

        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});
module.exports = router;