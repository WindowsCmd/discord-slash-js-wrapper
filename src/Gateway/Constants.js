'use strict';

module.exports.API_VERSION = 7;
module.exports.GATEWAY_VERSION = 6;
module.exports.GATEWAY_ERRORS = {
    0: 'Gateway Error',
    4000: 'Unknown Error',
    4001: 'Unknown opcode',
    4002: 'Decode Error',
    4003: 'Not Authenticated',
    4004: 'Authentication Failed',
    4005: 'Already Authenticated',
    4007: 'Invalid Seq',
    4008: 'Rate Limited',
    4009: 'Session Timed Out',
    4010: 'Invalid Shard',
    4011: 'Sharding Required',
    4012: 'Invalid API Version',
    4013: 'Invalid Intent(s)',
    4014: 'Disallowed Intent(s)'
};

module.exports.GATEWAY_OP_CODES = {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    PRESENCE_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    RESUME: 6,
    RECONNECT: 7,
    REQUEST_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11,
    0: 'Dispatch',
    1: 'Heartbeat',
    2: 'Identify',
    3: 'Presence Update',
    4:  'Voice State Update',
    6:  'Resume',
    7:  'Reconnect',
    8:  'Request Guild Members',
    9:  'Invalid Session',
    10:  'Hello',
    11:  'Heartbeat ACK',
}