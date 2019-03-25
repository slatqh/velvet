import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { getDate } from '../helpers';

const h1 = '<h1>';
const h1close = '</h1>';
export const List = ({ title, image, categoryName, onPress, date, trashIcon, deleteArticle }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
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
      <View style={{ justifyContent: 'space-around', flex: 1 }}>
        <View style={styles.inner}>
          <Text style={styles.categoryTitle}>{categoryName ? categoryName() : null}</Text>
          {/* <Text style={styles.minToRead}>7 min read</Text> */}
        </View>
        <HTMLView
          value={`${h1}${title.toUpperCase()}${h1close}`}
          stylesheet={styles.title}
        />
        <Text style={styles.minToRead}>{getDate(date)}</Text>
        {
          trashIcon ? <Icon
            type='font-awesome'
            onPress={deleteArticle}
            name='trash'
            size={14}
            iconStyle={{ padding: 5 }}
            containerStyle={{ alignSelf: 'flex-end', padding: 10 }}
          /> : null
        }
      </View>
    </View>
  </TouchableOpacity>
);

const styles = {
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
    letterSpacing: 1,
    paddingLeft: 5,
    maxWidth: 150,
    flexWrap: 'wrap',
    fontSize: 10,
    fontFamily: 'raleway',
  },
  title: {
    h1: {
      fontFamily: 'Playfair Display',
      paddingHorizontal: 10,
      paddingTop: 15,
      fontSize: 12,
    },
  },
  minToRead: {
    opacity: 0.7,
    fontSize: 10,
    fontFamily: 'raleway',
    paddingRight: 10,
  },

};
