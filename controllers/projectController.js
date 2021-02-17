const models = require('../models')

exports.getProjects = async (request, response, next) =>{
    try{
    	projects = await models.Project.findAll({include: {model: models.Administrator, as: 'administrators', attributes: ['id','name', 'surname', 'username']}})
        response.status(200).json(projects)
    } catch (e) {
        next(e)
    }
}

exports.getProject = async (request, response, next) =>{
    try{
    	project = await models.Project.findOne({where: {id: request.params.id}, include: {model: models.Administrator, as: 'administrators', attributes: ['id','name', 'surname', 'username']}, order: [[ 'administrators', 'id', 'DESC']]})
        if(project){
            response.status(200).json(project)
        }else{
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}


exports.addProject = async (request, response, next) =>{
    try{
        var {name, description, date} = request.body
        project = await models.Project.create({name: name, description: description, date: date})
        if (project && name){
            //response.status(200).json(project)
            response.status(200).json(project)
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.deleteProject = async (request, response, next) =>{
    try{        
        project = await models.Project.findOne({where: {id: request.params.id}})
        if (project){            
            await project.destroy({truncate: true, cascade: true})
            response.status(200).json("OK")            
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.linkProject = async (request, response, next) =>{
    try{
        var {administratorId, id} = request.params
        project = await models.Project.findOne({where: {id: request.params.id}})
        if (project){
            assoc = await models.ProjectAdministratorAssoc.create({projectId: id, administratorId: administratorId})
            if (assoc){
                response.status(200).json("OK")
            } else{
                response.status(400).send("An Error Ocurred")
            }
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}


exports.deleteLink = async (request, response, next) =>{
    try{
        var {administratorId, id} = request.params
        assoc = await models.ProjectAdministratorAssoc.findOne({where: {projectId: id, administratorId: administratorId}})
        if (assoc){
            await assoc.destroy()
            response.status(200).json("OK")
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}