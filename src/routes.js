import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator({
    Main,
    User
  }, {
    //Coloca o estilo do titulo no centro
    headerLayoutPreset: 'center',
    //Todas as telas vão herdar essas options
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7159c1'
      },
      headerTintColor: '#fff',
    }
  })
);
export default Routes;
