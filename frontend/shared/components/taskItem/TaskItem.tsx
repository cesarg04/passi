import EditIcon from "@/assets/icons/edit.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import { formatCustomDate } from "@/shared/helpers/formatDate";
import { useCustomTheme } from "@/shared/hooks/useTheme";
import { IGetTasksResponse } from "@/shared/services/tasks/responses/getTaskResponse";
import { useTasksServices } from "@/shared/services/tasks/tasksServices";
import React, { useState } from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { Checkbox, Text } from "react-native-paper";
import Popover from "react-native-popover-view";

interface ITaskItemProps {
  item: IGetTasksResponse;
}

const TaskItem = (props: ITaskItemProps) => {
  const [isVisible, setisVisible] = useState(false);
  const theme = useCustomTheme();
  const colorScheme = useColorScheme();
  const { deleteTask, updateTask } = useTasksServices({});

  const onSelectTask = () => {
    console.log("Task selected:", props.item.title);
  };

  const onShowPopover = () => {
    setisVisible(true);
  };

  const popoverItems = [
    {
      label: "Completar tarea",
      onPress: (event: GestureResponderEvent) => {
        setisVisible(false);
        event.stopPropagation();
        setTimeout(() => {
          updateTask.mutateAsync({
            id: props.item.id,
            body: {
              title: props.item.title,
              description: props.item.description,
              completed: true,
            },
          });
        }, 1000);
      },
      disabled: props.item.completed,
      icon: (
        <EditIcon
          width={35}
          height={35}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      ),
    },
    {
      label: "Eliminar tarea",
      onPress: (event: GestureResponderEvent) => {
        setisVisible(false);
        event.stopPropagation();
        setTimeout(() => {
          deleteTask.mutateAsync(props.item.id.toString());
        }, 1000);
      },
      disabled: false,
      icon: (
        <TrashIcon
          width={35}
          height={35}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      ),
    },
  ];

  return (
    <Popover
      isVisible={isVisible}
      onRequestClose={() => setisVisible(false)}
      from={
        <TouchableOpacity
          onPress={onSelectTask}
          style={{ flex: 1 }}
          onLongPress={onShowPopover}
        >
          <View style={styles.container}>
            <Checkbox
              color="blue"
              uncheckedColor={""}
              status={props.item.completed ? "checked" : "unchecked"}
            />
            <Text style={[styles.text, { color: theme.colors.text }]}>
              {props.item.title}
            </Text>
            <Text style={[styles.dateText]}>
              {formatCustomDate(props.item.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
      }
    >
      <View
        style={{
          ...popoverStyles.container,
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        {popoverItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={item.onPress}
            disabled={item.disabled}
          >
            <View style={popoverStyles.item}>
              {item.icon}
              <Text style={popoverStyles.itemText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Popover>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  text: {
    fontSize: 15,
    color: "#333",
  },
  checkbox: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

const popoverStyles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    padding: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    width: 200,
    display: "flex",
  },
});
