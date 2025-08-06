import { BorderStyles } from "@/shared/components/sheets/Sheets";
import { useTasksServices } from "@/shared/services/tasks/tasksServices";
import React, { useRef } from "react";
import { useColorScheme, View } from "react-native";
import ActionSheet, {
    ActionSheetRef,
    SheetProps,
} from "react-native-actions-sheet";
import { createTaskSchemaDefaultValues } from "../../util/CreateTaskSchema";
import TaskLayout from "../TaskLayout/TaskLayout";

const CreateTask = (props: SheetProps<"create-task-sheet">) => {
  const actionRef = useRef<ActionSheetRef>(null);
  const colorScheme = useColorScheme();
  const { createTask } = useTasksServices({})

  const handleSubmit = async (values: {
    title: string;
    description: string;
  }) => {
    createTask.mutateAsync({ body: values })
      .then(() => {
        actionRef.current?.hide();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      }
    );
  };

  return (
    <View>
      <ActionSheet
        ref={actionRef}
        containerStyle={{
          ...BorderStyles.borders,
          backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
        }}
      >
        <TaskLayout
          initialValues={createTaskSchemaDefaultValues}
          onSubmit={handleSubmit}
          actionRef={actionRef}
        />
      </ActionSheet>
    </View>
  );
};

export default CreateTask;
