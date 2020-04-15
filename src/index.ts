#!/usr/bin/env node
"use strict";

import assert from "assert";

import ask from "asker-as-promised";
import { argv } from "yargs";
import cheerio from "cheerio";
import pMap from "p-map";

import { cleanLink, askerParams, parseArgvParams } from "./util";
import report from "./report";
import {SNIPPET_SELECTOR, SERVICES} from "./constants";

const params = parseArgvParams(argv);

type Link = {
    service: string;
    text: string;
    link: string;
};

interface MetaOptions extends ask.Params {
    service: string;
}

const grabLink = (res: ask.ResponseValue): void|Link => {
    assert(res.statusCode === 200, `Google HTTP status code is ${res.statusCode}`);
    if (res.data === null) {
        console.error('Fail to get data :(');
    } else {
        const html = res.data.toString();
        const $ = cheerio.load(html);
        const firstSnippet = $(SNIPPET_SELECTOR)[0];

        const options = res.meta.options as MetaOptions;

        return {
            service: options.service,
            text: String(SERVICES.get(options.service)),
            link: cleanLink(firstSnippet.children[0].attribs.href)
        };
    }
};

const process = (service: string): Promise<void|Link> => ask(askerParams({
        artist: params.artist,
        album: params.album,
        service
    }))
        .then(grabLink)
        .catch(error => console.error(error));

pMap(Array.from(SERVICES.keys()), service => process(service), {concurrency: 5})
    .then(result => {
        console.log(report({
            artist: String(argv.artist),
            album: String(argv.album),
            links: result
        }));
    });
