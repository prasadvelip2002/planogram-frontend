import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export const groupWidth = (screenWidth - 60) / 3;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#34495e",
  },
  productGroup: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupImages: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 6,
  },
  productImage: {
    width: groupWidth / 4,
    height: groupWidth / 4,
    margin: 4,
    resizeMode: "contain",
    borderRadius: 6,
    zIndex: 10,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
    textAlign: "center",
    color: "#2d3436",
  },
  cameraBox: {
    alignItems: "center",
    marginVertical: 20,
  },
  imagePicker: {
    width: 160,
    height: 160,
    backgroundColor: "#eef",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  imageText: {
    color: "#555",
    fontSize: 14,
    textAlign: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  complianceBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  complianceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "center",
    color: "#000",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
    marginTop: 10,
    textAlign: "center",
  },
  submitBtn: {
    marginTop: 24,
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
  },
  submitTxt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pastCard: {
    marginTop: 12,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
  },
  resetBtn: {
    backgroundColor: "#ff4757",
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  resetTxt: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
