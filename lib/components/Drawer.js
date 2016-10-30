import React from 'react'
import ImperativeDrawer from 'react-native-drawer-layout'

export class Drawer extends React.Component {
  static get propTypes () {
    return ImperativeDrawer.propTypes
  }

  static get contextTypes () {
    return {
      store: React.PropTypes.object
    }
  }

  static get positions () {
    return ImperativeDrawer.positions
  }

  componentDidMount () {
    this._subscribeToStore()
  }

  componentWillUnmount () {
    this._unsubscribeToStore()
  }

  render () {
    const { props } = this

    return (
      <ImperativeDrawer {...props} ref='imperativeDrawer'>
        {props.children}
      </ImperativeDrawer>
    )
  }

  _subscribeToStore () {
    const { store } = this.context
    const { imperativeDrawer } = this.refs

    this._unsubscribeToStore = store.subscribe(() => {
      let { router: { drawer = {} } = {} } = store.getState()

      if (drawer.isOpen) {
        imperativeDrawer.openDrawer()
      } else {
        imperativeDrawer.closeDrawer()
      }
    })
  }

  _unsubscribeToStore () {
    // Noop here because it's overridden later in _subscribeToStore
  }
}
