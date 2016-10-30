import { connect } from 'react-redux'
import { Router as RouterComponent } from '../components/Router'

const connector = connect(mapState, mapDispatch)
export const Router = connector(RouterComponent)

function mapState ({ router }) {
  return { routerState: router }
}

function mapDispatch (dispatch) {
  return {}
}
