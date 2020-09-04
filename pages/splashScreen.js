import React, { Component} from 'react';
import { ActivityIndicator,View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,ImageBackground} from 'react-native';

export default class splashScreen extends Component 
{
	  constructor(props) 
	  {
        super(props);
        setTimeout(()=>
        {
        	this.props.navigation.navigate("Login")
        },2500);
    }
	render()
	{
		return(
			 <ImageBackground source={require('./bi7.jpg')}
            style={{width:'100%',height:'100%'}}>
    			 

                  <View style ={styles.container}>
                 
               <Image
                 source={require('./chatlogo.png')}
                 style={{ width: 130,height:130,borderRadius:25}}>
                 
			</Image>
			<Text style = {styles.text}>
               Welcome to MyChat!!
            </Text> 
            <ActivityIndicator size="large" color='red' />
			</View>
			</ImageBackground>
			);
		}
	}
	const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
	text: {
      color: '#ffffff',
      fontSize: 23,
      fontStyle: 'italic',
      textShadowColor: 'red',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius : 10
   }
   })





	
   
	