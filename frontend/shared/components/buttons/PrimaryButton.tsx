import { useCustomTheme } from '@/shared/hooks/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as ButtonPaper, ButtonProps } from 'react-native-paper';

interface IButtonProps extends ButtonProps {}

const PrimaryButton = (props: IButtonProps) => {
  const theme = useCustomTheme();
  const styles = createStyles(theme);
  const config: IButtonProps = {
    ...props,
    mode: 'contained',
    style: styles.button,
    labelStyle: {
      fontWeight: '600',
      fontSize: 22,
      alignItems: 'center',
    },
    contentStyle: {
      height: '100%',
    },
    textColor: props.textColor ?? 'white',
  };

  return <ButtonPaper {...config} />;
};

export default PrimaryButton;
const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      height: 70,
      fontSize: 10,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 0,
    },
});
