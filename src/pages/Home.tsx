import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const verifyIfTaskExists = tasks.find(task => task.title === newTaskTitle);

    if(verifyIfTaskExists) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome", [{text: 'OK'}])
    } else {
      const newTask : Task = {
        id: new Date().getTime(),
        done: false,
        title: newTaskTitle
      }

      setTasks([...tasks, newTask])
    }  

    
  }

  function handleToggleTaskDone(id: number) {
    
    const newTask = tasks.find(task => task.id === id);
    
    if(newTask) {
      const newTasks = tasks.filter(task => task.id != id);
      newTask.done ? newTask.done = false : newTask.done = true;
      
      setTasks([...newTasks, newTask].sort((a, b) => a.id - b.id))
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?", 
      [
        {text: 'Sim', onPress: () => setTasks(tasks.filter(task => id != task.id))},
        {text: 'Não'}
      ], 
    )
  }

  function handleEditTask(id: number, title: string) {
    const newTask = tasks.find(task => task.id === id);
    
    if(newTask) {
      const newTasks = tasks.filter(task => task.id != id);
      newTask.title = title;
      
      setTasks([...newTasks, newTask].sort((a, b) => a.id - b.id))
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})