const REGEX_ONLINE_PLAYER = /\(online\)$/;

export interface IPlayers {
    online: string[];
    onlineCount: number;
    total: string[];
    totalCount: number;
    players: string[];
    raw: string;
}

export const playersInitialState: IPlayers = {
    online: [],
    onlineCount: 0,
    total: [],
    totalCount: 0,
    players: [],
    raw: ""
}

export function parsePlayers(players: string) {
    let parsedPlayers : string[] | undefined = players.split('\n');
    const playerList = parsedPlayers.slice()
    playerList.shift(); // remove first entry

    const online = playerList.filter(player => REGEX_ONLINE_PLAYER.test(player));
    parsedPlayers = undefined;
    return {
        online: online,
        onlineCount: online.length,
        total: playerList,
        totalCount: playerList.length,
        players: playerList,
        raw: players
    }
}
