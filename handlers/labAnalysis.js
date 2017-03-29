'use strict';
var dataProvider = require('../data/labAnalysis.js');
/**
 * Operations on /labAnalysis
 */
module.exports = {
    /**
     * summary: get all lab analysis to you account
     * description: By passing in the appropriate options, you can get
available updated laboratory abalysis in the system

     * parameters: sourceID, id, limit
     * produces: application/json
     * responses: 200, 400
     */
    get: function getlabAnalysis(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: set waybills inactive
     * description: By passing in the appropriate options, you can set
lab analys inactive

     * parameters: sourceID, labAnalysKey
     * produces: application/json
     * responses: 200, 400
     */
    patch: function pushLabAnalysis(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['patch']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: adds an waybill
     * description: Adds an laboratory analysis to the system
     * parameters: labAnalys
     * produces: application/json
     * responses: 201, 400, 409
     */
    post: function addLabAnalysis(req, res, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        var status = 201;
        var provider = dataProvider['post']['201'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: delete an lab analys
     * description: Delete an laboratory analys from the system
     * parameters: delLabAnalys
     * produces: application/json
     * responses: 201, 400
     */
    delete: function delLabAnalys(req, res, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        var status = 201;
        var provider = dataProvider['delete']['201'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
