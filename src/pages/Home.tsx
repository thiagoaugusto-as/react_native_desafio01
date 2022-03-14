import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask : Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }

    setTasks([...tasks, newTask])
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
    //TODO - remove task from state
    setTasks(tasks.filter(task => id != task.id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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