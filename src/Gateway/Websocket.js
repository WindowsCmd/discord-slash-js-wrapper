'use strict';

const ws = require('ws');
const { EventEmitter } = require('events');
const ZlibSync = require('zlib-sync');
const Constants = require('./Constants');
const Payloads = require('./Payloads');

module.exports = class WebSocket extends EventEmitter {
    constructor(client) {
        super();
        this._client = client;
        this.is_ready = false;
        this.is_disconnected = false;
        this._ws = null;
        this._sessionId = null;
        this._heartbeat = null;
    }

    /**
     * Connects the client to the Discord Gateway
     * @param token
     */
    connect(token) {
        this._ws = new ws('wss://gateway.discord.gg/?v=' + Constants.GATEWAY_VERSION + '&encoding=json');
        this._ws.once('open', () => {
            this._WSConnect(Payloads.IDENTIFY({ token }));
        });
        this._ws.once('close', this._handleWSClose.bind(this));
        this._ws.once('error', this._handleWSError.bind(this));
        this._ws.on('message', this._handleWSMessage.bind(this));
    }

    /**
     * Disconnects the client from the Discord Gateway
     */
    disconnect() {
        this.is_disconnected = true;
        this._ws.terminate();
    }

    /**
     * Sends payload to the Discord gateway
     * @param payload
     */
    WSSend(payload) {
        if (typeof payload === 'string') {
            payload = JSON.parse(payload);
        }
        this._ws.send(JSON.stringify(payload));
    }

    _WSConnect(payload) {
        if (this._ws !== null && this._ws.readyState !== this._ws.CLOSED) {
            this.WSSend(payload);
        }
    }

    _handleWSMessage(data, flags) {
        const message = this._decompressWSMessage(data, flags);
        switch (message.d) {
            case Constants.GATEWAY_OP_CODES.DISPATCH:
                this._heartbeat = message.t;
                break;
            case Constants.GATEWAY_OP_CODES.HEARTBEAT:
                this.WSSend(Payloads.HEARTBEAT(this._heartbeat));
                break;
            case Constants.GATEWAY_OP_CODES.RECONNECT:
                this._ws.terminate();
                break;
            case Constants.GATEWAY_OP_CODES.HELLO:
                const token = this._client.token;
                if (this._client.presence !== null) {
                    this.WSSend(Payloads.PRESENCE(this._client.presence));
                }
                let payload;
                if (this._sessionId !== null && this._heartbeat !== null) {
                    payload = Payloads.RESUME({
                        sequence: this._heartbeat,
                        sessionId: this._sessionId,
                        token: this._client.token
                    });
                } else {
                    payload = Payloads.IDENTIFY({ token });
                }
                this._WSConnect(payload);
                break;
        }
        switch (message.t) {
            case "READY":
                if (!this.is_ready) {
                    this.emit('ready', message.d.user);
                    this.is_ready = true;
                    this._sessionId = message.d.session_id;
                }
                break;
            case "INTERACTION_CREATE":
                this.emit('message', message.d);
                break;
        }
    }

    _handleWSError(error) {
        if (this._ws !== null) {
            if (error) {
                throw error;
            }
        }
    }

    _handleWSClose(code, data) {
        if (this._ws !== null && !this.is_disconnected) {
            setTimeout(() => this.connect(this._client.token), 1000);
        }
    }

    _decompressWSMessage(message, flags) {
        if (typeof flags !== 'object')
            flags = {};
        if (!flags.binary) {
            return JSON.parse(message);
        } else {
            const inflate = new ZlibSync.Inflate();
            inflate.push(message, ZlibSync.Z_SYNC_FLUSH);

            if(inflate.err < 0) {
                throw new Error('An error has occured with Zlib: ' + inflate.msg);
            }
            return JSON.parse(inflate.toString());
        }
    }
};