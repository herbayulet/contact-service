import { View, Text, Modal, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles";

interface PropsModalConfirmation {
  showConfirmationModal: boolean;
  handleDeleteConfirmation: (id: string) => void;
  closeConfirmationModal: () => void;
  selectedContact: string;
}

const ModalConfirmation: React.FC<PropsModalConfirmation> = ({
  showConfirmationModal,
  handleDeleteConfirmation,
  closeConfirmationModal,
  selectedContact,
}) => {
  return (
    <Modal
      visible={showConfirmationModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Apakah Anda yakin ingin menghapus data?
          </Text>
          <View style={styles.modalButtons}>
            <Button title="Tidak" onPress={closeConfirmationModal} />
            <Button
              title="Ya"
              onPress={() => {
                handleDeleteConfirmation(selectedContact);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirmation;
