import { connect } from 'react-redux'
import { Accordian as AccordianComponent } from '../components/Accordian'

const connector = connect(mapState, mapDispatch)
export const Accordian = connector(AccordianComponent)

function mapState ({ router }, { pages = [] }) {
  pages = pages.map(page => router.getPage(page))

  return {
    previews: pages.map(page => page.renderPreview.bind(page)),
    titles: pages.map(page => page.title)
  }
}

function mapDispatch (dispatch) {
  return {}
}
