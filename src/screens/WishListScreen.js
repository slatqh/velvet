import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Overlay } from 'react-native-elements';
import {
  deleteStarred,
  fetchingStarredArticles,
} from '../screens/Auth/actions';
import { List, Loading } from '../components';

class WishList extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'WISHLIST',
    headerMode: 'screen',
    headerTitleStyle: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'Raleway-Regular',
      fontWeight: '100',
      // letterSpacing: 2,
    },
    headerLeft: (
      <Icon
        containerStyle={{ margin: 10 }}
        onPress={() => navigation.openDrawer()}
        name="menu"
      />
    ),
  });
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      articleId: [],
      deleted: false,
    };
  }
  UNSAFE_componentWillUpdate(prevProps) {
    console.log(prevProps.starredArticles);
    if (prevProps.starredArticles !== this.props.starredArticles) {
      return true;
    }
    return false;
  }
  componentDidMount() {
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
    return this.props.starredArticles.length > 0 ? (
      <ScrollView style={styles.container}>
        <Overlay
          isVisible={this.props.loading}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="transparent"
          width="auto"
          height="auto">
          <ActivityIndicator />
        </Overlay>
        {/* <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View> */}
        {this.props.starredArticles.map((i, index) => (
          <View key={i.id}>
            <List
              starIconDisable
              loading={this.props.loading}
              onPress={() =>
                this.props.navigation.navigate('Article', { id: i._id })
              }
              categoryName={this.getCategoryName}
              trashIcon
              date={i.date}
              title={i.title}
              image={i.jetpack_featured_media_url}
              deleteArticle={() => this.deleteArticle(index, i.id)}
            />
          </View>
        ))}
      </ScrollView>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{ fontFamily: 'Raleway-Regular', fontSize: 24, opacity: 0.7 }}>
          Wishlist is empty
        </Text>
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
    fontFamily: 'Raleway-Regular',
    fontSize: 19,
  },
};
const mapStateToProps = ({ Auth, Article }) => {
  const { starred, starredArticles, loading } = Auth;
  return { starred, starredArticles, loading };
};
export default connect(
  mapStateToProps,
  { deleteStarred, fetchingStarredArticles },
)(WishList);
