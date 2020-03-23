import React from 'react';
import {Text, View,StyleSheet} from 'react-native';

const Boards=(props)=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Name of Board</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e3e3e3',
        height:100,
        margin:20,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:30,
        color:'#949494',
        fontFamily:'Verdana'
    }
});
export default Boards