import React, { FC } from 'react';
import { Avatar, Card, Paragraph, Title } from 'react-native-paper';

interface IUser {
  username: string;
  email: string;
}

interface ICardView {
  title: string;
  description: string | null | undefined;
  imageUrl: string | null | undefined;
  onPress?: () => void;
  user?: IUser;
}

const CardView: FC<ICardView> = ({
  title,
  description,
  imageUrl,
  onPress,
  user,
}) => {
  return (
    <Card onPress={() => onPress && onPress()}>
      {!!user && (
        <Card.Title
          title={user.username}
          subtitle={user.email}
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: 'lightblue' }}
              color="#fff"
              size={42}
              icon="image"
            />
          )}
        />
      )}
      <Card.Cover source={{ uri: imageUrl || 'https://picsum.photos/700' }} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default CardView;
