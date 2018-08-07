import { EventEmitter } from 'events';

const io = require('socket.io-client');


export class NetworkService extends EventEmitter {
    lobbyConnection: any;

    public connectToServer(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {

        });
    }
}