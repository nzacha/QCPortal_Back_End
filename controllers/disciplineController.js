const models = require('../models')

exports.getAllDisciplines = async (request, response, next) =>{
    try{
    	disciplines = await models.Discipline.findAll()
        response.status(200).json(disciplines)
    } catch (e) {
        next(e)
    }
}

exports.getDiscipline = async (request, response, next) =>{
    try{
    	discipline = await models.Discipline.findOne({where: {id: request.params.id}})
        if(discipline){
            response.status(200).json(discipline)
        }else{
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}


exports.addDiscipline = async (request, response, next) =>{
    try{
        categoryId = request.params.categoryId
        var {name} = request.body
        discipline = await models.Discipline.create({name: name, categoryId: categoryId})
        if (discipline && name){
            response.status(200).json(discipline)
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.deleteDiscipline = async (request, response, next) =>{
    try{        
        discipline = await models.Discipline.findOne({where: {id: request.params.id}})
        if (discipline){            
            await discipline.destroy({truncate: true, cascade: true})
            response.status(200).json("OK")            
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}