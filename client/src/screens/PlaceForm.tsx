import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  PlaceStackParamList,
  IPlaceStackNavigation,
} from '../navigation/MainTabNavigator';
import {
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
} from '../generated/graphql';
import TextInputField from '../components/TextInputField';

const PlaceForm = () => {
  const theme = useTheme();
  const navigation = useNavigation<IPlaceStackNavigation>();
  const route = useRoute<RouteProp<PlaceStackParamList, 'placeForm'>>();
  //createPlace
  const [
    createPlaceMutation,
    { loading: createLoading },
  ] = useCreatePlaceMutation({
    onCompleted: async () => {
      navigation.goBack();
    },
  });
  //updatePlace
  const [
    updatePlaceMutation,
    { loading: updateLoading },
  ] = useUpdatePlaceMutation({
    onCompleted: async ({ updatePlace }) => {
      navigation.navigate('placeDetail', {
        id: parseInt(updatePlace.id),
        title: updatePlace.title,
        description: updatePlace.description,
        imageUrl: updatePlace.imageUrl,
        user: updatePlace.user,
      });
    },
  });
  //deletePlace
  const [
    deletePlaceMutation,
    { loading: deleteLoading },
  ] = useDeletePlaceMutation({
    onCompleted: async () => {
      navigation.navigate('places');
    },
  });

  if (createLoading || updateLoading || deleteLoading) {
    return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
  }
  const { id, title, imageUrl, description } = route.params;
  const initialValues = {
    title: title || '',
    description: description || '',
    imageUrl: imageUrl || '',
  };

  const validationSchema = yup.object({
    title: yup.string().trim().required('*Required'),
    description: yup.string().trim(),
    imageUrl: yup.string().trim(),
  });

  const submitData = async (values: typeof initialValues) => {
    id
      ? updatePlaceMutation({ variables: { place: { id, ...values } } })
      : createPlaceMutation({ variables: { place: { ...values } } });
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
        onSubmit={submitData}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => {
          return (
            <View>
              <View>
                <TextInputField name="title" label="Title" theme={theme} />
                <TextInputField
                  name="description"
                  label="Description"
                  theme={theme}
                />
                <TextInputField
                  name="imageUrl"
                  label="ImageUrl"
                  theme={theme}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  labelStyle={{ color: theme.colors.text }}
                  style={{
                    backgroundColor: theme.colors.accent,
                    marginTop: 20,
                  }}
                  onPress={handleSubmit}
                >
                  Save Place
                </Button>
                <Button
                  labelStyle={{ color: theme.colors.text }}
                  disabled={id === undefined}
                  style={{
                    backgroundColor: theme.colors.accent,
                    marginTop: 20,
                  }}
                  onPress={() =>
                    deletePlaceMutation({ variables: { id: id as number } })
                  }
                >
                  Delete Place
                </Button>
              </View>
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

export default PlaceForm;
