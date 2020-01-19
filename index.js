#!/usr/bin/env node
'use strict';

const ask = require('asker-as-promised');
const argv = require('yargs').argv;
const cheerio = require('cheerio');
const pMap = require('p-map');

const { cleanLink, error, askerParams } = require('./src/util');
const report = require('./src/report');

if (!argv.artist) error("You need to pass --artist='…' argument.  See readme.");
if (!argv.album) error("You need to pass --album='…' argument.  See readme.");

const collection = [];

const services = new Map();
services.set('music.apple.com', 'Apple Music');
services.set('music.yandex.ru', 'Яндекс.Музыке');
services.set('spotify.com', 'Spotify');
services.set('tidal.com', 'Tidal');
services.set('discogs.com', 'Discogs');

const snippetSelector = '.kCrYT';

const grabLink = res => {
    if (res.statusCode !== 200) error(`Google HTTP status code is ${res.statusCode}`);

    const html = res.data.toString();
    const $ = cheerio.load(html);
    const firstSnippet = $(snippetSelector)[0];

    return {
        service: res.meta.options.service,
        text: services.get(res.meta.options.service),
        link: cleanLink(firstSnippet.children[0].attribs.href)
    };
};

const process = (service) => {
    return ask(askerParams({
        artist: argv.artist,
        album: argv.album,
        service
    }))
        .then(grabLink)
        .catch(error => console.error(error));
};

const actions = [];

if (argv.service) {
    if (!services.has(argv.service)) error('You need to pass valid service domain. See readme.');

    actions.push(argv.service);
} else {
    for (let entry of services.keys()) {
        actions.push(entry);
    }
}

pMap(actions, service => process(service), {concurrency: 5})
    .then(result => {
        const reportTypes = new Set(['markdown', 'plaintext', 'html', 'json']);
        let type;
        if (argv.format) {
            if (reportTypes.has(argv.format)) {
                type = argv.format;
            } else {
                error('You need to pass valid format type. See readme.');
            }
        } else {
            type = reportTypes.keys().next().value; // first format type
        }

        console.log(report[type]({
            artist: argv.artist,
            album: argv.album,
            links: result
        }));
    });
