import XIcon from "@/assets/icons/circle-x.svg";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import FormControl from "@/shared/components/form/FormControl/FormControl";
import FormError from "@/shared/components/form/FormError/FormError";
import FormLabel from "@/shared/components/form/FormLabel/FormLabel";
import TextField from "@/shared/components/form/FormTextField/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { IconButton, Text } from "react-native-paper";
import {
    createTaskSchema,
    TCreateTaskSchema,
} from "../../util/CreateTaskSchema";

interface ITaskLayoutProps {
  initialValues: TCreateTaskSchema;
  onSubmit: (values: TCreateTaskSchema) => Promise<void> | void;
  onClose?: () => void;
  actionRef:  React.RefObject<ActionSheetRef | null>;
}

const TaskLayout = (props: ITaskLayoutProps) => {
  const formConfig = useForm<TCreateTaskSchema>({
    defaultValues: props.initialValues,
    resolver: yupResolver(createTaskSchema),
    mode: "onTouched",
  });

  const colorScheme = useColorScheme();

  const handleSubmit = async (values: TCreateTaskSchema) => {
    formConfig.reset();
    await props.onSubmit(values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Tarea</Text>
        <IconButton
          icon={() => (
            <XIcon
              width={30}
              height={30}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          )}
          onPress={() => props?.actionRef?.current?.hide()}
        />
      </View>
      <View style={styles.containerForm}>
        <FormProvider {...formConfig}>
          <FormControl name="title">
            <FormLabel>Título</FormLabel>
            <TextField />
            <FormError />
          </FormControl>

          <FormControl name="description">
            <FormLabel>Descripción</FormLabel>
            <TextField multiline />
            <FormError />
          </FormControl>

          <PrimaryButton
            textColor="white"
            buttonColor="secondary"
            onPress={formConfig.handleSubmit(handleSubmit)}
          >
            Crear Tarea
          </PrimaryButton>
        </FormProvider>
      </View>
      {/* Add buttons or other components as needed */}
    </View>
  );
};

export default TaskLayout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    // color: theme.colors.text,
  },
  containerForm: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
  },
});
