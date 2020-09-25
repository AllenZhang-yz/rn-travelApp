import React, { FC } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCurrentUserQuery } from '../generated/graphql';
import { CardView } from '../components';
import { IProfileStackNavigation } from '../navigation/MainTabNavigator';

const Profile: FC = ({}) => {
  const navigation = useNavigation<IProfileStackNavigation>();
  const { data, loading } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
  }
  return (
    <View>
      <Card>
        <Card.Title
          title={(data?.currentUser && data.currentUser.username) || ''}
          subtitle={(data?.currentUser && data.currentUser.email) || ''}
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
      </Card>
      <FlatList
        data={
          data?.currentUser && data.currentUser.places
            ? data.currentUser.places
            : []
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardView
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            onPress={() =>
              navigation.navigate('placeDetail', {
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                user: data?.currentUser,
              })
            }
          />
        )}
        style={{ marginBottom: 80 }}
      />
    </View>
  );
};

export default Profile;
