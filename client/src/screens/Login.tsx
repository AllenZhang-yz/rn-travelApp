import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRegisterMutation, useLoginMutation } from '../generated/graphql';
import { Button, useTheme } from 'react-native-paper';
import { IProfileStackNavigation } from '../navigation/MainTabNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInputField from '../components/TextInputField';

const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation<IProfileStackNavigation>();
  const [login, setLogin] = useState(false);
  //Sign Up
  const [signUpMutation, { data }] = useRegisterMutation({
    onCompleted: async ({ register }) => {
      const { token } = register;
      if (token) {
        try {
          await AsyncStorage.setItem('token', token);
          navigation.replace('profile');
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  });
  console.log('data:', data);

  const [signInMutation] = useLoginMutation({
    onCompleted: async ({ login }) => {
      const { token } = login;
      if (token) {
        try {
          await AsyncStorage.setItem('token', token);
          navigation.replace('profile');
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: login
      ? yup.string().trim().length(0)
      : yup.string().trim().required('*Required!'),
    email: login
      ? yup.string().required('*Required')
      : yup.string().email('*Invalid email format').required('*Required'),
    password: yup
      .string()
      .min(5, '*No less than 5 characters')
      .max(20, '*No more than 20 characters')
      .required('*Required'),
  });

  const submitData = async (values: typeof initialValues) => {
    const { username, email, password } = values;
    if (login) {
      const isEmail = email.includes('@');
      isEmail
        ? await signInMutation({ variables: { input: { email, password } } })
        : signInMutation({
            variables: { input: { username: email, password } },
          });
    } else {
      await signUpMutation({
        variables: { input: { username, email, password } },
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitData}
      >
        {({ handleSubmit }) => {
          return (
            <View>
              <View>
                {login ? null : (
                  <TextInputField
                    name="username"
                    label="Username"
                    theme={theme}
                  />
                )}
                <TextInputField
                  name="email"
                  label={login ? 'Username Or Email' : 'Email'}
                  theme={theme}
                />
                <TextInputField
                  name="password"
                  label="Password"
                  theme={theme}
                  secureTextEntry
                />
              </View>
              <Button
                labelStyle={{ color: theme.colors.text }}
                style={{ backgroundColor: theme.colors.accent, marginTop: 20 }}
                onPress={handleSubmit}
              >
                {login ? 'Login' : 'Sign Up'}
              </Button>
              <Button
                style={{ marginTop: 20 }}
                icon="information"
                onPress={() => setLogin(!login)}
              >
                {login ? 'Need an account? Sign Up' : 'Have an account? Login'}
              </Button>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default Login;
