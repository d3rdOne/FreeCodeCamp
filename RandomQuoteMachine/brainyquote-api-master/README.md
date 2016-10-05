# brainquote-api [![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/fetch-quote/blob/master/LICENSE)


> Fetch daily quote from [http://www.brainyquote.com](http://www.brainyquote.com)


## Install

```
$ npm install fetch-quote --save
```

## Usage

```js
var quote = require('fetch-quote');

quote.get('funny', function (err, result) {
    
    if (err) {
        console.log(err);
    }
        
    if (result) {
        console.log(result.quote);  // the quote content
        console.log(result.author); // the quote author
        console.log(result.url);    // the author's link
    }
});

```
## API

### quote.get(type, callback)

**type**: the quote type, one of the following:

- `'today'`
- `'love'`
- `'funny'`
- `'art'`
- `'nature'`

**callback**: callback function with the quote result `function (err, result) { }`.

### quote.get(callback)

Equal to `quote.get('today', callback)`



## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/appin/brainquote-api/issues/new).
