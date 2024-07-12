import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCojKRQfrgepsUh-8Gx6TRBkSqn-TH80cA",
  authDomain: "todo-5ce65.firebaseapp.com",
  projectId: "todo-5ce65",
  storageBucket: "todo-5ce65.appspot.com",
  messagingSenderId: "39785748052",
  appId: "1:39785748052:web:c8e8f48efcd3dac45b3fc1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>
        ToDo example with React Native and Firestore
      </Text>
    </View>
  );
}

function ToDoList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      const storedItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(storedItems);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addToDoItem = async () => {
    if (itemText !== "") {
      await addDoc(collection(db, "todos"), {
        text: itemText,
      });
      setItemText("");
    }
    Keyboard.dismiss();
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={(text) => setItemText(text)}
          placeholder="Write a new todo here" />
        <Button
          title="Add"
          style={styles.addTodoButton}
          onPress={addToDoItem}/>
      </View>
      <ScrollView style={styles.list}>
        {items.map( (item,index) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={styles.listItemText}>* {item.text}</Text>
            <Text
              style={styles.listItemDelete}
              onPress={() => removeItem(item.id)}>X</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput : {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    flex: 1,
  },
  addTodoButton: {
    marginLeft: 5,
  },
  list: {
    color: 'black',
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  listItemText: {
    flex: 1,
  },
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold'
  }
});
