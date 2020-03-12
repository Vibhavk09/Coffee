import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import Firebase from '../firebase';
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <Image
          source={require('../assets/footig.png')}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: 0,
            height: 150,
            width: 400,
          }}
        />

        <Image
          source={require('../assets/logoig.png')}
          style={{
            marginTop: -20,
            alignSelf: 'center',
            width: 150,
            height: 150,
          }}
        />
        <Text style={styles.greeting}>{`\n\nWelcome!`}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={{ marginTop: 28 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 28 }}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{ color: '#414959', fontSize: 17 }}>
            New here?{' '}
            <Text style={{ fontWeight: '700', color: '#00b33c' }}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    marginTop:100,
    flex: 1,
  },
  greeting: {
    // marginTop: -32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#005ce6',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
