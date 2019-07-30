import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddClientScreen from '../screens/AddClientScreen';
import AddCarScreen from '../screens/AddCarScreen';
import AddServiceScreen from '../screens/AddServiceScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AddServiceStack = createStackNavigator(
  {
    AddService: AddServiceScreen,
  },
  config,
);

AddServiceStack.navigationOptions = {
  tabBarLabel: 'Обслужване',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS == 'ios' ? 'ios-build' : 'md-build'} />
  )
};

const AddCarStack = createStackNavigator(
  {
    AddCar: AddCarScreen
  },
  config
);

AddCarStack.navigationOptions = {
  tabBarLabel: 'Кола',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS == 'ios' ? 'logo-model-s' : 'logo-model-s'} />
  ),
}

const AddClientStack = createStackNavigator(
  {
    AddClient: AddClientScreen,
  },
  config
);

AddClientStack.navigationOptions = {
  tabBarLabel: 'Клиент',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS == 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  AddServiceStack,
  AddCarStack,
  AddClientStack,
});

tabNavigator.path = '';

export default tabNavigator;
