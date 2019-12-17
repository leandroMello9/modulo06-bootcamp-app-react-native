import React,{Component} from 'react';
import { View, Keyboard,Text,Image, AsyncStorage } from 'react-native';
import {
  Container,
  Form,
  Input,SubmitButton,
  List,
  User,
  Name,
  Bio,
  Avatar,
  ProfileButton,
  ProfileButtonText,
  Loader
} from './style';
import Icon from '@expo/vector-icons/MaterialIcons';
import api from '../../services/api';




export default class Main extends Component {
  state = {
    users: [],
    newUser: 'diego3g',
    loader: false
  }
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users')
    if (users) {
      this.setState({users: JSON.parse(users)})
    }
  }
  componentDidUpdate(_, prevState) {
    const {users} = this.state;
   if(prevState.users != users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
   }

 }
  handleAddUser = async () => {
    this.setState({loader: true})
   const { newUser,users} = this.state;
   const response = await api.get(`/users/${newUser}`);

   const data = {
     id: response.data.id,
     name: response.data.name,
     login: response.data.login,
     bio: response.data.bio,
     avatar: response.data.avatar_url
   }
   this.setState({
     users: [...users, data],
     newUser: '',
     loader: false
    })


   Keyboard.dismiss()
  }

  render() {
    const {users, newUser, loader} = this.state;


    return (
      <Container>
        <Form>
        <Input autoCorret={false}
          autoCapitalize = "none"
          placeholder = "Adicionar Usuario"
          value = {newUser}
          onChangeText = {text => this.setState({ newUser: text })}
          returnKeyType = "send"
          onSubmitEditing = {this.handleAddUser}
          />
        <SubmitButton loading={loader} onPress={this.handleAddUser}>
          {loader ? <Loader/> : (

          <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
        </Form>
        <List
        data ={users}
        KeyExtractor={user => user.login}
        renderItem = {({ item }) => (
          <User>
            <Avatar source = {{uri: item.avatar}}></Avatar>
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress = {() => this.props.navigation.navigate('User', {
              user: item
            })}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}

        />

      </Container>

    );
  }
}
Main.navigationOptions = {
  title:'Usuarios',

}
