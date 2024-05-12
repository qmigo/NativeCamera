import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const CameraButton = ({ title, onPress, icon, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialCommunityIcons
        name={icon}
        size={28}
        color={color ? color : "#f1f1f1"}
      />
      {/* <Text style={styles.text}>{title}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
    color: "#f1f1f1",
  },
});
export default CameraButton;
