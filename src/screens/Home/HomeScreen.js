import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Animated,
  RefreshControl,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { addStarredArticle } from '../Auth/actions';
import { List, Card, Logo, SearchBar, Loading } from '../../components';
import { loadArticles, searchValue } from './action';
import { currentDate } from '../../helpers';
import { styles } from './styles';

const { height } = Dimensions.get('window');
const CARD_HEIGHT = Platform.OS === 'android' ? (height / 2) - 50 : (height / 2) + 50;

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const search = navigation.getParam('search');
    return {
      headerTitle: () => (!search ? <SearchBar value={(e) => navigation.state.params.headerSearch(e)} /> : <Logo />),
      headerTitleStyle: { flex: 1 },
      headerStyle: { borderBottomColor: 'transparent', opacity: 1 },
      headerLeft: <Icon
        containerStyle={{ margin: 10 }}
        onPress={() => navigation.openDrawer()}
        name='menu'
      />,
      headerRight: !search ? <Icon
        containerStyle={{ margin: 10 }}
        size={25}
        onPress={() => {
          navigation.setParams({ search: !search });
        }
        }
        name='close'
      /> : <Icon
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

  async componentDidMount() {
    await this.props.loadArticles();
    this.setState({ loading: true });
    this.props.navigation.setParams({
      headerSearch: this.props.searchValue,
      search: true,
      name: "WHAT'S NEW",
    });
  }
  componentWillUnmount() {
    clearInterval(this.props.loadArticles());
    this.scrollY.removeListener();
  }
 getCategoryName =() => {
   if (this.props.navigation.state.params === undefined) {
     return "WHAT'S NEW";
   }
   return this.props.navigation.state.params.name;
 }
 _onRefresh() {
   this.setState({ refreshing: true });
 }
 _starredArticle(id) {
   const { starred } = this.props;
   const existingArticle = starred.includes(id);
   if (existingArticle) {
     return Alert.alert('Article already added to wishlist');
   }
   this.updateUserStarred(id);
   return false;
 }
 async updateUserStarred(id) {
   const arr = [...this.props.starred, id];
   this.props.addStarredArticle(arr);
 }
 render() {
   const search = this.props.navigation.getParam('search');
   const { navigation, articles } = this.props;

   const heightTranslate = this.scrollY.interpolate({
     inputRange: [0, 1],
     outputRange: [CARD_HEIGHT, 300],
     extrapolate: 'clamp',
   });
   const readButton = this.scrollY.interpolate({
     inputRange: [0, 1],
     outputRange: [1, 0],
     extrapolate: 'clamp',
   });

   const readButtonStyle = {
     opacity: readButton,
   };
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
           categoryName={this.getCategoryName}
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
         <Animated.View style={[styles.header, headerStyle]}>
           <ScrollView
             horizontal
             bounces={false}
             showsHorizontalScrollIndicator={false}
           >
             {/* rendering Cards components  */}
             {
               this.props.data.slice(0, 10).map(i => (
                 <View key={i._id}>
                   <Card
                     starred={this.props.starred}
                     id={i.id}
                     date={i.date}
                     navigation={navigation}
                     categoryName={this.getCategoryName}
                     onPress={() => this.props.navigation.navigate('Article', { id: i._id })}
                     title={articles ? i.title.rendered : i.title}
                     image={i.jetpack_featured_media_url}
                     loading={this.state.data}
                     starIcon={() => this._starredArticle(i.id)}
                     showReadButton={readButtonStyle}
                   />
                 </View>
               ))
             }

           </ScrollView>
         </Animated.View>
         <View style={{ flex: 2 }}>
           <ScrollView
             bounces
             showsVerticalScrollIndicator={false}
             scrollEventThrottle={16}
             decelerationRate={0.5}
             contentOffset={
               {
                 y: 0,
               }
             }
             contentInset={{
               top: 0,
             }}
             onScroll={
               Animated.event(
                 [
                   { nativeEvent: { contentOffset: { y: this.scrollY } } },
                 ]
               )
             }
             refreshControl={
               <RefreshControl
                 refreshing={this.state.refreshing}
                 onRefresh={() => this._onRefresh()}
               />
             }
           >
             {
               this.props.loading ? <Loading /> :
                 this.props.data.slice(10).map((i) => (
                   <View key={i._id}>
                     <List
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
const mapStateToProps = ({ Posts, Auth }) => {
  const { data, loading, articles, search, userSearch } = Posts;
  const { starred } = Auth;
  return { data, loading, articles, search, userSearch, starred };
};
export default connect(mapStateToProps, { loadArticles, searchValue, addStarredArticle })(HomeScreen);

