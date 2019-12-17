import React from 'react';

import api from '../../services/api';

 import {
   Container,
   Header,
   Avatar,
    Bio,
    Name,
    OwnerAvatar,
    Starred,Info,
    Title,
    Author
    ,Stars,
    Loader, LoaderContainer,FavoriteContainer, FavoriteText } from './styles';

export default class User extends React.Component {
  state = {
    dados : [],
    loader: false
  }
  static navigationOptions = ({navigation}) => ({

    title: navigation.getParam('user').name
  })
  async componentDidMount() {
    this.setState({loader: true})
    const {navigation} = this.props;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({dados:  response.data, loader: false})

  }
 render() {
   const {navigation} = this.props;
   console.log(this.state.dados);

  const user = navigation.getParam('user');

   return (
    <Container>
      <Header>
        <Avatar source = {{uri: user.avatar}}></Avatar>
        <Name>{user.name}</Name>
        <Bio>{user.bio ? user.bio : 'Sem Bio'}</Bio>
      </Header>
      <>
      <FavoriteContainer>
        <FavoriteText>Favorites</FavoriteText>
      </FavoriteContainer>
      {this.state.loader ? <LoaderContainer>
        <Loader/>
      </LoaderContainer>: (
        <Stars
        data={this.state.dados}
        keyExtractor = {start => String(start.id)}
        renderItem = {({item}) => (

          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}}/>
            <Info>
              <Title>{String(item.name)}</Title>
              <Author>{String(item.owner.login)}</Author>
            </Info>
          </Starred>
        )}
        />

      )}
      </>
    </Container>
   );

 }

}
