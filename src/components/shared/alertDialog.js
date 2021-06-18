import React from "react";
import { Alert } from "react-native";

export const AlertDialog = (action, callback) =>
  Alert.alert(
    "",
    action,
    [
      { text: "Yes", onPress: () => callback(), style: "destructive" },
      { text: "No", onPress: () => {} },
    ],
    { cancelable: true },
  );
