const { URL } = require('url');

const SPACE = ' ';

module.exports = {
    /**
     *
     * @param {String} relativeLink
     * @return {*}
     */
    cleanLink: (relativeLink) => {
        return (new URL('https://test.com' + relativeLink))
            .searchParams
            .get('q');
    },

    /**
     *
     * @param {String} msg
     */
    error: (msg) => {
        console.error(msg);
        process.exit(1);
    },

    /**
     *
     * @param {Object} opts
     *   @param {String} opts.artist
     *   @param {String} opts.album
     *   @param {String} opts.service
     * @return {{path: string, protocol: string, hostname: string, maxRetries: number, method: string, query: {q: string}, timeout: number}}
     */
    askerParams: (opts) => ({
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
    })
};