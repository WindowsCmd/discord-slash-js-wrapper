'use strict';

const Constants = require('./Constants');
const MODULE_NAME = require('../../package').name;

module.exports.HEARTBEAT = (sequence) => {
    return {
        op: Constants.GATEWAY_OP_CODES.HEARTBEAT,
        d: sequence
    };
};
module.exports.IDENTIFY = (data) => {
    return {
        op: Constants.GATEWAY_OP_CODES.IDENTIFY,
        d: {
            token: data.token || null,
            properties: {
                $os: require('os').platform(),
                $browser: MODULE_NAME,
                $device: MODULE_NAME
            }
        }
    };
};
module.exports.PRESENCE = (data) => {
    return {
        op: Constants.GATEWAY_OP_CODES.PRESENCE_UPDATE,
        d: {
            game: {
                name: data.game.name || null,
                type: data.game.type || 0,
                url: data.game.url || null
            },
            status: data.status || 'online',
            since: data.since || Date.now(),
            afk: !!data.afk
        }
    };
};
module.exports.RESUME = (data) => {
    return {
        op: Constants.GATEWAY_OP_CODES.RESUME,
        d: {
            seq: data.sequence,
            session_id: data.sessionId,
            token: data.token
        }
    }
};