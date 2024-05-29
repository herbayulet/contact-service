import { Stack, Slot } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Halaman Utama",
          headerStyle: {
            backgroundColor: "red",
          },
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="main"
        options={{
          headerTitle: "Halaman Main",
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
