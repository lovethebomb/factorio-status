# factorio-status

[![Build Status](https://travis-ci.com/lovethebomb/factorio-status.svg?branch=master)](https://travis-ci.com/lovethebomb/factorio-status

The mini server status for the [Factorio](https://www.factorio.com) server [factorio.ilot.sh](https://factorio.ilot.sh), based on [rcon-ts](https://github.com/electricessence/rcon-ts).

## Usage

```bash
git clone git@github.com:lovethebomb/factorio-status.git
```

Create a `.env` file with `KEY=value` as decribed:

```bash
RCON_HOST="your-server-hostname" | default factorio.domain.tld
RCON_PORT=your-server-port | default 27015
RCON_PASSWORD=your-server-port
RCON_TIMEOUT=your-server-timeout | default 5000
```

## Development

```bash
npm run dev
```

## Testing

```bash
npm run test
```

## Production

A [Dockerfile](Dockerfile) is provided.

The build-and-run step is:

```bash
npm run build && npm run start
```

You can provide the `.env` file through a Docker volume and override the port `envvar` if needed.

```bash
docker run -v -e "PORT=3000" /path/to/.env:/app/.env factorio-status
```
