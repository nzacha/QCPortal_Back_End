const models = require('../models')

exports.getUsers = async (request, response, next) =>{
    try{
    	users = await models.User.findAll({attributes: ['id','name', 'surname', 'username']})
        response.status(200).json(users)
    } catch (e) {
        next(e)
    }
}


const crypto = require('crypto')
SECRET_KEY = "26121997"
const getHashOf = (message) => {
  const hash = crypto
    .createHmac('sha256', Buffer.from(SECRET_KEY, 'hex'))
    .update(message)
    .digest('hex')

  return hash
}
exports.addUser = async (request, response, next) =>{   
    try{        
        var {username, password, isSuper} = request.body
        if(username && password){
            password = getHashOf(password)
            user = await models.User.create({username: username, password: password, isSuper: isSuper})
            if(user){
                //response.status(200).json("User '" + username +"' created")
                response.status(200).send("OK")
            }else{
                response.status(400).send("An Error ocurred")
            }
        }else{
            response.status(400).send("An Error ocurred")
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
            //response.status(200).send("User removed")
            response.status(200).send("OK") 
        }else{
            response.status(400).send("An Error ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.updateUser = async (request, response, next) =>{ 
    try{        
        user = await models.User.findOne({where: {id: request.params.id}})
        var {username, password, name, surname} = request.body
        if (user){
            if(password)
                password = getHashOf(password)
            await user.update({name: name, surname: surname, username: username, password: password})
            user = await models.User.findOne({attributes: ['id','name', 'surname', 'username', 'isSuper'], where: {id: request.params.id}})
            response.status(200).json(user);
        } else {
            response.status(404).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}