import { connect } from 'react-redux'
import { ListView } from 'react-native'
import { Accordian as AccordianComponent } from '../components/Accordian'

const connector = connect(mapState, mapDispatch)
export const Accordian = connector(AccordianComponent)

const noop = () => {}

function mapState () {
  let dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  })

  return ({ router }, { pages = [], listViewProps = {} }) => {
    pages = pages
      .map(page => router.getPage(page))
      .reduce((blob, Page) => {
        const { title = '' } = Page

        if (!title) {
          throw new TypeError('Expected page title for Accordian section')
        }

        blob[title] = [ Page ]

        return blob
      }, Object.create(null))

    return {
      dataSource: dataSource.cloneWithRowsAndSections(pages),
      listViewProps
    }
  }
}

function mapDispatch (dispatch) {
  return {}
}
