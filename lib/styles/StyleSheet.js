import { StyleSheet as RNStyleSheet } from 'react-native'

export const StyleSheet = {
  create (sheet) {
    for (let styleName of Object.keys(sheet)) {
      let properties = sheet[styleName]
      for (let propertyName of Object.keys(properties)) {
        let property = properties[propertyName]
        if (property && typeof property.hslString === 'function') {
          properties[propertyName] = property.hslString()
        }
      }
    }

    return RNStyleSheet.create(sheet)
  }
}
