import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { deleteStarred, fetchingStarredArticles } from '../screens/Auth/actions';
import { List } from '../components';

class WishList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'WISHLIST',
    headerMode: 'screen',
    headerTitleStyle: { fontSize: 14, color: 'black', fontFamily: 'Raleway', letterSpacing: 2 },
    headerLeft: <Icon
      containerStyle={{ margin: 10 }}
      onPress={() => navigation.openDrawer()}
      name='menu'
    />,
  })
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      articleId: [],
    };
  }
  componentWillMount() {
    this.props.fetchingStarredArticles();
  }
  componentWillUnmount() {
    clearInterval(this.props.fetchingStarredArticles());
  }
  async deleteArticle(index, id) {
    const articleId = this.props.starred.filter(i => i !== id);
    await this.props.deleteStarred(articleId);
    await this.props.fetchingStarredArticles();
  }
  render() {
    console.log(this.props.starredArticles);
    return (
      this.props.starred.length > 0 ?
        <ScrollView style={styles.container}>
          {
            this.props.starredArticles.map((i, index) => (
              <View key={i.id}>
                <List
                  onPress={() => this.props.navigation.navigate('Article', { id: i._id })}
                  categoryName={this.getCategoryName}
                  trashIcon
                  date={i.date}
                  title={i.title}
                  image={i.jetpack_featured_media_url}
                  deleteArticle={() => this.deleteArticle(index, i.id)}
                />
              </View>

            ))
          }
        </ScrollView> :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'raleway', fontSize: 24, opacity: 0.7 }}>Wishlist list is empty</Text>
        </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  title: {
    color: 'red',
    fontFamily: 'raleway',
    fontSize: 19,
  },
};
const mapStateToProps = ({ Auth }) => {
  const { starred, starredArticles, loading } = Auth;
  return { starred, starredArticles, loading };
};
export default connect(mapStateToProps, { deleteStarred, fetchingStarredArticles })(WishList);
