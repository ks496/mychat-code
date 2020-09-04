import React, {Component} from 'react';
import { FlatList,  View, Text, StyleSheet,ImageBackground ,TouchableOpacity,Picker} from 'react-native';
//import axios from 'axios';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';







class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    
      };
      
        

    componentDidMount(){
        this.props.onUserList();
    }

    goChat = (userid,name) => {
        this.props.navigation.navigate('Chat', {userid: userid,name: name});
    }
   
    
   
    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
            this.setState({users: this.props.userReducer.userList});
            //this.props.navigation.navigate('Chat');
            //this.setState({users:response.data});
        }
    }

    render(){
        const { users } = this.state;
        return (
             <ImageBackground source={require('./bi7.jpg')}
            style={{width:'100%',height:'100%'}}>
            
              <View style={styles.container}>
                {users && users.length>0 ?
                <View>
                {users.map((item,index) => {
                    return(
                       
                        <TouchableOpacity onPress={()=>this.goChat(item._id,item.name)}   key={index}>
                        <Text style ={styles.item}>
                            {item.name}
                        </Text>
                        </TouchableOpacity>
                   )})}
               
                </View>:null}
                </View>
               </ImageBackground>
             )
    }
}
///export default Home;

function mapStateToProps(state) {
    return{
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return{
        onUserList:() => dispatch(userList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10
    },
    button:{
          backgroundColor: '#00bfff',
        padding: 13,
        margin: 10,
        height: 40,
        borderRadius: 30,
        width: 150,
        right: 20
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        color: '#FFFFFF',

    },
});
