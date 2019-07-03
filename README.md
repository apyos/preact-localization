# preact-localization 🌎 [![npm](https://img.shields.io/npm/v/preact-localization.svg?style=flat)](https://npm.im/preact-localization) [![travis](https://travis-ci.org/apyos/preact-localization.svg?branch=master)](https://travis-ci.org/apyos/preact-localization) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fapyos%2Fpreact-localization.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fapyos%2Fpreact-localization?ref=badge_shield)

**Simple localization for Preact.**

This library is heavily inspired of [preact-i18n](https://github.com/synacor/preact-i18n) and generally respects the same API, although it's not as complete. In particular, the following features are not available:

- The `withText()` and `intl()` wrappers
- Nested providers
- Highlighting nodes

Features include:

- Tiny: less than 850kb gzipped
- Supports pluralization of strings
- Supports template `{{fields}}` in definition values
- Good test coverage

There are also a few other differences:

- A single way of defining pluralization objects (`{ none, one, many }`)
- Usage of the new `createContext` API instead of the legacy context API
- Fields are encoded to prevent XSS attacks

---

- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Fallback Text](#fallback-text)
  - [Pluralization and Templating](#pluralization-and-templating)

<!-- /MDTOC -->

## Installation

```sh
npm install --save preact-localization
```

## Getting Started

1. Create a definition. Typically JSON files, we'll call ours `fr.json`:

```json
{
  "news": {
    "title": "Nouvelles du Monde",
    "totalStories": {
      "none": "Aucun article",
      "one": "Un article",
      "many": "{{count}} articles"
    }
  }
}
```

2. Expose the definition to your whole app via `<IntlProvider>`:

```js
import { IntlProvider } from 'preact-localization'
import definition from './fr.json'

render(
  <IntlProvider definition={definition}>
    <App />
  </IntlProvider>
)
```

3. Use `<Text />` to translate string literals:

```js
import { Text } from 'preact-localization'

// Assume the "stories" prop is a list of news stories.
const App = ({ stories = [] }) => (
  <div class="app">
    <h1>
      {/* Default fallback text example: */}
      <Text id="news.title">World News</Text>
    </h1>
    <footer>
      {/* Pluralization example: */}
      <Text
        id="news.totalStories"
        plural={stories.length}
        fields={{
          count: stories.length
        }}
      />
    </footer>
  </div>
)
```

That's it!

### Fallback Text

Rendering our example app with an empty definition _(or without the Provider)_ will attempt to use any text contained within `<Text>..</Text>` as fallback text.

In our example, this would mean rendering without a definition for `news.title` would produce `<h1>World News</h1>`.

If we provide a definition that has a `title` key inside a `news` object, that value will be rendered instead.

### Pluralization and Templating

In our example, `<footer>` is using `<Text>` as a convenient way to do pluralization and templating. In our definition, `news.totalStories` is an Object with pluralization keys. The values in that object will be selected based on an integer `plural` prop passed to `<Text>`.

Any definition value _(including pluralization values)_ can contain `{{field}}` placeholders. These placeholders get replaced with matched keys in an object passed as the `fields` prop. In our example, the "many" plural form is such a template - it will render `"5 articles"` when `fields={{ count: 5 }}`.

The available forms for specifying pluralization values are as follows:

- `"key": { "singular": "apple", "plural": "apples" }`
- `"key": { "none": "no apples", "one": "apple", "many": "apples" }`
- `"key": ["apples", "apple"]`

Taking `<Text id="news.totalStories" ..>` from our example:

- `<.. plural={0}>` renders `Aucun article` _(no articles)_
- `<.. plural={1}>` renders `Un article` _(one article)_
- `<.. plural={2} fields={{ count: 2 }}>` renders `2 articles`
- `<.. plural={3} fields={{ count: 3 }}>` renders `3 articles`

In addition to [`<Text>`](#Text), [`<Localizer>`](#Localizer) provides a ways to translate more than just display text - HTML attributes, component props, arbitrary Strings, etc.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fapyos%2Fpreact-localization.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fapyos%2Fpreact-localization?ref=badge_large)
