const responseHandler = require('../responseHandler');

module.exports = {

    configure: async (req, res, next) => {
        try {
            console.log(req.body);
            req.body.steps = 0;
            global.rover = req.body;
            res.status(201).json(responseHandler.handleResponse('Successfully created'));
        } catch (err) {
            console.log('Error in rover configure API : ', err);
            next(err);
        }
    },

    move: async (req, res, next) => {
        try {
            console.log(req.body);
            let row, column;
            let rover = global.rover;
            let position = rover['deploy-point'];
            switch (req.body.direction) {
                case 'up': {
                    row = position.row + 1;
                    break
                }
                case 'down': {
                    row = position.row - 1;
                    break
                }
                case 'right': {
                    column = position.column + 1;
                    break;
                }
                case 'left': {
                    column = position.column - 1;
                    break;
                }
            }
            let totalRows = global.environment['area-map'].length;
            let totalCols = global.environment['area-map'][0].length;
            console.log(totalRows, totalCols);
            if (row >= totalRows || column >= totalCols || row <= 0 || column <= 0) {
                return res.status(428).json(responseHandler.handleError('Can move only within mapped area', 428));
            }
            if(global.environment.storm){
                return res.status(428).json(responseHandler.handleError('Cannot move during a storm', 428));
            }
            rover['deploy-point'].row = row || rover['deploy-point'].row;
            rover['deploy-point'].column = column || rover['deploy-point'].column;
            rover.battery = rover.battery ? rover.battery -1 : rover['initial-battery'] - 1;
            rover.steps += 1
            if(rover.steps === 10){
                rover.steps = 0;
                rover.battery = 10;
            }
            res.status(200).json(responseHandler.handleResponse('Successfully moved'));

        } catch (err) {
            console.log('Error in rover move API : ', err);
            next(err);
        }
    },

    status: async (req, res, next) => {
        try {
            let environment = global.environment;
            let rover = global.rover;
            let result = {};
            let row = rover['deploy-point'].row;
            let column = rover['deploy-point'].column;
            result.rover = {
                location: {
                    row: row,
                    column: column
                },
                battery: rover.battery || rover['initial-battery'],
                inventory: rover.inventory
            }
            result.environment = {
                temperature: environment.temperature,
                humidity: environment.humidity,
                'solar-flare': environment['solar-flare'],
                storm: environment.storm,
                terrain: environment['area-map'][row][column]
            }
            res.status(200).json(responseHandler.handleResponse(result));

        } catch (err) {
            console.log('Error in rover status API : ', err);
            next(err);
        }
    }

}