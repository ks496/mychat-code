import React, { Component } from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,ImageBackground } from 'react-native'; 

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {}
        };
        this.validateForm = this.validateForm.bind(this);
    }
     

    handleName = (text) => {
        this.setState({ name: text})
      }

      handleDisplayName = (text) => {
        this.setState({ displayname: text})
      }

    handleEmail = (text) => {
        this.setState({ email: text})
      }
      handlePassword = (text) => {
        this.setState({ password: text})
      }


      validateForm () {
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        
        if (name === ''){
            errors.name = "Name cannot be empty.";
        } else {
            errors.name = '';
        }

        if (displayname === ''){
            errors.displayname = " Display name cannot be empty.";
        } else {
            errors.displayname = '';
        }

        if (emailaddr === ''){
          errors.email = "Email address cannot be empty.";
        } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
          errors.email = "Please provide correct email address";
        } else {
          errors.email = '';
        }
    
        if (pass === ''){
          errors.pass = "Password cannot be empty.";
        } else if (pass && pass.length < 5) {
          errors.pass = "Password should be more than 5 characters.";
    
        } else {
          errors.pass = '';
    
        } 
        this.setState({ errors})
        if (errors.name==='' && errors.displayname==='' && errors.email=== '' && errors.pass === ''){
          this.submitForm();
        }
      }

submitForm = async () => {
    let that = this;
    axios.post('http://192.168.43.121:8082/registeruser',{
        name: this.state.name,
        displayname: this.state.displayname,
        email: this.state.email,
        password: this.state.password
    })
    .then(function (response) {
        if(response && response.data && response.data._id) {
            that.props.navigation.navigate('Home');
        } else {
            Toast.show(respone.data.message, 1000); 
        }
    })
    .catch(function (error){
        console.log(error);
    });

}

goToLogin = () => {
    this.props.navigation.navigate('Login');
}

render() {
    const { errors } = this.state;
    return (
        <ImageBackground source={require('./bi7.jpg')}
            style={{width:'100%',height:'100%'}}>


        <View style={styles.container}>

        <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Name" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handleName}/>
           <Text style={[styles.errorstyle]}>{errors.name}</Text>      
          </View>

          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Display Name" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handleDisplayName}/>
           <Text style={[styles.errorstyle]}>{errors.displayname}</Text>      
          </View>
         
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email id" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handleEmail}/>
           <Text style={[styles.errorstyle]}>{errors.email}</Text>      
          </View>
  
  
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handlePassword}/>
            <Text style={[styles.errorstyle]}>{errors.pass}</Text>  
          </View>
  
  
        
          <TouchableOpacity style={styles.loginBtn}
          onPress={this.validateForm}>
            <Text style={styles.loginText}>SUBMIT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}
          onPress = {this.goToLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          </View>
          </ImageBackground>
    );
  }
}


export default Register;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    inputView:{
      width:"80%",
      backgroundColor:"#000000",
      borderRadius:25,
      borderColor: '#ffffff',
      borderWidth: 1,
      height:20,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    
    loginBtn:{
      width:"56%",
      backgroundColor:"#ff0000",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    errorstyle:{                          
      fontSize: 12,
     alignSelf: 'center',
     color:'red'
   },
  
    loginText:{
      color:"white"
    }
   

  
  });