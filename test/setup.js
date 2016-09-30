import chai from 'chai'
import sinonChai from 'sinon-chai'

// This fixes a random issue in the 'react-native-drawer-layout' module. I think
// it's technically not legal to assign to a module import but it works for now.
import * as react from 'react-native'
react.Platform = {}

chai.use(sinonChai)
