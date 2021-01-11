import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Marque from '../component/marque'
import View from '../component/view'
import Home from '../component/home'



const screen = {

    Home :{
        screen: Home
    },
    ViewVideo :{
        screen : View

    }


}

const stack = createStackNavigator(screen)


export default createAppContainer(stack)