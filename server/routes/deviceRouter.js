const {Router}=require('express')
const  deviceController = require('../controllers/deviceController')
const router = Router()

router.post('/',deviceController.create)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.GetOne)



module.exports = router