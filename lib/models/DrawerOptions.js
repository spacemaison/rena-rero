import ImperativeDrawer from 'react-native-drawer-layout'

const DRAWER_LOCK_MODES = [
  'unlocked',
  'locked-closed',
  'locked-open'
]

const noop = () => {}

export const positions = ImperativeDrawer.positions

export class DrawerOptions {
  constructor ({
    backgroundColor = 'rgba(255, 255, 255, 1)',
    keyboardDismissMode = 'none',
    lockMode = 'unlocked',
    onOpen = noop,
    onClose = noop,
    onSlide = noop,
    onStateChanged = noop,
    position = ImperativeDrawer.positions.left,
    renderContent,
    width = 300 } = {}) {

    if (typeof renderContent !== 'function') {
      throw new TypeError(
          'Expected DrawerOption "render" function to be included')
    }

    if (!DRAWER_LOCK_MODES.some(mode => mode === lockMode)) {
      throw new TypeError(
          `Invalid DrawerOption "lock mode": ${lockMode}. Expected one of ` +
          DRAWER_LOCK_MODES.join(', '))
    }

    if (ImperativeDrawer.positions.left !== position &&
        ImperativeDrawer.positions.right !== position) {
      throw new TypeError(
          `Invalid DrawerOption "position": ${position}. Expected one of ` +
          DRAWER_POSITIONS.join(', '))
    }

    Object.assign(this, {
      drawerBackgroundColor: backgroundColor,
      drawerLockMode: lockMode,
      drawerPosition: position,
      drawerWidth: width,
      keyboardDismissMode,
      lockMode,
      onDrawerOpen: onOpen,
      onDrawerClose: onClose,
      onDrawerSlide: onSlide,
      onDrawerStateChanged: onStateChanged,
      renderNavigationView: renderContent
    })
  }
}
