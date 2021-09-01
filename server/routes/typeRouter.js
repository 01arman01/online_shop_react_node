const {Router}=require('express')
const router = Router()
const typeController = require('../controllers/typeController')

router.get('/',typeController.getAll)
router.post('/',typeController.create)


module.exports = router