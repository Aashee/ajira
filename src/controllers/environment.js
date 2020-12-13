const responseHandler = require('../responseHandler');


module.exports = {

    configure: async (req, res, next) => {
        try {
            console.log(req.body);
            global.environment = req.body;
            res.status(201).json(responseHandler.handleResponse('Successfully created'));
        } catch (err) {
            console.log('Error in environment configure API : ', err);
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            let body = req.body;
            if (body.temperature) {
                global.environment.temperature = body.temperature
            } else if(body.storm){
                global.environment.storm = body.storm
            }
            res.status(200).json(responseHandler.handleResponse('Updated Successfully'));

        } catch (err) {
            console.log('Error in environment update API : ', err);
            next(err);
        }
    }

}