import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import CardView from '../components/CardView';
import {
  PlaceStackParamList,
  IPlaceStackNavigation,
} from '../navigation/MainTabNavigator';

const PlaceDetail: FC = ({}) => {
  const route = useRoute<RouteProp<PlaceStackParamList, 'placeDetail'>>();
  const navigation = useNavigation<IPlaceStackNavigation>();
  return (
    <SafeAreaView>
      <CardView {...route.params} />
      <Button
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('placeForm', { ...route.params })}
      >
        Edit Place
      </Button>
    </SafeAreaView>
  );
};

export default PlaceDetail;
