import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Animated,
  RefreshControl,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { addStarredArticle, deleteStarred } from '../Auth/actions';
import { NavigationActions, StackActions } from 'react-navigation';
import { List, Card, Logo, Search, Loading } from '../../components';
import { loadArticles, searchValue } from './action';
import { currentDate } from '../../helpers';
import { styles } from './styles';

const { height, width } = Dimensions.get('window');
const CARD_HEIGHT = Platform.OS === 'android' ? (height / 2) + 30 : (height / 2) + 50;
const CARD_MIN_HEIGHT = Platform.OS === 'android' ? (height / 3) : 300;

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, loadArticles }) => {
    const search = navigation.getParam('search');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    return {
      headerTitle: () => (!search ? <Search value={(e) => navigation.state.params.headerSearch(e)} /> :
                          <Logo onPress={() =>  navigation.dispatch(resetAction)}/>),
      headerStyle: { borderBottomColor: 'transparent', opacity: 1 },
      headerLeft: <Icon
        containerStyle={{ margin: 10 }}
        onPress={() => navigation.openDrawer()}
        name='menu'
      />,
      headerRight: !search ?
        <Icon
          containerStyle={{ margin: 10 }}
          size={25}
          onPress={() => {
            navigation.setParams({ search: !search });
          }
          }
          name='close'
        />
        : <Icon
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.setParams({ search: !search })}
          name='search'
        />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      closeSearch: true,
    };
    this.scrollY = new Animated.Value(0);
  }
  componentWillMount() {
    this.props.navigation.setParams({
      headerSearch: this.props.searchValue,
      search: true,
      name: "WHAT'S NEW",
    });
  }
  async componentDidMount() {
    await this.props.loadArticles();
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.ScrollList.scrollTo({ animated: false, x: 0, y: 0 });
    }
    return;
  }
  componentWillUnmount() {
    clearInterval(this.props.loadArticles());
    this.scrollY.removeListener();
  }

  // component function
 getCategoryName =() => {
   if (this.props.navigation.state.params === undefined) {
     return "WHAT'S NEW";
   }
   return this.props.navigation.state.params.name;
 }

 _starredArticle(id) {
   const { starred } = this.props;
   const existingArticle = starred.includes(id);
   if (existingArticle) {
     const articleId = this.props.starred.filter(i => i !== id);
     return this.props.deleteStarred(articleId);
   }
   this.updateUserStarred(id);
   return false;
 }
 async updateUserStarred(id) {
   const arr = [...this.props.starred, id];
   this.props.addStarredArticle(arr);
 }
 _renderTopCards = ({ item }) =>
   (
     <Card
       starred={this.props.starred}
       id={item.id}
       date={item.date}
       navigation={this.props.navigation}
       categoryName={this.getCategoryName}
       onPress={() => this.props.navigation.navigate('Article', { id: item._id })}
       title={this.props.articles ? item.title.rendered : item.title}
       image={item.jetpack_featured_media_url}
       loading={this.state.data}
       starIcon={() => this._starredArticle(item.id)}
     />
   );
 render() {
   const search = this.props.navigation.getParam('search');
   const { articles } = this.props;

   const heightTranslate = this.scrollY.interpolate({
     inputRange: [0, 100],
     outputRange: [CARD_HEIGHT, CARD_MIN_HEIGHT],
     extrapolate: 'clamp',
     useNativeDriver: true,
   });

   const headerStyle = {
     transform: [
     ],
     height: heightTranslate,
   };
     //  handling a search button
   if (this.props.userSearch && !search) {
     return (<ScrollView>
       {
         this.props.loading ? <Loading /> : this.props.search.map(i => (<View key={i.id}><List
           onPress={() => {
             this.props.navigation.navigate('Article', { id: i._id });
           }
           }
           starIcon={() => this._starredArticle(i.id)}
           categoryName={this.getCategoryName}
           starred={this.props.starred}
           id={i.id}
           date={i.date}
           title={i.title}
           image={i.jetpack_featured_media_url}
         /></View>))
       }
     </ScrollView>);
   }
   //  main screen view
   return (
     <View style={[styles.container]}>
       <Text style={styles.date}> {currentDate()}</Text>
       <Text style={styles.title}> { this.getCategoryName()}</Text>
       <View style={{ flex: 1 }}>
         <Animated.View style={[styles.header, headerStyle, { backgroundColor: 'transparent' }]}>
           <ScrollView
             horizontal
             bounces={false}
             showsHorizontalScrollIndicator={false}
             scrollEventThrottle={16}
             decelerationRate={0.8}
             ref={(scroll) => {
               this.ScrollList = scroll;
             }}
           >
             {/* rendering Cards components  */}
             <FlatList
               horizontal
               data={this.props.data.slice(0, 10)}
               keyExtractor={item => item._id}
               renderItem={this._renderTopCards}
             />

           </ScrollView>
         </Animated.View>
         <View style={[styles.listScroll]}>
           <ScrollView
             bounces
             showsVerticalScrollIndicator={false}
             scrollEventThrottle={10}
             decelerationRate={0.5}

             onScroll={
               Animated.event(
                 [
                   { nativeEvent: { contentOffset: { y: this.scrollY } } },
                 ],
               )
             }
             refreshControl={
               <RefreshControl
                 refreshing={this.state.refreshing}
               />
             }
           >
             {
               this.props.loading ? <Loading /> :
                 this.props.data.slice(10).map((i) => (
                   <View key={i._id}>
                     <List
                      starIcon={() => this._starredArticle(i.id)}
                      starred={this.props.starred}
                      id={i.id}
                       onPress={() => this.props.navigation.navigate('Article', { id: i._id })}
                       categoryName={this.getCategoryName}
                       date={i.date}
                       title={articles ? i.title.rendered : i.title}
                       image={i.jetpack_featured_media_url}
                     />
                   </View>

                 ))
             }
           </ScrollView>
         </View>
       </View>
     </View>
   );
 }
}
const mapStateToProps = ({ Home, Auth }) => {
  const { data, loading, articles, search, userSearch } = Home;
  const { starred } = Auth;
  return { data, loading, articles, search, userSearch, starred };
};
export default connect(mapStateToProps, { loadArticles, searchValue, addStarredArticle, deleteStarred })(HomeScreen);

