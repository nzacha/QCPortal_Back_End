const models = require('../models')

exports.getAllData = async (request, response, next) =>{
    try{
        data = await models.Data.findAll()
        response.status(200).json(data)
    } catch (e) {
        next(e)
    }
}

exports.getDataOfProject = async (request, response, next) =>{
    try{
        project = await models.Project.findOne({where: {id: request.params.projectId}})
        if(project){
            data = await models.Category.findAll({include: {model: models.Discipline, as: "disciplines", include: {model: models.Data, as: 'data', where: {projectId: project.id}}}})
            response.status(200).json(data)
        } else {
            response.status(404).send('An Error Ocurred')
        }
    } catch (e) {
        next(e)
    }
}

exports.addData = async (request, response, next) =>{	
    try{
        week = request.body.week
        if(!week) return;
    	await models.Data.create({projectId: request.params.projectId, disciplineId: request.params.disciplineId, single: request.body.single, accumulated: request.body.accumulated, week : week})
        .then(function(){
            response.status(200).send("OK")    
        })
        .error(function(){
        	response.status(400).send("An Error Ocurred")    
        })
    } catch (e) {
        next(e)
    }
}

exports.removeData = async (request, response, next) =>{ 
    try{        
        data = await models.Data.findOne({where: {id: request.params.id}})        
        if(data){
            await data.destroy()
            response.status(200).send('OK')
        }else{
            response.status(400).send("An Error ocurred")
        }
    } catch (e) {        
        next(e)
    }
}