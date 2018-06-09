const REGEX_PERCENT = /(\d+)%/g;
const REGEX_EVOLUTION_FACTOR = /^Evolution factor\: (.*)\./;

function getNumberFromPercent(percent: string): number {
    return parseFloat(percent.substr(0, percent.length - 1));
}

export interface IEvolution {
    factor: number;
    time: number;
    timePercent: number;
    pollution: number;
    pollutionPercent: number;
    spawnersKills: number;
    spawnersKillsPercent: number;
    raw: string;
}

export const evolutionInitialState: IEvolution = {
    factor: 0,
    time: 0,
    timePercent: 0,
    pollution: 0,
    pollutionPercent: 0,
    spawnersKills: 0,
    spawnersKillsPercent: 0,
    raw: ""
}

export function parseEvolution(evolution: string): IEvolution {
    let factor : RegExpMatchArray | number | null = evolution.match(REGEX_EVOLUTION_FACTOR);
    if (!factor) {
        throw new Error('Evolution is missing factor.')
    }
    factor = parseFloat(factor[1]);
    const factors : RegExpMatchArray | number | null = evolution.match(REGEX_PERCENT);
    if (!factors) {
        throw new Error('Evolution is missing time, pollution, and spawner kills.')
    }

    const [ timePercent, pollutionPercent, spawnersKillsPercent ] = factors.map(factor => getNumberFromPercent(factor));
    return {
        factor,
        time: timePercent / 100,
        timePercent,
        pollution: pollutionPercent / 100,
        pollutionPercent,
        spawnersKills: spawnersKillsPercent / 100,
        spawnersKillsPercent,
        raw: evolution
    }
}