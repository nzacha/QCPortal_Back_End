const models = require('../models')

exports.getAllQuestions = async (request, response, next) =>{
    try{
        questions = await models.Question.findAll({include:{model: models.Question_Option}})
        response.status(200).json(questions)
    } catch (e) {
        next(e)
    }
}

exports.getQuestionsOf = async (request, response, next) =>{
    try{
        questions = await models.Question.findAll({where: {projectId: request.params.projectId}, include:{model: models.Question_Option}})
        response.status(200).json(questions)
    } catch (e) {
        next(e)
    }
}

exports.addQuestion = async (request, response, next) =>{	
    try{    	
        project = await models.Project.findOne({where: {id: request.params.projectId}})
        if(project){
	    	model = await models.Question.create({question_type: request.body.type, question_text: request.body.question, projectId: request.params.projectId, levels: request.body.levels, orientation: request.body.orientation, request_reason: request.body.request_reason})
	    	response.status(200).json(model)
	    }else{
	    	response.status(400).json("An Error ocurred")
	    }
    } catch (e) {
    	next(e)
    }
}

exports.removeQuestion = async (request, response, next) =>{   
    try{        
        question = await models.Question.findOne({where: {id: request.params.id}})
        if(question){
            await  question.destroy()            
            response.status(200).json('Question destroyed')
        }else{
            response.status(400).json("An Error ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.addQuestionOption = async (request, response, next) =>{   
    try{        
        question = await models.Question.findOne({where: {id: request.params.questionId}})        
        if(question){
            option = await models.Question_Option.create({questionId: request.params.questionId, option: request.body.text})
            response.status(200).json(option)
        }else{
            response.status(400).json("An Error ocurred")
        }
    } catch (e) {
        next(e)
    }
}


exports.removeQuestionOption = async (request, response, next) =>{   
    try{        
        questionOption = await models.Question_Option.findOne({where: {id: request.params.id}})
        if(questionOption){
            await  questionOption.destroy()            
            response.status(200).json('Question destroyed')
        }else{
            response.status(400).json("An Error ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.updateQuestion = async (request, response, next) => {
    try {
        var question = await models.Question.findOne({where: {id: request.params.id}});
        if (question){
            await question.update({question_text: request.body.question_text, question_type: request.body.question_type, levels: request.body.levels, orientation: request.body.orientation, request_reason: request.body.request_reason});
            response.status(200).json("OK")
        } else { 
            response.status(400).json("An Error ocurred");
        }
    } catch (e) {
        next(e)
    }
}

exports.updateQuestionOption = async (request, response, next) => {
    try {
        var questionOption = await models.Question_Option.findOne({where: {id: request.params.id}});
        if (questionOption){
            await questionOption.update({option: request.body.question_option});
            response.status(200).json("OK")
        } else { 
            response.status(400).json("An Error ocurred");
        }
    } catch (e) {
        next(e)
    }
}