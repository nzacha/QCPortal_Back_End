const models = require('../models')

const crypto = require('crypto')
SECRET_KEY = "26121997"
const getHashOf = (message) => {
  const hash = crypto
    .createHmac('sha256', Buffer.from(SECRET_KEY, 'hex'))
    .update(message)
    .digest('hex')

  return hash
}
exports.authenticateCredentials = async (request, response, next) =>{
    try{
        var {username, password} = request.body;
        password = getHashOf(password);
        researcher = await models.Researcher.findOne({attributes: ['id','name', 'surname', 'email', 'phone','is_super_user'], where: {email: username, password: password}, include:{model: models.Project, as: 'projects'}})
        if(researcher){
            response.status(200).json(researcher)
        } else {
            response.status(400).json("An error ocurred")
        }
    } catch (e) {
        next(e)
    }
}