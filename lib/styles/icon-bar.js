import { Platform } from 'react-native'
import { StyleSheet } from './StyleSheet'

export const styles = StyleSheet.create({
  iconBar: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  icon: {
    margin: Platform.OS === 'ios' ? 2 : 8
  }
})
