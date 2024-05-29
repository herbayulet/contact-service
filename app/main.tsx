import React, { useRef, useMemo, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BottomSheet from "@gorhom/bottom-sheet";
import { schema } from "./schema";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the schema using Zod

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const onSubmit = (data: any) => {
    console.log(data);
    // Process the form data here
  };

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.expand(); // Change 'present' to 'expand'
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Herbayu</Text>
        {/* <Button title="Open Form" onPress={handlePresentModalPress} /> */}
        {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Fullname"
              />
            )}
            name="fullname"
            defaultValue=""
          />
          {errors.fullname && (
            <Text style={styles.error}>{String(errors.fullname.message)}</Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                keyboardType="email-address"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text style={styles.error}>{String(errors.email.message)}</Text>
          )}

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </BottomSheet> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 16,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  contentContainer: {
    // paddingHorizontal: 16,
    backgroundColor: "red",
  },
});

export default Page;
