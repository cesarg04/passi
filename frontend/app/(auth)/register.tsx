import {
  registerFormDefaultValues,
  registerFormSchema,
  TRegisterFormType,
} from "@/public/modules/register/util/RegisterSchema";
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

const RegisterScreen = () => {
  const formConfig = useForm<TRegisterFormType>({
    defaultValues: registerFormDefaultValues,
    resolver: yupResolver(registerFormSchema),
  });

  const { registerMutation } = useAuthServices()

  const router = useRouter();

  const onSubmit = async (data: TRegisterFormType) => {
    try {
      await registerMutation.mutateAsync({ body: data });
      // Handle successful registration, e.g., navigate to login or home screen
      router.replace("/home");
    } catch (error) {
      console.error("Registration failed:", JSON.stringify(error));
      // Handle registration error, e.g., show an error message
    }
  };
  return (
    <FormProvider {...formConfig}>
      <KeyboardAvoidingContainer>
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Registrar</Text>
          </View>

          <FormControl name="name">
            <FormLabel>Nombre/s</FormLabel>
            <TextField />
            <FormError />
          </FormControl>

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
            Registrarse
          </PrimaryButton>
          <View style={{ marginTop: 20 }}>
            <Button onPress={() => router.replace("/login")}>
              Iniciar sesion
            </Button>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </FormProvider>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerTitle: {
    marginBottom: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
