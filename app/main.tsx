import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "./schema";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useCreateNewContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "./redux/service/data";
import { Ionicons } from "@expo/vector-icons";
import { CustomBottomSheet } from "components/CustomBottomSheet";
import { allFunction } from "./func";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import ModalConfirmation from "components/ModalConfirmation";

// Define the schema using Zod

const Page = () => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const [addMode, setAddMode] = useState<boolean>(false);
  const {
    photo,
    setPhoto,
    pickImage,
    closeConfirmationModal,
    openConfirmationModal,
    handleDeleteConfirmation,
    showConfirmationModal,
    selectedContact,
    setSelectedContact,
  } = allFunction();
  const { data: dataContacts, error, isLoading } = useGetAllContactsQuery();

  const {
    data: detailContacts,
    error: errorById,
    isLoading: loadingById,
  } = useGetContactByIdQuery(selectedContact);

  const [
    createNewContact,
    { data, error: errorCreate, isLoading: loadingCreate },
  ] = useCreateNewContactMutation();

  const [
    updateContact,
    { data: dataUpdate, error: errorUpdate, isLoading: loadingUpdate },
  ] = useUpdateContactMutation();

  const onSubmit: SubmitHandler<UserSchema> = async (data: any) => {
    if (addMode == true) {
      try {
        const response = await createNewContact(data);
        bottomSheetRef.current?.close();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await updateContact({
          id: selectedContact,
          updatedContact: data,
        });

        bottomSheetRef.current?.close();
      } catch (error) {
        console.log(error, "ini error");
      }
    }
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(
    (contacts: any, addMode: boolean) => {
      setAddMode(false);
      if (addMode) {
        reset({
          firstName: "",
          lastName: "",
          age: "",
          photo: null,
        });
        setPhoto("");
        bottomSheetRef.current?.present();
      } else {
        setSelectedContact(contacts);
        bottomSheetRef.current?.present();
      }
    },
    [setValue, detailContacts?.data, reset]
  );

  useEffect(() => {
    if (!addMode && detailContacts?.data) {
      setValue("firstName", `${detailContacts?.data?.firstName}`, {
        shouldValidate: true,
      });
      setValue("lastName", `${detailContacts?.data?.lastName}`, {
        shouldValidate: true,
      });
      setValue("age", `${detailContacts?.data?.age}`, { shouldValidate: true });
      setPhoto(detailContacts?.data?.photo);
    }
  }, [setValue, detailContacts, addMode]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text
        style={styles.cardText}
      >{`${item.firstName} ${item.lastName}`}</Text>
      <View style={styles.cardIcons}>
        <TouchableOpacity
          onPress={() => {
            handlePresentModalPress(item?.id, false);
          }}
        >
          <Ionicons name="eye" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // handleDelete(item?.id);
            openConfirmationModal(item?.id);
          }}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 30 }}>
          List Contact Heroku
        </Text>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text>Error: {error.toString()}</Text>}
        {dataContacts?.data && (
          <FlatList
            data={dataContacts?.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            height: 50,
            borderRadius: 15,
            // marginBottom: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            handlePresentModalPress(null, true);
            setAddMode(true);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#FFFF",
              fontWeight: 20,
              fontSize: 16,
            }}
          >
            Tambah Kontak
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title={addMode ? "Tambah Kontak" : "Edit Kontak"}
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
                value={value}
                placeholder="Age"
              />
            )}
            name="age"
            defaultValue=""
          />
          {errors.age && (
            <Text style={styles.error}>{String(errors.age.message)}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TouchableOpacity
                style={[styles.input, styles.photoInput]}
                onPress={() => {
                  pickImage(); // Memanggil fungsi pickImage saat input foto ditekan
                }}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.photoPreview} />
                ) : (
                  <Text style={styles.photoPlaceholder}>Select Photo</Text>
                )}
              </TouchableOpacity>
            )}
            name="photo"
            defaultValue=""
          />
          {errors.photo && (
            <Text style={styles.error}>{String(errors.photo.message)}</Text>
          )}
          {addMode ? (
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          ) : (
            <Button title="Update" onPress={handleSubmit(onSubmit)} />
          )}
        </View>
      </CustomBottomSheet>
      <ModalConfirmation
        showConfirmationModal={showConfirmationModal}
        closeConfirmationModal={closeConfirmationModal}
        handleDeleteConfirmation={handleDeleteConfirmation}
        selectedContact={selectedContact}
      />
    </View>
  );
};

export default Page;
