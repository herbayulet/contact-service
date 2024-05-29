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
      <Slot />
    </Stack>
  );
};

export default RootLayout;
