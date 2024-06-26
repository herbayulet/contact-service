import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React from "react";
import {
  Controller,
  useForm,
  SubmitErrorHandler,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaUser, UserSchema } from "@/schema";
import { styles } from "@/styles";

interface PropsInputComponent {
  pickImage: () => void;
  photo: string;
  addMode: boolean;
  onSubmit: SubmitHandler<SchemaUser>;
  formMethods: UseFormReturn<SchemaUser>;
}

const InputComponent: React.FC<PropsInputComponent> = ({
  pickImage,
  photo,
  addMode,
  onSubmit,
  formMethods,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  return (
    <View style={styles.contentContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="First Name"
          />
        )}
        name="firstName"
        defaultValue=""
      />
      {errors.firstName && (
        <Text style={styles.error}>{String(errors.firstName.message)}</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Last Name"
          />
        )}
        name="lastName"
        defaultValue=""
      />
      {errors.lastName && (
        <Text style={styles.error}>{String(errors.lastName.message)}</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ? String(value) : ""}
            placeholder="Age"
            keyboardType="number-pad"
          />
        )}
        name="age"
      />
      {errors.age && (
        <Text style={styles.error}>{String(errors.age.message)}</Text>
      )}
      <TouchableOpacity
        style={[styles.input, styles.photoInput]}
        onPress={pickImage}
      >
        {photo.length > 0 ? (
          <Image source={{ uri: photo }} style={styles.photoPreview} />
        ) : (
          <Text style={styles.photoPlaceholder}>Select Photo</Text>
        )}
      </TouchableOpacity>
      <Button
        title={addMode ? "Submit" : "Update"}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default InputComponent;
