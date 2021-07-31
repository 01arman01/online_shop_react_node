const {Router}=require('express')
const router = Router()

router.post('/registration',)
router.post('/login',)
router.get('/auth',(req,res)=>{
    res.json({
        "name":"user working"
    })
})
router.get('/:id',)

module.exports = router
