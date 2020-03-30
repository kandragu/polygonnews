import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {NativeModules} from 'react-native';
let contentProvider = NativeModules.ContentProvider;
let DomParser = require('react-native-html-parser').DOMParser;
const screenWidth = Dimensions.get('window').width;

let moment = require('moment');

export default () => {
  let [loading, setLoading] = useState(true);
  let [feed, setFeed] = useState([]);

  useEffect(() => {
    setLoading(true);
    let url =
      'content://com.bestgoodmove.polygondownloader.workermanager.provider.DataProvider/t1';
    contentProvider.query(
      url,
      msg => console.log(msg),
      arr => {
        console.log('data', arr);
        setFeed(arr);
      },
    );
  }, []);

  function CardView({id, title, content, selected, onSelect}) {
    // debugger;
    let doc = new DomParser().parseFromString(content, 'text/html');
    let imgUrl = '';
    let img = doc.getElementsByTagName('img');
    if (img) imgUrl = img[0].attributes[1].value;
    let date = moment('2020-03-29T16:40:01-04:00').format('DD MMM YYYY');
    console.log(date);
    return (
      <View
        style={{
          width: screenWidth,
          height: 300,
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 54,
        }}>
        <View
          style={{
            flex: 1,
            width: screenWidth,
            backgroundColor: 'rgba(1, 1, 1,1)',
          }}>
          <Text style={{color: 'red', margin: 6, alignSelf: 'flex-end'}}>
            {date}
          </Text>
        </View>
        <Image
          style={{flex: 3, width: screenWidth, height: 200}}
          source={{uri: imgUrl}}
        />
        <View
          style={{
            flex: 2,
            backgroundColor: 'rgba(1, 1, 1,1)',
            alignSelf: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 20, margin: 6}}>{title}</Text>
          <Text style={{color: 'yellow', margin: 6}}>{'#Subtitle'}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={feed}
        renderItem={({item}) => (
          <CardView id={item.id} title={item.title} content={item.content} />
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({});
