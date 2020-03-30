import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {NativeModules} from 'react-native';
let contentProvider = NativeModules.ContentProvider;

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

  function CardView({id, title, selected, onSelect}) {
    return (
      <View style={{width: 200, height: 200, flexDirection: 'row', margin: 24}}>
        <Image
          style={{width: 200, height: 200, position: 'absolute'}}
          source={{uri: 'https://www.dike.lib.ia.us/images/sample-1.jpg/image'}}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignSelf: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 20, margin: 6}}>{title}</Text>
          <Text style={{color: 'white', margin: 6}}>{'Subtitle'}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={feed}
        renderItem={({item}) => <CardView id={item._id} title={item.title} />}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({});
