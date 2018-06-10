const express = require('express')
const apicache = require('apicache');
const cache = apicache.middleware;
import Rcon, { RconConfig } from 'rcon-ts';

import Factorio from './factorio';

require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const DEFAULT_CACHE = "2 minutes";
const RCON_HOST = process.env.RCON_HOST || 'factorio.lucas.computer';
const RCON_PORT = process.env.RCON_PORT || 27015;
const RCON_PASSWORD = process.env.RCON_PASSWORD || null;
const RCON_TIMEOUT = process.env.RCON_TIMEOUT || 5000;

// Fail early
if (!RCON_PASSWORD ) {
    throw new Error('Missing RCON_PASSWORD, are you sure your env is set correctly?');
}

const config: RconConfig = {
    host: RCON_HOST,
    port: ~~RCON_PORT,
    password: RCON_PASSWORD,
    timeout: ~~RCON_TIMEOUT
}

// Factorio
const rcon = new Rcon(config);
rcon.enableConsoleLogging = true;
const factorio = new Factorio(rcon);


// Express
const app = express();
app.set('view engine', 'pug');

// Routes
app.get('/', cache(DEFAULT_CACHE), async (req: any, res: any) => {
    let data = {};
    await factorio.run();
    console.debug(factorio.rcon.errors);
    if (factorio.rcon.errors && factorio.rcon.errors.length > 0) {
        data = {
            isUp: false
        }
    } else {
        data = {
            players: factorio.players,
            seed: factorio.seed,
            time: factorio.time,
            evolution: factorio.evolution,
            isUp: true
        }
    }
    res.render('index', data);
});
app.listen(PORT, () => console.log('[+] express is running on ' + PORT));