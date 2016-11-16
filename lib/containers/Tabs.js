import { connect } from 'react-redux'
import { Tabs as TabsComponent } from '../components/Tabs'
import { Route } from '../models/Route'

const connector = connect(mapState, mapDispatch)
export const Tabs = connector(TabsComponent)

function mapState ({ router }, { tabs = [] }) {
  let CurrentPage = router.getCurrentPage()
  let route = router.getCurrentRoute()

  let proto = Object.getPrototypeOf(CurrentPage.prototype)
  if (proto.constructor === Tabs) {
    route = new Route({ key: tabs[0] })
    CurrentPage = router.getPage(route)
  }

  return {
    CurrentPage,
    tabs,
    url: route.url,
    pass: route.pass
  }
}

function mapDispatch (dispatch) {
  return {}
}
