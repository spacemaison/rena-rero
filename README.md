Rena Rero
=========

Rena Rero is a application router for [React Native][] that uses the [Redux][] pattern. It wraps the Navigation component from React Native with a familiar router interface. It presumes that you're already using the excellent [React Redux][] library.

Installation
------------

```bash
npm install --save rena-rero
```

Usage
-----

### Simple Navigation

#### Main.js
```js
import React, { AppRegistry } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, router } from 'rena-rero'
import { PageA } from './PageA-Example'
import { PageB } from './PageB-Example'

// It's required that we hook the router into the applications store.
// __DO NOT FORGET TO DO THIS__
const store = createStore(combineReducers({ router }))

class App extends React.Component {
  render () {
    const routes = [
      PageA,
      PageB
    ]

    return (
      <Provider store={store}>
        <Router routes={routes} initialRoute='PageA' store={store} />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Example', () => App)
```

#### PageA-Example.js
```js
import React from 'react-native'
import { Link } from 'rena-rero'

export class PageA extends React.Component {
  static get title () { return 'Page A Title' }

  render () {
    <Link to='PageB' />
  }
}
```

#### PageB-Example.js
```js
import React from 'react-native'
import { Link } from 'rena-rero'

export class PageB extends React.Component {
  static get title () { return 'Page B Title' }

  render () {
    <Link to='PageA' />
  }
}
```

### Adding A Navigation Shelf
```js
import React, { View, Text } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, router } from 'rena-rero'

const store = createStore(combineReducers({ router }))

class App extends React.Component {
  render () {
    const routes = []

    return (
      <Provider store={store}>
        <Router
            routes={routes}
            store={store}
            renderShelf={this.renderShelf.bind(this)} />
      </Provider>
    )
  }

  renderShelf () {
    return (
      <View>
        <Text>Im on a shelf b*#@*!</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('example', () => App)
```

### Manually Pushing and Popping Pages
```js
import { pushPage, popPage } from 'rena-rero'
import { store } from './where-ever-your-store-is'

// Moves forward to SomePage, passing { extra: 'props' } on instantiation
store.dispatch(pushPage({ page: 'SomePage', pass: { extra: 'props' } }))

// Pops back to the previous page before SomePage
store.dispatch(popPage())
```

[React Native]: http://TODO
[Redux]: http://TODO
[React Redux]: http://TODO
