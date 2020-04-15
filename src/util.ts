import yargs from "yargs";
import assert from "assert";

const { URL } = require('url');

const SPACE = ' ';

const cleanLink = (relativeLink: string): string => (new URL('https://test.com' + relativeLink)).searchParams.get('q');

type Opts = {
    artist: string;
    album: string;
    service: string;
}

const askerParams = (opts: Opts) => ({
    method: 'get',
    protocol: 'https:',
    hostname: 'www.google.com',
    path: '/search',
    query: {
        q: [
            opts.artist,
            opts.album,
            'site:' + opts.service
        ].join(SPACE)
    },
    timeout: 1000,
    maxRetries: 2,
    service: opts.service
});

type CliParams = {
    artist: string;
    album: string;
}

const parseArgvParams = (argv: yargs.Arguments): CliParams => {
    assert(argv.artist, "You need to pass --artist=\"…\" argument.  See readme.");
    assert(argv.album,"You need to pass --album=\"…\" argument.  See readme.");

    return {
        artist: String(argv.artist),
        album: String(argv.album)
    };
};


export {
    cleanLink,
    askerParams,
    parseArgvParams,
};
