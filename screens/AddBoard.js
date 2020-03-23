import React,{useState} from 'react';
import { Modal, Text, View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';


const AddBoard = (props) => {
    const [boardName,setBoardName] = useState();
    const [curUser,setcurUser]=useState([]);
    
    const _retrieveData = async () => {

        try {
          const value = await AsyncStorage.getItem('loginID');
          if (value !== null) {
            // We have data!!
            let  c= Object.create(null);
            c = [value];
            setcurUser(c);
            console.log(c);
            handleCreateBoard();
          }
        
        } catch (error) {
          // Error retrieving data

        }
        
      }


    const handleCreateBoard=()=>{
        let url = 'http://127.0.0.1:8000/api/addboard/';

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type':     'application/json',
            },
            body: JSON.stringify({
                boardName: {boardName}['boardName'],
                authors: {curUser}['curUser']
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
            if(responseJson==1)
            {
                props.nav();
            }
            return responseJson;
        }).catch((error) => {
            let message = 'Error saving new bookmark.';
            //this.setState({'currentMessage': message + "\n" + error});
            console.log(error);
        });
    }

    return (
        <View style={styles.container} >
            <View style={styles.innercontainer}>
                <Text style={{fontSize:30,marginBottom:20,fontFamily:'Verdana'}}>Enter Name:</Text>
                <TextInput style={{fontSize:30,marginBottom:'50%',borderBottomWidth:1}}
                onChangeText={(value)=>{setBoardName(value)}}
                value={boardName}/>
                <Button onPress={_retrieveData} title="Create" />


            </View>

            <Button onPress={props.nav} title="Dismiss" />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    innercontainer:{
        margin:20,
        padding:'10%',
        paddingTop:'10%',
        marginBottom:'50%',
        height: '50%',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#e7e7e7',

    }
});
export default AddBoard