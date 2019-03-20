import React, {Component} from 'react';
import {Platform,AppRegistry, StyleSheet, Text, View, Button} from 'react-native';

import firebase from 'firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={pontuacao:0}
  }

  componentWillMount(){
    var config = {
      apiKey: "AIzaSyBVGSek7ahQSc5sm8Lzw_unWhcy-sMhxm8",
      authDomain: "react-e78b2.firebaseapp.com",
      databaseURL: "https://react-e78b2.firebaseio.com",
      projectId: "react-e78b2",
      storageBucket: "react-e78b2.appspot.com",
      messagingSenderId: "971976899230"
    };
    firebase.initializeApp(config);
  }

  salvarDados(){
    var funcionarios= firebase.database().ref("funcionarios");
    //funcionarios.child("001").child("nome").set("leo");
    //funcionarios.child("002").remove();
    //funcionarios.push().child("nome").set("leo");
    funcionarios.push().set(
      {
        nome:"leonardo",
        altura:"1,75",
        peso:"70kg"
      }
    );
  }
  listarDados(){
    var pontuacao = firebase.database().ref("funcionarios");
    pontuacao.once('value', (snapshot)=>{//criando um listener para pontuação, e sempre que o valor for alterado , essa função é chamada
      //alert(snapshot.val());
      var pontos= snapshot.val();
      this.setState({pontuacao:pontos});
    });
    /*var pontuacao = firebase.database().ref("pontuacao");
    pontuacao.on('value', (snapshot)=>{//criando um listener para pontuação, e sempre que o valor for alterado , essa função é chamada
      //alert(snapshot.val());
      var pontos= snapshot.val();
      this.setState({pontuacao:pontos});
    });*/
  }

  render() {
    let{pontuacao}=this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>firebaseTeste</Text>
        <Button
          onPress={()=>{this.salvarDados();}}
          title="Salvar dados"
          color="#841584"
          accessibilityLabel="Salvar dados"/>
          
        <Button
          onPress={()=>{this.listarDados();}}
          title="Listar dados"
          color="#841584"
          accessibilityLabel="Listar dados"/>
          <Text>{pontuacao}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('firebaseTeste', () => App);
