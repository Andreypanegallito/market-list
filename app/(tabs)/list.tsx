import React, { useState } from "react";
import { View, Button, Text, StyleSheet, useColorScheme } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { Table, Row } from "react-native-table-component";

export default function ListScreen() {
  const [item, setItem] = useState("");
  const [qtd, setQtd] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const tableData = items.map((item, index) => [index + 1, item]);
  const colorScheme = useColorScheme();

  const teste = [];

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: "100%",
      height: "100%",
      flex: 1,
      padding: 16,
      backgroundColor: "#353636",
      justifyContent: "center",
    },
    titleView: {
      display: "flex",
      textAlign: "center",
      fontSize: 18,
      width: "100%",
      height: "20%",
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 32,
      textAlign: "center",
      width: "100%",
      color: colorScheme === "dark" ? "#fff" : "#353636",
    },
    containerContent: {
      height: "80%",
      width: "100%",
      display: "flex",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: colorScheme === "dark" ? "#fff" : "#353636",
    },
    input: {
      height: 40,
      width: 200,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 8,
      paddingHorizontal: 8,
      color: colorScheme === "dark" ? "#fff" : "#353636",
    },
    listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    head: { height: 40, backgroundColor: "#f1f8ff", padding: 6 },
    wrapper: { flexDirection: "row" },
    row: { flexDirection: "row" },
    text: { margin: 6, color: colorScheme === "dark" ? "#fff" : "#353636" },
    tableBorder: { borderWidth: 1, borderColor: "#c8e1ff" },
  });

  const addItem = () => {
    if (item.trim().length > 0) {
      teste.push(item);
      setItems([...items, item]);
      setItem("");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Lista do Mercado</Text>
        </View>

        <View style={styles.containerContent}>
          <View>
            <Text style={styles.label}>Produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Adicionar produto"
              value={item}
              onChangeText={setItem}
            />
          </View>
          <View>
            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={qtd.toString()}
              onChangeText={(text) => setQtd(parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>
          <Button title="Adicionar" onPress={addItem} />

          <ScrollView></ScrollView>

          <ScrollView>
            <Table borderStyle={styles.tableBorder}>
              <Row data={["ID", "Produto"]} style={styles.head} />
              {tableData.map((rowData, index) => (
                <Row key={index} data={rowData} textStyle={styles.text} />
              ))}
            </Table>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
