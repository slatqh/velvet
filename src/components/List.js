import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Loading } from '../components';
import HTMLView from 'react-native-htmlview';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { getDate } from '../helpers';

const h1 = '<h1>';
const h1close = '</h1>';

export default class List extends React.PureComponent {
  opacityStyle = () => {
    const { starred, id, starIconDisable } = this.props;
    if (starIconDisable) {
      return;
    } else {
      const existingArticle = starred.includes(id);
      if (existingArticle) {
        return 1;
      }
      return 0.4;
    }
  };
  render() {
    const {
      title,
      image,
      categoryName,
      onPress,
      date,
      trashIcon,
      deleteArticle,
      starIcon,
      starIconDisable,
      loading,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={
            Platform.OS === 'ios' ? styles.container : styles.containerAndroid
          }>
          <View style={{ flex: 0.7, flexDirection: 'row' }}>
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: image,
                priority: FastImage.priority.normal,
              }}
            />
          </View>
          <View style={{ justifyContent: 'space-around', flex: 0.7 }}>
            <View style={styles.inner}>
              <Text style={styles.categoryTitle}>
                {categoryName ? categoryName() : null}
              </Text>
              {starIconDisable ? (
                <View />
              ) : (
                <TouchableOpacity onPress={starIcon}>
                  <Icon
                    type="font-awesome"
                    name="star"
                    size={10}
                    containerStyle={[
                      styles.starIcon,
                      { opacity: this.opacityStyle() },
                    ]}
                    color="black"
                  />
                </TouchableOpacity>
              )}
              {/* <Text style={styles.minToRead}>7 min read</Text> */}
            </View>
            <HTMLView
              value={`${h1}${title.toUpperCase()}${h1close}`}
              stylesheet={Title.title}
            />
            <Text style={styles.date}>{getDate(date)}</Text>
            {trashIcon ? (
              <Icon
                type="font-awesome"
                onPress={deleteArticle}
                name="trash"
                size={14}
                iconStyle={{ padding: 5 }}
                containerStyle={{ alignSelf: 'flex-end', padding: 10 }}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const Title = {
  title: {
    h1: {
      fontFamily: 'Playfair Display',
      paddingHorizontal: 10,
      paddingTop: 15,
      fontSize: 12,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 130,
    margin: 5,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#ddd',
    shadowColor: '#f000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  containerAndroid: {
    flex: 1,
    height: 130,
    margin: 5,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#ddd',
    // shadowColor: '#f000',
    // shadowOpacity: 0.3,
    // shadowRadius: 1,
    // elevation: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 120,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 10,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryTitle: {
    marginTop: 15,
    alignSelf: 'center',
    letterSpacing: 1,
    paddingLeft: 5,
    maxWidth: 150,
    flexWrap: 'wrap',
    fontSize: 10,
    fontFamily: 'raleway',
  },
  date: {
    opacity: 0.7,
    fontSize: 10,
    fontFamily: 'raleway',
    marginLeft: 10,
    marginBottom: 10,
  },
  starIcon: {
    marginTop: 10,
    marginRight: 7,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 20,
  },
});
