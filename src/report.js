// {
//     artist: ''
//         album: ''
//     links: [
//          {
//              service: 'tidal.com',
//              link: '…',
//              text: 'на Apple Music'
//          },
//          …
//     ]
// }

module.exports = {
    markdown: (opts) => {
        return [
            `Альбом «${opts.album}»`,
            opts.links.map(item => {
                return `[${item.text}](${item.link})`;
            }).join(', \n')
        ].join(' ');
    },

    plaintext: (opts) => {
        return [
            `Альбом «${opts.album}»`,
            opts.links.map(item => {
                return `${item.text} ${item.link}`;
            }).join(', ')
        ].join(' ');
    },

    html: (opts) => {
        return [
            `Альбом «${opts.album}»`,
            opts.links.map(item => {
                return `<a href="${item.link}">${item.text}</a>`;
            }).join(', ')
        ].join(' ');
    },

    json: (opts) => JSON.stringify(opts)
};