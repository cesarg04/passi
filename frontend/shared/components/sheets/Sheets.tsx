import CreateTask from "@/private/tasks/components/CreateTask/CreateTask";
import { StyleSheet } from 'react-native';
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

// registerSheet('edit-income-sheet', UpdateIncomeSheet);
registerSheet('create-task-sheet', CreateTask);
// registerSheet('detail-income-sheet', DetailIncome);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'create-task-sheet': SheetDefinition<{}>;
    // 'detail-income-sheet': SheetDefinition<{
    //   payload: {
    //     id: string;
    //   };
    // }>;
    // 'edit-income-sheet': SheetDefinition<{
    //   payload: {
    //     id: string;
    //   };
    // }>;
  }
}

export { };

export const BorderStyles = StyleSheet.create({
  borders: {
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
  },
});
