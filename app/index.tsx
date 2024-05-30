import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Page from "./main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "components/ToastInfo";

const HomePage = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <Page />
          <Toast config={toastConfig} />
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
