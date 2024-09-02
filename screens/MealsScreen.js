// screens/MealsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const meals = [
  { id: '1', name: 'Café da manhã', completed: false },
  { id: '2', name: 'Almoço', completed: false },
  { id: '3', name: 'Lanche da tarde', completed: false },
  { id: '4', name: 'Janta', completed: false },
];

export default function MealsScreen() {
  const [mealList, setMealList] = useState(meals);

  const toggleCompletion = (id) => {
    setMealList((prevList) =>
      prevList.map((meal) =>
        meal.id === id ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, item.completed && styles.itemCompleted]}
      onPress={() => toggleCompletion(item.id)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mealList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  item: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemCompleted: {
    backgroundColor: '#d3ffd3',
    borderColor: '#a3cba3',
  },
  itemText: {
    fontSize: 18,
  },
});
