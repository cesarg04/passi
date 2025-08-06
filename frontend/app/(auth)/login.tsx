import {
  signInFormDefaultValues,
  signInFormSchema,
  SignInFormType,
} from "@/public/modules/signIn/util/signInSchema";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import FormControl from "@/shared/components/form/FormControl/FormControl";
import FormError from "@/shared/components/form/FormError/FormError";
import FormLabel from "@/shared/components/form/FormLabel/FormLabel";
import TextField from "@/shared/components/form/FormTextField/FormTextField";
import KeyboardAvoidingContainer from "@/shared/components/KeyboardAvoingContainer/KeybboardAvoingContainer";
import { useAuthServices } from "@/shared/services/auth/authServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const LoginScreen = () => {

  const router = useRouter();
  const { loginMutation } = useAuthServices()
  const formConfig = useForm({
    defaultValues: signInFormDefaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (data: SignInFormType) => {
    try {
      await loginMutation.mutateAsync({body: data})
      router.replace('/home')
    } catch (error: any) {
    }
  };

  return (
    <FormProvider {...formConfig}>
      <KeyboardAvoidingContainer>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Iniciar sesion</Text>
          </View>

          <FormControl name="email">
            <FormLabel>Correo</FormLabel>
            <TextField />
            <FormError />
          </FormControl>

          <FormControl name="password">
            <FormLabel>Contraseña</FormLabel>
            <TextField secureTextEntry />
            <FormError />
          </FormControl>

          <PrimaryButton
            textColor="white"
            buttonColor="secondary"
            onPress={formConfig.handleSubmit(onSubmit)}
            disabled={formConfig.formState.isSubmitting}
          >
            Inicar sesion
          </PrimaryButton>
          <View style={{ marginTop: 20 }}>
            <Button onPress={() => router.replace('/register')}>
              Registrarse
            </Button>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </FormProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
