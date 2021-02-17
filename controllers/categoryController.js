const models = require('../models')

exports.getAllCategories = async (request, response, next) =>{
    try{
    	categories = await models.Category.findAll({include: {model: models.Discipline, as: 'disciplines', attributes: ['id','name']}})
        response.status(200).json(categories)
    } catch (e) {
        next(e)
    }
}

exports.getCategory = async (request, response, next) =>{
    try{
    	category = await models.Category.findOne({where: {id: request.params.id}, include: {model: models.Discipline, as: 'disciplines', attributes: ['id','name']}})
        if(category){
            response.status(200).json(category)
        }else{
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}


exports.addCategory = async (request, response, next) =>{
    try{
        var {title} = request.body
        category = await models.Category.create({title: title})
        if (category && title){
            response.status(200).json(category)
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.deleteCategory = async (request, response, next) =>{
    try{        
        category = await models.Category.findOne({where: {id: request.params.id}})
        if (category){            
            await category.destroy({truncate: true, cascade: true})
            response.status(200).json("OK")            
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}