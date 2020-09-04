import React, {Component} from 'react';
//import axios from 'axios';
//import Toast from 'react-native-simple-toast';
import { View, Text,ImageBackground, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userLogin ,userAuth} from '../actions/userAction';
import { connect } from 'react-redux';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {} 
        };
        this.validateForm = this.validateForm.bind(this);
    }
    
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({password: text })
    }

    componentDidMount() {
        this.props.userAuth()
    }
    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr === '') {
            errors.email="Email address cannot be empty.";
        } else if(emailaddr.length > 0 && !reg.test(emailaddr)){
            errors.email="Please provide correct email address.";
        } else {
            errors.email='';
        }

        if (pass ===''){
            errors.pass="Password cannot be empty.";
        } else if(pass && pass.length < 5) {
            errors.pass="Password should have more than 5 characters.";
        } else {

            errors.pass='';
        }
        this.setState({ errors })
        if(errors.email==='' && errors.pass===''){
          //this.submitForm();
          const userinfo={
            email:this.state.email,
            password:this.state.password
          }
           this.props.onLogin(userinfo)
    }
}

    /*submitForm = async () => {
        let that = this;
        axios.post('http://192.168.43.121:8082/loginuser',{
            email:  this.state.email,
            password: this.state.password
        })
        .then(function (response) {
            if(response && response.data && response.data._id){
                that.props.navigation.navigate('Home');
            } else {
                Toast.show(response.data.message, 1000);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }*/

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    } 
componentDidUpdate(nextProps){
    if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
    }
}

    render() {
        const { errors} = this.state;
        return (
             <ImageBackground source={require('./bi7.jpg')}
            style={{width:'100%',height:'100%'}}>
           
                
            
   
            <View style ={styles.container}>
              <Image
                    source={require('./bi12.jpeg')}
                    style={{ width: 150.5, height: 50}}
                />
                  <Image
                    source={require('./login.png')}
                    style={{ width: 150, height: 150}}
                />
           
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email/ Username"
                    placeholderTextColor = "#ffffff"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail} /> 
                <Text style={[styles.errorstyle]}> {errors.email}</Text>
               
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#ffffff"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword} />
                <Text style={[styles.errorstyle]}>{errors.pass}</Text>

                
                <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress = {this.validateForm}>
                    <Text style = {styles.submitButtonText }> Login </Text>
                </TouchableOpacity>
                <Text style ={styles.text}> Dont have an account?</Text>
                <TouchableOpacity 
                    style = {styles.RegisterButton}
                    onPress = {this.goToRegister}>
                    <Text style = {styles.RegisterButtonText }>Sign Up </Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
            );    
    }
}
function mapStateToProps(state) {
    console.log(state,"state")
    return{
        userReducer:state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onLogin:(userinfo) => dispatch(userLogin(userinfo)),
        userAuth: () => dispatch(userAuth())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text:
    {
        color:'white',
    },
  
    input: {
        margin: 10,
        height: 40,
        borderColor: '#ffffff',
        borderWidth: 2.5,
        width: '70%',
         borderRadius:25,
        padding: 10,
        fontSize: 13,
        lineHeight: 20,
        color: '#ffffff',
        right: 20
    },
    submitButton: {
        backgroundColor: '#00bfff',
        padding: 13,
        margin: 10,
        height: 40,
        borderRadius: 30,
        width: 150,
        right: 20
        
    },
    submitButtonText:{
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 10,

    },
    RegisterButton: {
        backgroundColor: '#00FF00',
        padding: 12,
        margin: 15,
        height: 40,
        borderRadius: 30,
        width: 150,
        right: 20
        
    },
    RegisterButtonText:{
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 10,

    },
    errorstyle: {
        color: 'red',
    }
})