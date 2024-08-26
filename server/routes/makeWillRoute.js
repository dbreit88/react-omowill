const makeWillController = require('../controllers/makeWillController');
const router = require('express').Router();

router.post('/getMakeWill', makeWillController.getMakeWill);
router.post('/updateWills', makeWillController.updateWills);
router.post('/createWills', makeWillController.createWills);

router.post('/getEstateWill', makeWillController.getEstateWill);
router.post('/updateEstateWill', makeWillController.updateEstateWill);
router.post('/deleteEstateWill', makeWillController.deleteEstateWill);
router.post('/createEstateWill', makeWillController.createEstateWill);
router.post('/getHandWill', makeWillController.getHandWill);

module.exports = router;