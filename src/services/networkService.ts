import { EventEmitter } from 'events';

import * as io from 'socket.io-client';


export class NetworkService extends EventEmitter {
    public lobbyConnection: any;
    public lobby: lobby.Lobby;

    constructor() {
        super();

        this.lobby = {
            name: '',
            creator: '',
            gamemodeName: '',
            teams: [],
            players: [],
            settings: [],
        };
    }

    public connectToLobby(url: string, username = 'Player', password?: string): Promise<void> {
        if (this.lobbyConnection) {
            throw new Error('Already connected to lobby');
        }
        return new Promise<void>((resolve, reject) => {
            this.lobbyConnection = io.connect(url, { reconnection: false });
            this.lobbyConnection.on('connect', () => {
                this.lobbyConnection.emit('lobby-connect', { username, password });
            });
            this.lobbyConnection.on('connect_error', reject);
            this.lobbyConnection.on('lobby-connect',
                (content: any) => this.handleLobbyConnect(content, resolve, reject));
        });
    }

    public handleLobbyConnect(content: any, resolve: any, reject: any) {
        if (content.ok) {
            this.lobby = {
                name: content.name,
                creator: content.creator,
                gamemodeName: content.gameMode,
                teams: [],
                players: [],
                settings: [],
            };
            this.addHandlers();
            resolve(content);
        } else {
            reject(content);

            this.lobbyConnection.close();
            this.lobbyConnection = null;
        }
    }

    public addHandlers() {
        if (!this.lobbyConnection) {
            throw new Error('Not connected to lobby');
        }

        this.lobbyConnection.on('lobby-settings', (lobbySettings: any) => {
            console.log(lobbySettings);
        });
    }

    public disconnect() {
        if (this.lobbyConnection) {
            this.lobbyConnection.close();
            this.lobbyConnection = null;
        }
    }
}

const instance = new NetworkService();
export default instance;
