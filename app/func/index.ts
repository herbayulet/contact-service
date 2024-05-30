import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "@/redux/service/data";
import debounce from "lodash/debounce";

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
      } catch (error) {
        console.log(error);
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
