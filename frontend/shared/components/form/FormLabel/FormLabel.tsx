import { useCustomTheme } from '@/shared/hooks/useTheme';
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
  const theme = useCustomTheme()

  return (
    <Text
      style={{
        color: !!error
          ? theme.colors.error
          : props.color
            ? props.color
            : theme.colors.text,
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
