import Box from "@/shared/components/box/Box";
import ChangeThemeButton from "@/shared/components/buttons/LogoutButton";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import TaskItem from "@/shared/components/taskItem/TaskItem";
import { useTaskSocket } from "@/shared/hooks/useTaskSocket";
import { useTasksServices } from "@/shared/services/tasks/tasksServices";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Text } from "react-native-paper";

const Home = () => {
    useTaskSocket()
  const { getTasks } = useTasksServices({});
  const colorScheme = useColorScheme();
  const { data, isLoading, refetch } = getTasks;

  const onAddTask = () => {
    SheetManager.show("create-task-sheet").then(() => {
    });
  };

  // Estilos dinámicos según theme
  const dynamicStyles = StyleSheet.create({
    mainContent: {
      borderTopEndRadius: 50,
      borderTopStartRadius: 50,
      backgroundColor: colorScheme === "light" ? "white" : "black",
      flex: 1,
      marginTop: -50,
      paddingHorizontal: 30,
      paddingTop: 40,
      gap: 20,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <ChangeThemeButton/>
        <Text style={styles.title}>Lista de tareas</Text>
      </View>
      <View style={dynamicStyles.mainContent}>
        <PrimaryButton onPress={onAddTask}>Agregar tarea</PrimaryButton>

        <Box>
          <FlatList
            style={{ minHeight: 400 }}
            data={data?.data}
            renderItem={({ item }) => <TaskItem item={item} />}
            keyExtractor={({ id }) => id.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#5B53CE",
    minHeight: 250,
    paddingHorizontal: -50,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default Home;
