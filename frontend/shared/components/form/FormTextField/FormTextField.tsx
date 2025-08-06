import React, { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  useColorScheme,
  ViewStyle
} from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

import { useCustomTheme } from '@/shared/hooks/useTheme';
import { useFormControlContext } from '../FormControl/FormControl';


interface ITextFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  otulineStyles?: StyleProp<ViewStyle>;
  type?: 'pass' | 'normal';
}

const TextField = (props: ITextFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useFormControlContext();
  const colorScheme = useColorScheme();
  const handleChange = (e: string | number) => {
    field.onChange(e);
  };
  const theme = useCustomTheme();
  const [isShowPass, setIsShowPass] = useState(true);

  const config: TextInputProps = {
    ...props,
    ...field,
    mode: props.mode ??'outlined',
    error: !!error?.message,
    onChangeText: handleChange,
    ref: field.ref,
    onBlur: field.onBlur,
    textColor: colorScheme === 'dark' ? 'white' : 'black',
    style: {
      backgroundColor: theme.colors.surface,
      height: 70,
      fontSize: 20,
      fontWeight: '700',
    },
    outlineStyle: {
      borderRadius: 20,
      borderColor: '#ccc',
      borderWidth: 3,
    },
    placeholderTextColor: '#ccc',
    right: props.right ? (
      props.right
    ) : props.type === 'pass' ? (
      <TextInput.Icon
        icon="eye"
        color={!!error ? theme.colors.error : '#ccc'}
        onPress={() => setIsShowPass(!isShowPass)}
      />
    ) : undefined,
    secureTextEntry: props.secureTextEntry
      ? props.secureTextEntry
      : props.type === 'pass'
        ? isShowPass
        : false,
  };

  return <TextInput {...config} />;
};

export default TextField;
