const models = require('../models')

exports.getUsers = async (request, response, next) =>{
    try{
    	users = await models.User.findAll()
        response.status(200).json(users)
    } catch (e) {
        next(e)
    }
}

exports.getUsersOf = async (request, response, next) =>{
    try{
        users = await models.User.findAll({where: {projectId: request.params.id}})
        response.status(200).json(users)
    } catch (e) {
        next(e)
    }
}

exports.findUser = async (request, response, next) =>{
    try{
    	user = await models.User.findOne({where: {code: request.params.id}, include:{model: models.Project}})    	
        if (!user){
            response.status(404).json({"error": "User not found"})
            return;
        }

        if (!user.isActive && user.project.automatic_termination){
        	response.status(400).json({"error": "User is inactive", "data": user})
        } else {
	        response.status(200).json(user)	    	
        }
    } catch (e) {
        next(e)
    }
}

const crypto = require('crypto')
SECRET_KEY = "26121997"
const getDigitsCode = (message, length) => {
  const hash = crypto
    .createHmac('sha256', Buffer.from(SECRET_KEY, 'hex'))
    .update(message)
    .digest('hex')

  return hash.slice(0, length)
}

exports.addUser = async (request, response, next) =>{	
    try{    	
    	project = await models.Project.findOne({where: {id: request.body.projectId}})
    	var {name, surname, study_length, tests_per_day, tests_time_interval, allow_individual_times, allow_user_termination, automatic_termination} = request.body
    	if(project){
	    	user = await models.User.create({projectId: project.id, name: name, surname: surname, questions_total: study_length*tests_per_day, study_length: study_length, tests_per_day: tests_per_day, tests_time_interval: tests_time_interval, allow_individual_times: allow_individual_times, allow_user_termination: allow_user_termination, automatic_termination: automatic_termination})
  	    	
  	    	code = ""+project.id + user.id
            token = getDigitsCode(code, 4);
  	    	user = await user.update({code: token})

	    	response.status(200).json({"message":"User created", "id": user.id, "code": token})
	    }else{
	    	response.status(400).json("An Error ocurred")
	    }

    } catch (e) {
    	next(e)
    }
}

exports.deactivateUser = async (request, response, next) =>{   
    try{        
        user = await models.User.findOne({where: {id: request.params.id}})
        if(user && user.isActive){
            await user.update({isActive: false, reason_for_exit: request.body.reason})
            response.status(200).json({"message": "User deactivated", "reason": request.body.reason})
        }else{
            response.status(400).json({"error": "An Error ocurred"})
        }
    } catch (e) {
        next(e)
    }
}

exports.activateUser = async (request, response, next) =>{   
    try{        
        user = await models.User.findOne({where: {id: request.params.id}})
        if(user){
            await user.update({isActive: true, reason_for_exit: "reactivated by ME"})
            response.status(200).json({"message": "User reactivated"})
        }else{
            response.status(400).json({"error": "An Error ocurred"})
        }
    } catch (e) {
        next(e)
    }
}

exports.removeUser = async (request, response, next) =>{   
    try{     
        user = await models.User.findOne({where: {id: request.params.id}})
        if(user){
	        user.destroy()
            response.status(200).json({"message": "User removed"})
		}else{
			response.status(400).json({"error": "An Error ocurred"})
		}
    } catch (e) {
        next(e)
    }
}

exports.updateUser = async (request, response, next) =>{   
    try{        
        user = await models.User.findOne({where: {id: request.params.id}})
        if(user){
            await user.update({name: request.body.name, surname: request.body.surname, reason_for_exit: request.body.reason, progress: request.body.progress})
            response.status(200).json({"message": "OK"})
        }else{
            response.status(400).json({"error": "An Error ocurred"})
        }

    } catch (e) {
        next(e)
    }
}

exports.trackProgress = async (request, response, next) =>{
    try{
        user = await models.User.findOne({where: {id: request.params.id}, include:{model: models.Project}})
        if(!user){
        	response.status(400).json({"error": "user not found"})
        	return;
        }

        if(user.project.automatic_termination){
            user = await user.update({progress: request.body.progress})	            
            if(user.progress > (user.project.study_length * user.project.tests_per_day)){
                user = await user.update({isActive: false, reason_for_exit: "Terminated by system"}) 
                response.status(400).json({"message": "user was deactivated"})
                return;
            }else{
            	user = await user.update({isActive: true, reason_for_exit: ""}) 
	            response.status(200).json({"message": "progress updated"})
	            return;
            }
        } else {
        	user = await user.update({progress: request.body.progress})
			if(user)
				response.status(200).json({"message": "progress updated"})
			else
				response.status(400).json({"error": "an error occurred"})
            return;
        }
    } catch (e) {
        next(e)
    }
}
