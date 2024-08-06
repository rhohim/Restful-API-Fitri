const express = require('express')
const router = express.Router()
const giftController = require("../controllers/giftController")

router.route('/data')
    .get(giftController.paginationGift)

router.route('/')
    .get(giftController.getAllGift)
    .post(giftController.postGift)
    .delete(giftController.deleteGift)

router.route('/:id')
    .put(giftController.putGift)
    .get(giftController.getGiftbyID)
    .delete(giftController.deleteGiftbyID)


module.exports = router