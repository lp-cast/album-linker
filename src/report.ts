type Link = {
    service: string;
    text: string;
    link: string;
}

type Params = {
    artist: string;
    album: string;
    links: (void|Link)[]
}

const report = (opts: Params): string => {
    return [
        `Альбом «${opts.album}» в `,
        opts.links.map(item => {
            if (!item) return;
            return `  [${item.text}](${item.link})`;
        }).join(', \n')
    ].join('\n');
};

export default report;
