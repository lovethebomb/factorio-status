import Rcon from 'rcon-ts';

import { IEvolution, evolutionInitialState, parseEvolution } from './evolution'
import { IPlayers, playersInitialState, parsePlayers } from './players'

class Factorio {
    players: IPlayers;
    seed: string;
    time: string;
    evolution: IEvolution;
    rcon: Rcon;

    constructor(rcon: Rcon) {
        if (!rcon) {
            throw new Error('missing apiKey parameter');
        }

        console.log(`[+] FactorioRcon created for ${rcon.host}:${rcon.port}, timeout of ${rcon.timeout}`);
        this.players = playersInitialState;
        this.seed = "";
        this.time = "";
        this.evolution = evolutionInitialState;
        this.rcon = rcon;
    }

    async run(): Promise<void> {
        await this.rcon
        .session(async (c) => {
            this.players = parsePlayers(await this.getPlayers(c))
            this.seed = await this.getSeed(c)
            this.time = await this.getTime(c)
            this.evolution = parseEvolution(await this.getEvolution(c))
        })
        .then(this.onComplete, this.onError);
    }

    async getPlayers(c:Rcon): Promise<string> {
        let players = await c.send("/players");
        console.debug('[+] getPlayers', players)
        return players;
    }
   
    async getSeed(c:Rcon): Promise<string> {
        let seed = await c.send("/seed");
        console.debug('[+] getSeed', seed)
        return seed;
    }

    async getTime(c:Rcon): Promise<string> {
        let time = await c.send("/time");
        console.debug('[+] getTime', time)
        return time;
    }

    async getEvolution(c:Rcon): Promise<string> {
        let evolution = await c.send("/evolution");
        console.debug('[+] getEvolution', evolution)
        return evolution;
    }

    

    onComplete(): void {
        console.log("[+] Session complete")
    }

    onError(e: any): void {
        console.error("[+] Error", e)
    }
}
export default Factorio;