import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ListScreen() {
  const [item, setItem] = useState("");
  const [qtd, setQtd] = useState(0);
  const [items, setItems] = useState<{ nome: string; quantidade: number }[]>(
    []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const colorScheme = useColorScheme();

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
      marginTop: 200,
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
    row: {
      flexDirection: "row",
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    headerRow: {
      flexDirection: "row",
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      backgroundColor: "#666",
    },
    cell: {
      flex: 1,
      color: "#fff",
      textAlign: "center",
    },
    headerCell: {
      flex: 1,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
    },
    button: {
      margin: 4,
      padding: 4,
      backgroundColor: "red",
      borderRadius: 4,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
  });

  const addItem = () => {
    if (item.trim().length > 0 && qtd > 0) {
      if (editingIndex === null) {
        setItems([...items, { nome: item, quantidade: qtd }]);
      } else {
        const updatedItems = [...items];
        updatedItems[editingIndex] = { nome: item, quantidade: qtd };
        setItems(updatedItems);
        setEditingIndex(null);
      }
      setItem("");
      setQtd(0);
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const editItem = (index: number) => {
    setItem(items[index].nome);
    setQtd(items[index].quantidade);
    setEditingIndex(index);
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
          <Button
            title={editingIndex === null ? "Adicionar" : "Alterar"}
            onPress={addItem}
          />

          {items.length > 0 && (
            <Text style={[styles.title, { marginTop: 20 }]}>
              Itens na lista
            </Text>
          )}

          <View>
            {items.length > 0 && (
              <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Nome</Text>
                <Text style={styles.headerCell}>Quantidade</Text>
                <Text style={styles.headerCell}>Alterar</Text>
                <Text style={styles.headerCell}>Excluir</Text>
              </View>
            )}

            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.nome}</Text>
                  <Text style={styles.cell}>{item.quantidade}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => editItem(index)}
                  >
                    <Text style={styles.buttonText}>Alterar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteItem(index)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
