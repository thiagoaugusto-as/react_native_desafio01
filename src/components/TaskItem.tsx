import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'

import { Task } from './TasksList';

interface TaskItemProps {
    index: number;
    task: {
        id: number;
        title: string;
        done: boolean
    };
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem({ index, task, editTask, removeTask, toggleTaskDone }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setUpdatedTaskTitle(task.title);
        
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, updatedTaskTitle);
        setIsEditing(false);
    }

    useEffect(() => {
        if(textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return(
        <View style={styles.TaskItem}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done ? styles.taskMarkerDone : styles.taskMarker} 
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  ref={textInputRef}
                  style={task.done ? styles.taskTextDone : styles.taskText}
                  onChangeText={setUpdatedTaskTitle}
                  editable={isEditing}
                  onSubmitEditing={handleSubmitEditing}
                  value={updatedTaskTitle}
                >
                  
                </TextInput>
              </TouchableOpacity>
            </View>
            
            <View style={styles.TaskEdit}>
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    >
                    {
                        isEditing 
                        ? 
                        <Icon name='x' size={20} color={'#B2B2B2'} onPress={handleCancelEditing}/>
                        : 
                        <Icon name='edit' size={20} color={'#B2B2B2'} onPress={() => handleStartEditing()}/>
                    }
                </TouchableOpacity>

                <View style={styles.iconsDivider}/>
                
                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 5, opacity: isEditing ? 0.2 : 1}}
                    onPress={() => removeTask(task.id)}
                    >
                    <Icon name='trash' size={20} color={'#B2B2B2'}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    iconsDivider: {
        height: 20,
        width: 1,
        marginHorizontal: 5,
        backgroundColor: '#E1E1E1'
    },
    TaskEdit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        color: '#B2B2B2'
    },
    TaskItem: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
});