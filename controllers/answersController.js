const models = require('../models')

exports.getAllAnswers = async (request, response, next) =>{
    try{
        answers = await models.Answer.findAll()
        response.status(200).json(answers)
    } catch (e) {
        next(e)
    }
}

exports.getAnswersOf = async (request, response, next) =>{
    try{
        user = await models.User.findOne({where: {code: request.params.code, projectId: request.params.projectId}})
        if(user){
            answers = await models.Answer.findAll({where: {userId: user.id}, include:{model: models.Question, where: {projectId: request.params.projectId}}}) //, order: [['id', 'ASC']]
            answers.userName = user.name;
            response.status(200).json(answers)
        } else {
            response.status(404).json('User not found')
        }
    } catch (e) {
        next(e)
    }
}

exports.addAnswer = async (request, response, next) =>{	
    try{
    	await models.Answer.create({questionId: request.params.questionId, userId: request.params.userId, text: request.body.text, index: request.body.progress})
        .then(function(){
            response.status(200).json({"message": "Answer created"})    
        })
        .error(function(){
        	response.status(400).json({"error": "an error occurred"})    
        })
    } catch (e) {
        next(e)
    }
}

exports.removeAnswer = async (request, response, next) =>{ 
    try{        
        answer = await models.Answer.findOne({where: {id: request.params.id}})        
        if(answer){
            await answer.destroy()
            response.status(200).json('Answer destroyed')
        }else{
            response.status(400).json("An Error ocurred")
        }
    } catch (e) {        
        next(e)
    }
}