import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button, CardSection } from './Components/Common';
import LoginForm from './Components/LoginForm';


//it will take index.js file from common folder


class App extends Component 
{

componentWillMount()
{
    {

      this.state = { loggedIn: null };

        firebase.initializeApp(
            {
                apiKey: 'AIzaSyCC9atg7KWU2YJffsb3YS5-bZX-BkkJl_A',
                authDomain: 'authentication-35802.firebaseapp.com',
                databaseURL: 'https://authentication-35802.firebaseio.com',
                projectId: 'authentication-35802',
                storageBucket: 'authentication-35802.appspot.com',
                messagingSenderId: '582519273903'
            }
        );

    
        firebase.auth().onAuthStateChanged((user) =>
        {
          if (user)
            {
              this.setState({ loggedIn: true });
            }
            
            else
            {
              this.setState({ loggedIn: false });
            }


        });


    }
}


  log()
  {

    if (this.state.loggedIn === null)
    {
        return (
        
        <Spinner />

        );
    }
    else if (this.state.loggedIn === true)
    {
      return (
        
          <CardSection>
           <Button onPress={() => firebase.auth().signOut()}>LogOut</Button>
        </CardSection>
        
        );
    }
    else
    {
      return (
     
        <LoginForm />

      );
    }
  }

      
  render()   

  {
    return (
      <View>

        <Header>Authentication</Header>
        
        { this.log() }
           
      </View>
    );
  }

}

export default App;

