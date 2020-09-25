import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { IProfileStackNavigation } from '../navigation/MainTabNavigator';

const AuthLoading = () => {
  const navigation = useNavigation<IProfileStackNavigation>();
  const bootStrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    navigation.replace(userToken ? 'profile' : 'login');
  };

  useEffect(() => {
    bootStrapAsync();
  });

  return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
};

export default AuthLoading;
