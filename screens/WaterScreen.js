import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WaterScreen() {
  const [waterAmount, setWaterAmount] = useState('');
  const [filledPercentage, setFilledPercentage] = useState(0);
  const [goal, setGoal] = useState(null);
  const [inputGoal, setInputGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(false);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedGoal = await AsyncStorage.getItem('goal');
        const storedPercentage = await AsyncStorage.getItem('filledPercentage');

        if (storedGoal !== null) setGoal(parseFloat(storedGoal));
        if (storedPercentage !== null) setFilledPercentage(parseFloat(storedPercentage));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        if (goal !== null) {
          await AsyncStorage.setItem('goal', goal.toString());
          await AsyncStorage.setItem('filledPercentage', filledPercentage.toString());
        }
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };

    saveData();
  }, [filledPercentage, goal]);

  const handleAddWater = () => {
    const amount = parseFloat(waterAmount);
    if (!isNaN(amount) && goal) {
      const percentage = (amount / (goal * 1000)) * 100;
      setFilledPercentage(prev => Math.min(prev + percentage, 100));
    }
  };

  const handleSetGoal = () => {
    const goalInLiters = parseFloat(inputGoal);
    if (!isNaN(goalInLiters)) {
      setGoal(goalInLiters);
      setShowGoalInput(false);
      setFilledPercentage(0);
    }
  };

  const handleResetWater = async () => {
    setFilledPercentage(0);
    await AsyncStorage.removeItem('filledPercentage');
  };

  return (
    <View style={styles.container}>
      {showGoalInput ? (
        <View style={styles.goalContainer}>
          <TextInput
            style={styles.goalInput}
            placeholder="Defina sua meta (litros)"
            keyboardType="numeric"
            value={inputGoal}
            onChangeText={setInputGoal}
          />
          <Button title="Salvar Meta" onPress={handleSetGoal} />
        </View>
      ) : (
        <Button title="Definir Meta de Consumo" onPress={() => setShowGoalInput(true)} />
      )}

      {goal && <Text style={styles.goalText}>Meta: {goal} L</Text>}

      <View style={styles.bottleContainer}>
        <View style={styles.bottle}>
          <View style={[styles.water, { height: `${filledPercentage}%` }]} />
        </View>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade de água (ml)"
        keyboardType="numeric"
        value={waterAmount}
        onChangeText={setWaterAmount}
      />
      <Button title="Adicionar Água" onPress={handleAddWater} />
      <Button title="Resetar Consumo" onPress={handleResetWater} style={styles.resetButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottleContainer: {
    width: 150,
    height: 300,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    position: 'relative',
    overflow: 'hidden',
  },
  water: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#00f',
    borderRadius: 10,
  },
  goalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '60%',
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  goalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: '#ff0000',
  },
});
