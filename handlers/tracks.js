'use strict';
var dataProvider = require('../data/tracks_dev.js');
/**
 * Operations on /tracks
 */
module.exports = {
    /**
     * summary: get track by id
     * description: Get trucks by id

     * parameters: id
     * produces: application/json
     * responses: 200, 400
     */
    get: function getTrack(req, res, next) {
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
     * summary: Post track
     * description: Post tracks from corezoid

     * parameters: track
     * produces: application/json
     * responses: 200, 400
     */
    post: function postTrack(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
