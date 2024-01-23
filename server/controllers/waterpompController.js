const router = require('express').Router();
const { error } = require('../config/constants');
const waterpompManager = require('../manager/waterpompManager');
const {errorMessages} =require('../utils/errorHelper')

router.get('/', async (req, res) => {

    try {
        const cards = await waterpompManager.getAll();
        res.json(cards);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
})

router.post('/create', async (req, res) => {

    try {
        const card = await waterpompManager.create(req.body);

        res.json(card)
    } catch (error) {
        res.json({
            message: errorMessages(error)
        });
    }
});

router.put('/search', async(req,res)=>{
    const searchName=req.body.searchName;
    
    try {
        if(searchName!=''){
            const card=await waterpompManager.searchName(searchName);
            res.json(card);
        }else{
            const cards = await waterpompManager.getAll();
            res.json(cards);
        }
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});

router.get('/:cardId', async (req, res) => {
    const cardId = req.params.cardId
    try {
        const card = await waterpompManager.getById(cardId)

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
        const card = await waterpompManager.update(cardId, cardData);

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
        await waterpompManager.delete(cardId);

        res.status(204).end();
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});


router.put('/:cardId/wish', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    try {
        const card = await waterpompManager.getById(cardId);

        const isWish = card.wish.filter(x => x._id == userId);

        if (isWish.length > 0) {
            throw new Error(error.favorite)
        }

        card.wish.push(userId);
        card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

router.get('/:userId/wish', async (req, res) => {
    const userId = req.params.userId;

    try {
        const card = await waterpompManager.searchWish(userId);

        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }
});

router.put('/:cardId/removeWish', async (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    try {
        const card = await waterpompManager.getById(cardId);

        card.wish = card.wish.filter(x => x._id != userId);
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
        const card = await waterpompManager.getById(cardId);

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
        const card = await waterpompManager.searchBuy(userId);

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
        const card = await waterpompManager.getById(cardId);

        card.buy = card.buy.filter(x => x._id != userId);
        card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({
            message: errorMessages(error)
        });
    }

});

module.exports = router;