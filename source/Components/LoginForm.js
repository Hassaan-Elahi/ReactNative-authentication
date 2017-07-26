import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, InputFeild, Spinner } from './Common';


class LoginForm extends Component
{
    state={ Email: '', Password: '', loading: false, error: '', yes: '' };
   
onButtonPress() 
{
    
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ 
    error: 'Authentication Failed',
    loading: false,
    yes: ''
     });
  }

  onLoginSuccess() 
  {

  
    this.setState({
      Email: '',
      Password: '',
      loading: false,
      error: '',
      yes: 'login successful'
    });
  }


    ShowButton()
    {
        if (this.state.loading === true)
        {
            return (
                <Spinner />
            );      
        }
        else
        {
        
            return (
                   <Button onPress={this.onButtonPress.bind(this)}>
                   
                    Login
                   
                   </Button>
                );
        }
    }


    render()
    {

        return (
    
            <Card>

    
            <CardSection>

                    <InputFeild
                    value={this.state.Email}
                    onChangeText={changedText => this.setState({ Email: changedText })}
                    lable='Email'
                    placeholder="user@gmail.com"
                    secureEntry={false}
                    />
              

            </CardSection>

            <CardSection>

                    <InputFeild
                    value={this.state.Password}
                    onChangeText={PasswordText => this.setState({ Password: PasswordText })}
                    lable='Password'
                    placeholder="Password"
                    secureTextEntry
                    />
              
            </CardSection>


        <Text style={styles.ErrorStyle}>{this.state.error}</Text>
        <Text style={styles.yesstyle}>{this.state.yes}</Text>

            <CardSection>
                
                {this.ShowButton()}
                
            </CardSection>


            </Card>
    
        );
    }
}
const styles = {

    ErrorStyle: {

    color: 'red',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold'

    },
    yesstyle: {
        color: 'blue',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold'

    }

};
export default LoginForm;
