import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Places from '../screens/Places';
import PlaceDetail from '../screens/PlaceDetail';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import PlaceForm from '../screens/PlaceForm';
import Header from './Header';

export type PlaceStackParamList = {
  places: undefined;
  placeDetail: {
    id: number;
    title: string;
    description: string | null | undefined;
    imageUrl: string | null | undefined;
    user?: {
      username: string;
      email: string;
    };
  };
  placeForm: {
    id?: number;
    title: string;
    description: string | null | undefined;
    imageUrl: string | null | undefined;
  };
};

export type ProfileStackParamList = {
  profile: undefined;
  authLoading: undefined;
  login: undefined;
  placeDetail: {
    title: string;
    description: string | null | undefined;
    imageUrl: string | null | undefined;
    user?: {
      username: string;
      email: string;
    };
  };
};

const PlaceStack = createStackNavigator<PlaceStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

export interface IPlaceStackNavigation
  extends StackNavigationProp<PlaceStackParamList> {}

export interface IProfileStackNavigation
  extends StackNavigationProp<ProfileStackParamList> {}

export const PlaceStackNav = () => {
  return (
    <PlaceStack.Navigator
      initialRouteName="places"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <PlaceStack.Screen name="places" component={Places} />
      <PlaceStack.Screen name="placeDetail" component={PlaceDetail} />
      <PlaceStack.Screen name="placeForm" component={PlaceForm} />
    </PlaceStack.Navigator>
  );
};

export const ProfileStackNav = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="authLoading"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <ProfileStack.Screen name="authLoading" component={AuthLoading} />
      <ProfileStack.Screen name="login" component={Login} />
      <ProfileStack.Screen name="profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

export type TabParamList = {
  placeStack: undefined;
  profileStack: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const MainTabNavigator = () => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const navigation = useNavigation<IPlaceStackNavigation>();
  return (
    <>
      <Tab.Navigator initialRouteName="placeStack">
        <Tab.Screen
          name="placeStack"
          component={PlaceStackNav}
          options={{ tabBarIcon: 'home-account', tabBarLabel: 'Places List' }}
        />
        <Tab.Screen
          name="profileStack"
          component={ProfileStackNav}
          options={{ tabBarIcon: 'information', tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon="feather"
          onPress={() =>
            navigation.navigate('placeForm', {
              title: '',
              description: '',
              imageUrl: '',
            })
          }
          style={{
            backgroundColor: theme.colors.background,
            position: 'absolute',
            bottom: 100,
            right: 16,
          }}
        />
      </Portal>
    </>
  );
};
