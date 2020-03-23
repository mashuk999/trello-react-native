import React,{useState} from 'react';
import {Text, View, Button,StyleSheet,Image,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { AsyncStorage } from 'react-native';

const Registration = ({navigation}) =>{

    const [loginText,setloginText] = useState()
    const [passwordText,setPasswordText] = useState('')


    const handleRegistration=()=>{
        navigation.navigate('Login');
    }

    const registerFunc=()=>{
        let url = 'http://127.0.0.1:8000/auth/register/';

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type':     'application/json',
            },
            body: JSON.stringify({
                loginID: {loginText}['loginText'],
                password:{passwordText}['passwordText']
            }),
            credentials: 'same-origin',
        }).then((response) => {
            if (response.status === 403) {
                console.log('Authentication error...');
                
               // this.setState({currentMessage: 'Authentication error.'});
            }
            //console.log(response);
            //handleClick();
            return response.json()
        }).then((responseJson) => {
            //let jobj = JSON.parse(responseJson);
            console.log(responseJson);
            handleRegistration();
            return responseJson;
        }).catch((error) => {
            let message = 'Error saving new bookmark.';
            //this.setState({'currentMessage': message + "\n" + error});
            console.log(error);
        });
    }

    return(
        <View style={styles.container} >
         
        <View style={styles.innercontainer}>
           <Text style={styles.text}>UserName :</Text>
           <TextInput placeholder='Enter UserName'
           underlineColorAndroid='transparent'
           style={{borderBottomColor:'black',borderBottomWidth:1,fontSize:20}}
           onChangeText={(value)=>{setloginText(value)}}/>
       </View>

       <View style={styles.innercontainer}>
           <Text style={styles.text}>Password :</Text>
           <TextInput placeholder='Enter Password' 
           underlineColorAndroid='transparent' 
           style={{borderBottomColor:'black',borderBottomWidth:1,fontSize:20}}
           onChangeText={(value)=>{setPasswordText(value)}}/>
       </View>

       <View style={styles.innercontainer}>
           <Button title="Register"  color="#fcd6cc" onPress={registerFunc} />
       </View>
       

   </View>
    );

}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:90,
    },
    innercontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:20
    },

    text:{
        fontSize:20,
        justifyContent:'center',
        alignContent:'center'
    },
});

export default Registration