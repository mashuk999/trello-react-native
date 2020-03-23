import React,{useState} from 'react';
import {Text, View, Button,StyleSheet,Image,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { AsyncStorage } from 'react-native';

const Login = ({ navigation }) =>{

    const [loginText,setloginText] = useState()
    const [passwordText,setPasswordText] = useState('')


    const handleRegistration=()=>{
        navigation.navigate('Registration');
    }

    const handleLogin = (res)=>{
        
        if(res==1){
            navigation.navigate('BottomNavigation',{
                username:{loginText}["loginText"]
            });
        }
        else{
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        }
    }
    const _storeData = async (ID) => {
        try {
          await AsyncStorage.setItem('loginID', ID);
        } catch (error) {
          // Error saving data
        }
      }

      const _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('loginID');
          if (value !== null) {
            // We have data!!
            // console.log(value);
            navigation.navigate('BottomNavigation',{
                username:value
            });
            
          }
        } catch (error) {
          // Error retrieving data
        }
      }
    const checkogin=()=>{
        console.log("check");
        _storeData('h');
        _retrieveData();    
    }
    
    const loginFunc =()=>{
        //console.log('hello');

        let url = 'http://127.0.0.1:8000/auth/login/';

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
            handleLogin(responseJson);
            return responseJson;
        }).catch((error) => {
            let message = 'Error saving new bookmark.';
            //this.setState({'currentMessage': message + "\n" + error});
            console.log(error);
        });
    }

    return(

        
        <View style={styles.container} onPress={checkogin()}>
         
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
                <Button title="Login"  onPress={loginFunc} />
                <Button title="Registration"  color="#fcd6cc" onPress={handleRegistration} />
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


export default Login;