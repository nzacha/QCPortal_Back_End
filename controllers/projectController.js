const models = require('../models')

exports.getProjects = async (request, response, next) =>{
    try{
    	projects = await models.Project.findAll({include: {model: models.Researcher, as: 'researchers'}})
        response.status(200).json(projects)
    } catch (e) {
        next(e)
    }
}

exports.getProject = async (request, response, next) =>{
    try{
    	project = await models.Project.findOne({where: {id: request.params.id}, include: {model: models.Researcher, as: 'researchers', attributes: ['id','name', 'surname', 'email', 'phone','is_super_user']}, order: [[ 'researchers', 'id', 'DESC']]})
        response.status(200).json(project)
    } catch (e) {
        next(e)
    }
}


exports.addProject = async (request, response, next) =>{
    try{
        var {name, description, study_length, tests_per_day, tests_time_interval, allow_individual_times, allow_user_termination, automatic_termination} = request.body
        project = await models.Project.create({name: name, description: description, study_length: study_length, tests_per_day: tests_per_day, tests_time_interval: tests_time_interval, allow_individual_times: allow_individual_times, allow_user_termination: allow_user_termination, automatic_termination: automatic_termination})
        if (project){
            response.status(200).json(project)
        } else {
            response.status(400).json("Something went wrong")
        }
    } catch (e) {
        next(e)
    }
}

exports.updateProject = async (request, response, next) =>{
    try{
        var {name, description, study_length, tests_per_day, tests_time_interval, allow_individual_times, allow_user_termination, automatic_termination} = request.body
        project = await models.Project.findOne({where: {id: request.params.id}})
        if (project){
            project = await project.update({name: name, description: description, study_length: study_length, tests_per_day: tests_per_day, tests_time_interval: tests_time_interval, allow_individual_times: allow_individual_times, allow_user_termination: allow_user_termination, automatic_termination: automatic_termination})
            if (project){
                response.status(200).json(project)
            } else{
                response.status(400).json("Something went wrong")
            }
        } else {
            response.status(400).json("Something went wrong")
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
            response.status(200).json("Project deleted successfully")            
        } else {
            response.status(400).json("Something went wrong")
        }
    } catch (e) {
        next(e)
    }
}

exports.linkProject = async (request, response, next) =>{
    try{
        var {researcherId, id} = request.params
        project = await models.Project.findOne({where: {id: request.params.id}})
        if (project){
            assoc = await models.ProjectResearcherAssoc.create({projectId: id, researcherId: researcherId})
            if (assoc){
                response.status(200).json("Project-Researcher link created successfully")
            } else{
                response.status(400).json("Something went wrong")
            }
        } else {
            response.status(400).json("Something went wrong")
        }
    } catch (e) {
        next(e)
    }
}


exports.deleteLink = async (request, response, next) =>{
    try{
        var {researcherId, id} = request.params
        link = await models.ProjectResearcherAssoc.findOne({where: {projectId: id, researcherId: researcherId}})
        if (link){
            await link.destroy()
            response.status(200).json("Project-Researcher link destroyed successfully")
        } else {
            response.status(400).json("Something went wrong")
        }
    } catch (e) {
        next(e)
    }
}