import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInputProps,
} from 'react-native';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { TextInput } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';

interface IProps extends TextInputProps {
  name: string;
  label: string;
  theme: Theme;
}

const { width } = Dimensions.get('window');

const TextInputField: FC<IProps> = ({ name, label, theme }) => {
  return (
    <View style={styles.fieldContainer}>
      <Field name={name}>
        {({ form, field }: FieldProps) => {
          const { setFieldValue, setFieldTouched } = form;
          const { value } = field;
          return (
            <TextInput
              mode="flat"
              label={label}
              theme={theme}
              value={value}
              autoCapitalize="none"
              onChangeText={(val) => setFieldValue(name, val)}
              onBlur={() => setFieldTouched(name, true)}
            />
          );
        }}
      </Field>
      <Text style={styles.error}>
        <ErrorMessage name={name} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    height: 80,
    marginVertical: 5,
    width: width - 40,
  },
  error: {
    color: 'red',
    marginTop: 1,
  },
});

export default TextInputField;
