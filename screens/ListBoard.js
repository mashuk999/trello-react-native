import React ,{useState} from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Button, Modal } from 'react-native';
import Boards from '../components/Boards'
import AddBoards from '../screens/AddBoard'
import { AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>

            <Button title="Add Board" onPress={() => navigation.navigate('MyModal')} />
            <Boards />

        </SafeAreaView>
    );
}

function ModalScreen({ navigation }) {
    return (
        <View style={{ height: '100%', }}>
            <AddBoards nav={() => navigation.navigate('Main')} />
        </View>
    );
}
const RootStack = createStackNavigator();

const ListBoard = () => {

    const [curUser, setcurUser] = useState([]);

    const _retrieveData = async () => {

        try {
            const value = await AsyncStorage.getItem('loginID');
            if (value !== null) {
                // We have data!!
                let c = Object.create(null);
                c = [value];
                setcurUser(c);
                console.log(c);
                loadBoards();
            }

        } catch (error) {
            // Error retrieving data

        }

    }


    const loadBoards = () => {
        let url = 'http://127.0.0.1:8000/api/getboards/';

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authors: { curUser }['curUser']
            }),
            credentials: 'same-origin',
        }).then((response) => {
            if (response.status === 403) {
                console.log('Authentication error...');

                // this.setState({currentMessage: 'Authentication error.'});
            }
            console.log(response);
            //handleClick();
            return response.json()
        }).then((responseJson) => {
            //let jobj = JSON.parse(responseJson);
            console.log(responseJson);
            
            return responseJson;
        }).catch((error) => {
            let message = 'Error saving new bookmark.';
            //this.setState({'currentMessage': message + "\n" + error});
            console.log(error);
        });
    }


    return (

        <RootStack.Navigator mode="card" headerMode="none" screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Main" component={HomeScreen} />
            <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Navigator>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
export default ListBoard

