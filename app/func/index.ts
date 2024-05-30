import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "@/redux/service/data";
import debounce from "lodash/debounce";
import Toast from "react-native-toast-message";

export const allFunction = () => {
  const [photo, setPhoto] = useState<any>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const { data: dataContacts, error, isLoading } = useGetAllContactsQuery();
  const [
    deleteContact,
    { data: deleteData, error: errorDelete, isLoading: loadingDelete },
  ] = useDeleteContactMutation();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleDelete = useCallback(
    async (id: any) => {
      try {
        const response = await deleteContact(id);
        if (response?.error?.status !== 400) {
          Toast.show({
            type: "success",
            text1: "Berhasil !!",
            text2: "menghapus contact",
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        if (error) {
          Toast.show({
            type: "error",
            text1: "hahaha",
            visibilityTime: 3000,
          });
        }

        console.log(error, "ini error");
      }
    },
    [deleteContact]
  );

  // Fungsi untuk menampilkan modal konfirmasi
  const openConfirmationModal = (id: string) => {
    setSelectedContact(id);
    setShowConfirmationModal(true);
  };

  // Fungsi untuk menyembunyikan modal konfirmasi
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // Logika untuk menghapus data ketika user menekan "Ya" di modal konfirmasi
  const handleDeleteConfirmation = (id: string) => {
    handleDelete(selectedContact);
    closeConfirmationModal(); // Tutup modal konfirmasi setelah penghapusan berhasil
  };

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (dataContacts?.data) {
        const filtered = dataContacts.data.filter((contact: any) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setFilteredContacts(filtered);
      }
    }, 300),
    [dataContacts]
  );

  const handleChangeSearch = (text: string) => {
    setSearchQuery(text);
    handleSearch(text);
  };

  return {
    photo,
    setPhoto,
    pickImage,
    showConfirmationModal,
    closeConfirmationModal,
    handleDeleteConfirmation,
    openConfirmationModal,
    selectedContact,
    setSelectedContact,
    searchQuery,
    handleChangeSearch,
    setFilteredContacts,
    filteredContacts,
  };
};
