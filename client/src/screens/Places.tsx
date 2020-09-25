import React, { FC, useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CardView } from '../components';
import { useGetPlacesQuery, NewPlaceAddedDocument } from '../generated/graphql';
import { IPlaceStackNavigation } from '../navigation/MainTabNavigator';

interface IPlacesProps {}

const Places: FC<IPlacesProps> = ({}) => {
  const { data, subscribeToMore } = useGetPlacesQuery();
  const navigation = useNavigation<IPlaceStackNavigation>();
  useEffect(() => {
    subscribeToMore({
      document: NewPlaceAddedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPlace = (subscriptionData.data as any).newPlaceAdded;
        return Object.assign({}, prev, {
          places: [newPlace, ...prev.places],
        });
      },
    });
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={data && data.places ? data.places : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardView
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            user={item.user}
            onPress={() =>
              navigation.navigate('placeDetail', {
                id: parseInt(item.id),
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                user: item.user,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Places;
