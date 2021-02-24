var checkToken = require('./middleware').checkToken;
var moment = require('moment');
var { Op } = require('sequelize');

module.exports = (path, db, app) => {
    const errHandler = (err, res) => {
        console.log(err.cause);
        res.status(err.statusCode).json(err.cause);
    };

    const getLastHourSessionInfo = (req, res) => {
        console.log(moment());
        const filterOutLastSessions = moment()
            .tz(process.env.TZ)
            .subtract(30, 'minutes')
            .toDate();

        const filter = {
            where: {
                createdAt: {
                    [Op.gte]: filterOutLastSessions,
                },
            },
            order: [['createdAt', 'DESC']],
        };

        db.session
            .findAll(filter)
            .then(result => {
                if (result) {
                    return res.status(200).json(result);
                }
            })
            .catch(error => errHandler({ statusCode: 500, cause: error }, res));
    };

    const postNewSession = (req, res) => {
        const entry = {
            license_plate: req.body.license_plate,
            additional_results: req.body.additional_results,
            picture_name: req.body.picture_name,
        };

        db.session
            .create(entry)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(error => errHandler({ statusCode: 500, cause: error }, res));
    };

    // TODO: add token validation
    app.get(path, getLastHourSessionInfo);
    app.post(path, postNewSession);
};
