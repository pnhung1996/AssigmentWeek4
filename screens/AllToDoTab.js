import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, FlatList, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import data from '../data/data';

const AllToDoStack = createStackNavigator();

function listItem({ item, index, navigation, todoList, setTodoList }) {
    let backgroundColor = item.status === 'Done' ? '#000099' : '#66CC33';

    return (
        <TouchableOpacity style={[styles.itemStyle, { backgroundColor: backgroundColor }]}
            onPress={() => {
                item.status = item.status === 'Done' ? 'Active' : 'Done';
                const newTodoList = [...todoList];
                setTodoList(newTodoList);
                navigation.navigate('TodoDetailStack', {
                    status: item.status,
                    index: index + 1,
                    body: item.body
                });
            }}>
            <Text style={{ fontSize: 15, color: '#ffffff' }}>
                {index + 1}.{item.body}
            </Text>
        </TouchableOpacity>
    )
}

function listFooter({ todoList, setTodoList }) {
    return (
        <KeyboardAvoidingView style={styles.footerStyle}>
            <TextInput
                style={{
                    width: '100%',
                    height: 40,
                    textAlign: 'center',
                    borderWidth: 2,
                    borderColor: '#000099',
                    borderRadius: 5
                }}
                placeholder="Write some task" />
            <TouchableOpacity style={styles.submitButtonStyle}
                onPress={() => {
                    const newItem = {
                        id: todoList.length + 1,
                        status: 'Done',
                        body: 'Do Homework'
                    };
                    const newTodoList = [...todoList, newItem];
                    setTodoList(newTodoList);
                }}>
                <Text style={{ color: '#ffffff' }}>
                    Submit
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    )
}

function ToDoListStack({ navigation }) {
    const [todoList, setTodoList] = useState(data);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/image.jpg')} style={styles.backgroundStyle}>
                <FlatList data={todoList}
                    style={styles.listStyle}
                    renderItem={({ item, index }) => listItem({ item, index, navigation, todoList, setTodoList })}
                    ListFooterComponent={listFooter({todoList, setTodoList})}
                    ListFooterComponentStyle={{
                        height: 150
                    }}
                    ListHeaderComponent={<Text style={{ color: '#ffffff', fontSize: 25 }}>Todo List ({data.length})</Text>}
                    ListHeaderComponentStyle={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                </FlatList>

            </ImageBackground>

        </SafeAreaView>
    )
}

function TodoDetailStack({ navigation, route }) {
    const { status, index, body } = route.params;

    return (
        <View style={styles.detailStyle}>
            <Text style={{ fontSize: 30 }}>
                {index}.{status}
            </Text>
            <Text style={{ fontSize: 35, textAlign: 'center' }}>
                {body}
            </Text>
        </View>
    )
}

export default function AllTodoTab() {
    return (
        <AllToDoStack.Navigator>
            <AllToDoStack.Screen name="ToDoListStack" component={ToDoListStack}
                options={{
                    headerShown: false
                }} />
            <AllToDoStack.Screen name='TodoDetailStack' component={TodoDetailStack} />
        </AllToDoStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listStyle: {
        width: '80%',
        marginTop: 40,
        padding: 10,
        marginBottom: 100,
        backgroundColor: 'rgba(49, 40, 25, 0.7)',
        borderRadius: 10,
        opacity: 10
    },
    itemStyle: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 10,
        padding: 10
    },
    footerStyle: {
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100
    },
    detailStyle: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    submitButtonStyle: {
        height: 40,
        width: '40%',
        backgroundColor: '#000099',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
