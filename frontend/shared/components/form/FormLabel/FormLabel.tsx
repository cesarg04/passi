import theme from '@/shared/theme/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormControlContext } from '../FormControl/FormControl';


interface IFormLabelProps {
  children: React.ReactNode;
  color?: string;
}

const FormLabel = (props: IFormLabelProps) => {
  const {
    fieldState: { error },
  } = useFormControlContext();
  return (
    <Text
      style={{
        color: !!error
          ? theme.colors.error
          : props.color
            ? props.color
            : theme.colors.primary,
        ...styles.text,
      }}
    >
      {props.children}
    </Text>
  );
};

export default FormLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
