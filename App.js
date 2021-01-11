import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Pressable, processColor, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ViewVideo from './component/view'
import Marque from './component/marque'
import Home from './component/home'
// import { HeaderStyleInterpolators } from 'react-navigation-stack';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { color } from 'react-native-reanimated';


import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

function  App() {
  const Tab = createBottomTabNavigator();


  return (
    <View style={styles.container}>
      <NavigationContainer >
        <StatusBar hidden={true} />
        <Tab.Navigator

          tabBarOptions={{
            
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#8EC4F9',
            labelStyle: {
              fontSize: 20,
              marginBottom: 1.5,
              textAlign: 'center',
              fontWeight: 'bold',

            },
            tabStyle: {
              // height: 48,
              padding: 10,
              borderRadius: 20,
            },
            iconStyle: {
              marginBottom: 5
            },
            

          }} >
          <Tab.Screen name="Lucas" component={Marque}/>
          <Tab.Screen name="Armani" component={ViewVideo} />
        </Tab.Navigator>

      </NavigationContainer>


    </View>
  );
}
export default withAuthenticator(App, { includeGreetings: true })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EC4F9',
    // alignItems: 'center',
    justifyContent: 'center',
  },

});
// screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' }}


 //  tabBarOptions={

        //   activeBackgroundColor = '#8BC540',
        //   inactiveBackgroundColor = '#349746',
        //   activeTintColor = '#F5F4F4', // tab text color
        //   inactiveTintColor = '#F5F4F4',
          // labelStyle = {
          //   marginTop: 5,
          //   marginBottom: 4,
          // }

        // }
        //  screenOptions={{ headerStyle: { backgroundColor="papayawhip" } }}