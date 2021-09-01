const {Device,DeviseInfo} = require("../models/models");
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path');


class DeviceController{

    async getAll(req,res){
        let{brandId,typeId,limit,page,info} = req.query
        //logic pages
        page = page || 1
        limit = limit || 9
        let offset = page * limit -limit


        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit,offset})
            res.json(devices)

        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId,},limit,offset})
            res.json(devices)
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId},limit,offset})
            res.json(devices)
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{brandId,typeId},limit,offset})
            res.json(devices)
        }


    }
    async create(req,res,next){
     try {
         let {name,price,brandId,typeId, info} = req.body
         const {img} = req.files
         const filename = uuid.v4() +".jpg";
         img.mv(path.resolve(__dirname,'..','static',filename))

         let device = await  Device.create({name,price,img:filename,brandId,typeId})
         if(info){
             info = JSON.parse(info);
             info.forEach(i=>
             DeviseInfo.create({
                 title:i.title,
                 description:i.description,
                 deviceId:device.id
             }))
         }



         return res.json({device})
     }catch (e){
         next(ApiError.badRequest(e.message))
     }
    }
    async GetOne(req,res){
        const {id} = req.params
        const device = await  Device.findOne(
            {
            where:{id},
            include:[{model:DeviseInfo,as:'info'}]
        }
        )

       return  res.json({device})
    }
}

module.exports = new DeviceController()