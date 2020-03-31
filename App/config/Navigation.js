import * as React from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feed from '../screens/NewFeed';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function LogoTitle(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Polygon</Text>
    </View>
  );
}

const AppTabsScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen
      name="News"
      component={Feed}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      }}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const Tab = createBottomTabNavigator();
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => (
  <AppDrawer.Navigator initialRouteName="Tabs">
    <AppDrawer.Screen name="Tabs" component={AppTabsScreen} />
    <AppDrawer.Screen name="Settings" component={SettingsScreen} />
  </AppDrawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawerScreen />
    </NavigationContainer>
  );
}
