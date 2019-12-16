import React,{Component} from 'react';
import { View } from 'react-native';
import {Container, Form, Input,SubmitButton} from './style';
import Icon from '@expo/vector-icons/MaterialIcons';

// import { Container } from './styles';

export default class Main extends Component {
  state = {
    users: [],
    newUser: ''
  }

  handleAddUser = () => {
    console.log(this.state.newUser)
  }
  render() {
    const {users, newUser} = this.state;
    return (
      <Container>
        <Form>
        <Input autoCorret={false}
          autoCapitalize = "none"
          placeholder = "Adicionar Usuario"
          value = {newUser}
          onChangeText = {text => this.setState({ newUser: text })}
        />
        <SubmitButton onPress={this.handleAddUser}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
        </Form>
      </Container>
    );
  }
}
Main.navigationOptions = {
  title:'Usuarios',

}
