import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  LongPressGestureHandler,
  State,
} from "react-native-gesture-handler";
import styles, { groupWidth } from "../styles/planogramStyles";
import { getImageBaseUrl } from "../utils/getBaseUrl";
import axios from "../services/axiosInstance";

export default function PlanogramScreen() {
  const [productRows, setProductRows] = useState([]);
  const [actualRows, setActualRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    available: false,
    shelf: false,
    sequence: false,
    quantity: false,
  });

  useEffect(() => {
    fetchPlanogram();
    fetchSubmissions();
  }, []);

  useEffect(() => {
    updateComplianceChecklist();
  }, [actualRows]);

  const fetchPlanogram = async () => {
    try {
      const res = await axios.get("/planogram-layout");
      setProductRows(res.data);
      setActualRows(JSON.parse(JSON.stringify(res.data)));
      setOriginalRows(JSON.parse(JSON.stringify(res.data)));
    } catch (err) {
      console.error("Planogram fetch error:", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("/shelf-submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Submissions fetch error:", err);
    }
  };

  const updateComplianceChecklist = () => {
    let totalProducts = 0, available = 0, shelf = 0, sequence = 0, quantity = 0;

    for (let i = 0; i < productRows.length; i++) {
      for (let j = 0; j < productRows[i].length; j++) {
        const expected = productRows[i][j].productImageUrls;
        const actual = actualRows[i][j].productImageUrls;
        totalProducts += expected.length;

        expected.forEach(exp => {
          if (
            actualRows.some(row =>
              row.some(group => group.productImageUrls.includes(exp))
            )
          ) {
            available++;
          }
        });

        if (
          JSON.stringify([...expected].sort()) ===
          JSON.stringify([...actual].sort())
        ) {
          shelf += expected.length;
        }

        expected.forEach((img, idx) => {
          if (actual[idx] === img) sequence++;
        });

        if (actual.length === expected.length) {
          quantity += expected.length;
        }
      }
    }

    const check = val => val / totalProducts >= 0.75;
    setCheckboxes({
      available: check(available),
      shelf: check(shelf),
      sequence: check(sequence),
      quantity: check(quantity),
    });
  };

  const getComplianceScore = () => {
    const values = Object.values(checkboxes);
    const checked = values.filter(Boolean).length;
    return ((checked / values.length) * 100).toFixed(1);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const handleSubmitShelf = async () => {
    try {
      let photoBase64 = "";
      if (capturedImage) {
        photoBase64 = await FileSystem.readAsStringAsync(capturedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const payload = {
        selectedImageUrls: actualRows.flatMap(row =>
          row.flatMap(group => group.productImageUrls)
        ),
        photoBase64,
        complianceScore: parseFloat(getComplianceScore()),
      };

      await axios.post("/shelf-submissions", payload);
      Alert.alert("✅ Success", "Shelf data submitted!");
      fetchSubmissions();
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("❌ Error", "Failed to submit shelf data");
    }
  };

  const resetShelf = () => {
    setActualRows(JSON.parse(JSON.stringify(originalRows)));
  };

  const handleDrop = (toRow, toGroupIdx) => {
    if (!draggedItem) return;
    const updated = JSON.parse(JSON.stringify(actualRows));
    const fromList = updated[draggedItem.row][draggedItem.group];
    const toList = updated[toRow][toGroupIdx];

    const [moved] = fromList.productImageUrls.splice(draggedItem.index, 1);
    toList.productImageUrls.push(moved);

    setActualRows(updated);
    setDraggedItem(null);
  };

  const renderShelfRow = (rowGroups, actual = false, rowIndex = 0) => (
    <ScrollView horizontal key={rowIndex} style={{ marginBottom: 20 }} showsHorizontalScrollIndicator={false}>
      {rowGroups.map((group, groupIdx) => {
        const expected = productRows[rowIndex]?.[groupIdx]?.productImageUrls || [];
        const actualImgs = group.productImageUrls;
        const isMatch =
          expected.length &&
          expected.length === actualImgs.length &&
          expected.every((img, idx) => img === actualImgs[idx]);

        return (
          <TouchableOpacity
            key={groupIdx}
            onPress={() => actual && handleDrop(rowIndex, groupIdx)}
            activeOpacity={1}
            style={[
              styles.productGroup,
              {
                borderColor: !actual ? "#ccc" : isMatch ? "green" : "red",
                width: groupWidth,
              },
            ]}
          >
            <View style={styles.groupImages}>
              {group.productImageUrls.map((img, idx) => (
                <LongPressGestureHandler
                  key={idx}
                  onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE && actual) {
                      setDraggedItem({
                        row: rowIndex,
                        group: groupIdx,
                        index: idx,
                      });
                    }
                  }}
                  minDurationMs={300}
                >
                  <Image
                    source={{
                      uri: img.startsWith("http")
                        ? img
                        : `${getImageBaseUrl()}${img}`,
                    }}
                    style={styles.productImage}
                  />
                </LongPressGestureHandler>
              ))}
            </View>
            <Text style={styles.groupLabel}>{group.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🧾 Planogram Compliance</Text>

        <Text style={styles.sectionTitle}>Given Exact Planogram</Text>
        {productRows.map((row, i) => renderShelfRow(row, false, i))}

        <Text style={styles.sectionTitle}>Actual Shelf (Drag to Any Box)</Text>
        {actualRows.map((row, i) => renderShelfRow(row, true, i))}

        <TouchableOpacity style={styles.resetBtn} onPress={resetShelf}>
          <Text style={styles.resetTxt}>🔄 Reset Layout</Text>
        </TouchableOpacity>

        <View style={styles.cameraBox}>
          <Text style={styles.sectionTitle}>Shelf Picture</Text>
          <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
            {capturedImage ? (
              <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imageText}>📷 Tap to Capture</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.complianceBox}>
          <Text style={styles.complianceTitle}>Compliance Checklist</Text>
          {[["available", "All Products Available"],
            ["shelf", "Correct Shelf Placement"],
            ["sequence", "Specified Sequence"],
            ["quantity", "Right Quantity"]].map(([key, label]) => (
            <View key={key} style={styles.checkboxRow}>
              <MaterialCommunityIcons
                name={checkboxes[key] ? "check-circle" : "close-circle-outline"}
                size={24}
                color={checkboxes[key] ? "green" : "red"}
              />
              <Text style={styles.checkboxLabel}>{label}</Text>
            </View>
          ))}
          <Text style={styles.scoreText}>✅ Total Compliance: {getComplianceScore()}%</Text>
        </View>

        <TouchableOpacity onPress={handleSubmitShelf} style={styles.submitBtn}>
          <Text style={styles.submitTxt}>📤 Submit Shelf Data</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>📜 Past Submissions</Text>
        {submissions.map((item, i) => (
          <View key={i} style={styles.pastCard}>
            <Text>📅 {new Date(item.submittedAt).toLocaleString()}</Text>
            <Text>📊 Score: {item.complianceScore}%</Text>
            {item.photoBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.photoBase64}` }}
                style={{ height: 120, borderRadius: 8, marginTop: 8 }}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
