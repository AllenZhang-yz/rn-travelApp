import React, { FC } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Scene } from '@react-navigation/stack/lib/typescript/src/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface IHeaderProps {
  scene: Scene<
    Readonly<{
      key: string;
      name: string;
      params?: object | undefined;
    }>
  >;
  previous:
    | Scene<
        Readonly<{
          key: string;
          name: string;
          params?: object | undefined;
        }>
      >
    | undefined;
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
}

const Header: FC<IHeaderProps> = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.primary } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.text}
        />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <MaterialCommunityIcons
            color={theme.colors.text}
            name="menu"
            size={30}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? (
            title
          ) : (
            <MaterialCommunityIcons name="home-outline" size={40} />
          )
        }
      />
      {title == 'Profile' && (
        <Appbar.Action
          icon="logout"
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
          }}
        />
      )}
    </Appbar.Header>
  );
};

export default Header;
