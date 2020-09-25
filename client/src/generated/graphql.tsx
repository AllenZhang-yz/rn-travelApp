import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  place?: Maybe<Place>;
  places: Array<Place>;
  currentUser: User_2;
};


export type QueryPlaceArgs = {
  id: Scalars['Int'];
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  title: Scalars['String'];
  /** The place description */
  description?: Maybe<Scalars['String']>;
  /** The place image URL */
  imageUrl?: Maybe<Scalars['String']>;
  user: User_2;
  creationDate: Scalars['String'];
};

export type User_2 = {
  __typename?: 'User_2';
  id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  places: Array<Place>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlace: Place;
  updatePlace: Place;
  deletePlace: Scalars['ID'];
  register: UserResponse;
  login: UserResponse;
};


export type MutationCreatePlaceArgs = {
  place: PlaceInput;
};


export type MutationUpdatePlaceArgs = {
  place: PlaceInput;
};


export type MutationDeletePlaceArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  input: AuthRegisterInput;
};


export type MutationLoginArgs = {
  input: AuthLoginInput;
};

export type PlaceInput = {
  id?: Maybe<Scalars['Float']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User_2>;
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AuthRegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AuthLoginInput = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newPlaceAdded: Place;
};

export type LoginMutationVariables = Exact<{
  input: AuthLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User_2' }
      & Pick<User_2, 'id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: AuthRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User_2' }
      & Pick<User_2, 'id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreatePlaceMutationVariables = Exact<{
  place: PlaceInput;
}>;


export type CreatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { createPlace: (
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'title' | 'description' | 'imageUrl' | 'creationDate'>
  ) }
);

export type DeletePlaceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePlaceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePlace'>
);

export type UpdatePlaceMutationVariables = Exact<{
  place: PlaceInput;
}>;


export type UpdatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { updatePlace: (
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'title' | 'description' | 'imageUrl' | 'creationDate'>
    & { user: (
      { __typename?: 'User_2' }
      & Pick<User_2, 'id' | 'username' | 'email'>
    ) }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User_2' }
    & Pick<User_2, 'id' | 'username' | 'email'>
    & { places: Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'title' | 'description' | 'imageUrl'>
    )> }
  ) }
);

export type GetPlaceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPlaceQuery = (
  { __typename?: 'Query' }
  & { place?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'title' | 'description' | 'imageUrl'>
  )> }
);

export type GetPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesQuery = (
  { __typename?: 'Query' }
  & { places: Array<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'title' | 'description' | 'imageUrl' | 'creationDate'>
    & { user: (
      { __typename?: 'User_2' }
      & Pick<User_2, 'id' | 'username' | 'email'>
    ) }
  )> }
);

export type NewPlaceAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewPlaceAddedSubscription = (
  { __typename?: 'Subscription' }
  & { newPlaceAdded: (
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'title' | 'description' | 'imageUrl' | 'creationDate'>
    & { user: (
      { __typename?: 'User_2' }
      & Pick<User_2, 'id' | 'username' | 'email'>
    ) }
  ) }
);


export const LoginDocument = gql`
    mutation Login($input: AuthLoginInput!) {
  login(input: $input) {
    user {
      id
      username
      email
    }
    token
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: AuthRegisterInput!) {
  register(input: $input) {
    user {
      id
      username
      email
    }
    token
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreatePlaceDocument = gql`
    mutation CreatePlace($place: PlaceInput!) {
  createPlace(place: $place) {
    id
    title
    description
    imageUrl
    creationDate
  }
}
    `;
export type CreatePlaceMutationFn = Apollo.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      place: // value for 'place'
 *   },
 * });
 */
export function useCreatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
        return Apollo.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, baseOptions);
      }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = Apollo.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = Apollo.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const DeletePlaceDocument = gql`
    mutation DeletePlace($id: Int!) {
  deletePlace(id: $id)
}
    `;
export type DeletePlaceMutationFn = Apollo.MutationFunction<DeletePlaceMutation, DeletePlaceMutationVariables>;

/**
 * __useDeletePlaceMutation__
 *
 * To run a mutation, you first call `useDeletePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlaceMutation, { data, loading, error }] = useDeletePlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlaceMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlaceMutation, DeletePlaceMutationVariables>) {
        return Apollo.useMutation<DeletePlaceMutation, DeletePlaceMutationVariables>(DeletePlaceDocument, baseOptions);
      }
export type DeletePlaceMutationHookResult = ReturnType<typeof useDeletePlaceMutation>;
export type DeletePlaceMutationResult = Apollo.MutationResult<DeletePlaceMutation>;
export type DeletePlaceMutationOptions = Apollo.BaseMutationOptions<DeletePlaceMutation, DeletePlaceMutationVariables>;
export const UpdatePlaceDocument = gql`
    mutation UpdatePlace($place: PlaceInput!) {
  updatePlace(place: $place) {
    id
    title
    description
    imageUrl
    creationDate
    user {
      id
      username
      email
    }
  }
}
    `;
export type UpdatePlaceMutationFn = Apollo.MutationFunction<UpdatePlaceMutation, UpdatePlaceMutationVariables>;

/**
 * __useUpdatePlaceMutation__
 *
 * To run a mutation, you first call `useUpdatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaceMutation, { data, loading, error }] = useUpdatePlaceMutation({
 *   variables: {
 *      place: // value for 'place'
 *   },
 * });
 */
export function useUpdatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>) {
        return Apollo.useMutation<UpdatePlaceMutation, UpdatePlaceMutationVariables>(UpdatePlaceDocument, baseOptions);
      }
export type UpdatePlaceMutationHookResult = ReturnType<typeof useUpdatePlaceMutation>;
export type UpdatePlaceMutationResult = Apollo.MutationResult<UpdatePlaceMutation>;
export type UpdatePlaceMutationOptions = Apollo.BaseMutationOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    username
    email
    places {
      id
      title
      description
      imageUrl
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetPlaceDocument = gql`
    query GetPlace($id: Int!) {
  place(id: $id) {
    id
    title
    description
    imageUrl
  }
}
    `;

/**
 * __useGetPlaceQuery__
 *
 * To run a query within a React component, call `useGetPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaceQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaceQuery, GetPlaceQueryVariables>) {
        return Apollo.useQuery<GetPlaceQuery, GetPlaceQueryVariables>(GetPlaceDocument, baseOptions);
      }
export function useGetPlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaceQuery, GetPlaceQueryVariables>) {
          return Apollo.useLazyQuery<GetPlaceQuery, GetPlaceQueryVariables>(GetPlaceDocument, baseOptions);
        }
export type GetPlaceQueryHookResult = ReturnType<typeof useGetPlaceQuery>;
export type GetPlaceLazyQueryHookResult = ReturnType<typeof useGetPlaceLazyQuery>;
export type GetPlaceQueryResult = Apollo.QueryResult<GetPlaceQuery, GetPlaceQueryVariables>;
export const GetPlacesDocument = gql`
    query GetPlaces {
  places {
    id
    title
    description
    imageUrl
    creationDate
    user {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useGetPlacesQuery__
 *
 * To run a query within a React component, call `useGetPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
        return Apollo.useQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, baseOptions);
      }
export function useGetPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
          return Apollo.useLazyQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, baseOptions);
        }
export type GetPlacesQueryHookResult = ReturnType<typeof useGetPlacesQuery>;
export type GetPlacesLazyQueryHookResult = ReturnType<typeof useGetPlacesLazyQuery>;
export type GetPlacesQueryResult = Apollo.QueryResult<GetPlacesQuery, GetPlacesQueryVariables>;
export const NewPlaceAddedDocument = gql`
    subscription NewPlaceAdded {
  newPlaceAdded {
    id
    title
    description
    imageUrl
    creationDate
    user {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useNewPlaceAddedSubscription__
 *
 * To run a query within a React component, call `useNewPlaceAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewPlaceAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewPlaceAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewPlaceAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewPlaceAddedSubscription, NewPlaceAddedSubscriptionVariables>) {
        return Apollo.useSubscription<NewPlaceAddedSubscription, NewPlaceAddedSubscriptionVariables>(NewPlaceAddedDocument, baseOptions);
      }
export type NewPlaceAddedSubscriptionHookResult = ReturnType<typeof useNewPlaceAddedSubscription>;
export type NewPlaceAddedSubscriptionResult = Apollo.SubscriptionResult<NewPlaceAddedSubscription>;