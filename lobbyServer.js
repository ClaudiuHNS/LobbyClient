const app = require('http').createServer(handler);
const io = require('socket.io')(app);

app.listen(9090);

function handler(res, res) {
    res.writeHead(403);
    return res.end('Forbidden');
}

/* STATIC DATA TO TEST */
const lobby = {
    gamemode: "One for all",
    hostSettings: {
        "gameMode": "One for all",
        "hostSettings": [
            {
                "name": "Gold generation rate",
                "help": "How much gold is generated per 5 seconds in game",
                "field": "text",
                "type": "float",
                "default": "5",
                "binding": "gold-generation-rate"
            },
            {
                "name": "Enable gold generation",
                "help": "Should gold generation be enabled?",
                "field": "checkbox",
                "type": "boolean",
                "default": "true", //should allow "true" and "false" only
                "binding": "gold-generation-enabled"
            },
            {
                "name": "Lives",
                "help": "How many times a player can respawn (-1 for unlimited)",
                "field": "text",
                "type": "integer",
                "default": "-1",
                "binding": "lives"
            },
            {
                "name": "Damage multiplier",
                "help": "Global damage multiplier",
                "field": "select",
                "type": "integer",
                "options": {
                    "1x": "1",
                    "2x": "2",
                    "4x": "4",
                    "8x": "8"
                },
                "default": "1", // index of selected option
                "binding": "damage-multiplier"
            },
            {
                "name": "Map",
                "help": "The map the game is to be played on",
                "field": "mapSelect",
                "options": "*",
                "binding": "map",
            },
            {
                "name": "Enabled champions",
                "help": "Allowed champions",
                "field": "championSelectMulti",
                "options": "*",
                "default": "*",
                "binding": "enabled-champions"
            },
            {
                "name": "Enabled summoner spells",
                "help": "Allowed summoner spells",
                "field": "spellSelectMulti",
                "options": "*",
                "default": "*",
                "binding": "enabled-spells"
            }
        ],
        "playerSettings": [
            {
                "name": "Champion",
                "help": "Champion you want to play",
                "field": "championSelect",
                "type": "championSelect",
                "options": "{enabled-champions}"
            },
            {
                "name": "Summoner spells",
                "help": "The summoner spells you want to use",
                "field": "summonerSpellSelect",
                "options": "{enabled-spells}",
            }
        ]
    }
}

io.on('connection', function(socket) {
    socket.emit('lobby-settings', lobby);
});