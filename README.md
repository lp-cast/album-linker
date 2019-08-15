# Album Linker for LP Podcast

## Requirements

 - Node.js v8.6.0
 - npm v6.2.0

## Install

```
git clone https://github.com/lp-cast/album-linker.git && cd album-linker && npm i

```

# Usage

For all links:
```
./index.js --artist='Foo Fighters' --album='Wasting Light'
```



For one service only:
```
./index.js --artist='Foo Fighters' --album='Wasting Light' --service='tidal.com'
```

Valid services:
 - music.apple.com
 - music.yandex.ru
 - spotify.com
 - tidal.com
 
Default: `album-linker` search in all services.

For specific output format:
```
./index.js --artist='Foo Fighters' --album='Wasting Light' --format='html'
```

Valid formats:
 - markdown
 - html
 - plaintext
 - json
 
 Default: `album-linker` output in markdown.
