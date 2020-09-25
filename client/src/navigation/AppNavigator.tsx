import React, { FC } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import DrawerContent from './DrawerContent';
import { MainTabNavigator } from './MainTabNavigator';

const Drawer = createDrawerNavigator();

interface IAppNavigator {
  toggleTheme: () => void;
}

const AppNavigator: FC<IAppNavigator> = ({ toggleTheme, ...props }) => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContent {...props} toggleTheme={toggleTheme} />
        )}
      >
        <Drawer.Screen name="Home" component={MainTabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
