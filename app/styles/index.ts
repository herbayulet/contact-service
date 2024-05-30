import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 16,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#FFF",
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
    // backgroundColor: "red",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    height: 50,
    borderRadius: 15,
  },
  textButton: {
    fontSize: 14,
    color: "white",
    fontWeight: 200,
    textAlign: "center",
  },
  photoInput: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    height: 200,
    marginBottom: 12,
  },
  photoPreview: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  photoPlaceholder: {
    fontSize: 16,
    color: "#666",
  },
  flatList: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Warna latar belakang semi-transparan
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalYa: {
    backgroundColor: "red",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
