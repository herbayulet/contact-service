import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDeleteContactMutation } from "@/redux/service/data";

export const allFunction = () => {
  const [photo, setPhoto] = useState<any>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string>("");
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

    console.log(result);

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

  // Logika untuk menghapus data ketika pengguna menekan "Ya" di modal konfirmasi
  const handleDeleteConfirmation = (id: string) => {
    handleDelete(selectedContact);
    closeConfirmationModal(); // Tutup modal konfirmasi setelah penghapusan berhasil
  };

  console.log(selectedContact, "ini terpilih");

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
  };
};
