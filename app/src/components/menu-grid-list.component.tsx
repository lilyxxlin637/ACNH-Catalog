import React from 'react';
import { Dimensions, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, List, ListElement, ListItemElement, ListItem, ListProps, Text } from '@ui-kitten/components';

import { MenuItem } from '../model/menu-item.model';
import * as Progress from 'react-native-progress';

export interface MenuGridListProps extends Omit<ListProps, 'renderItem'> {
  data: MenuItem[];
  onItemPress: (index: number) => void;
}

export const MenuGridList = (props: MenuGridListProps): ListElement => {

  const { contentContainerStyle, onItemPress, ...listProps } = props;

  const renderItem = (info: ListRenderItemInfo<MenuItem>): ListItemElement => (
    <ListItem
      style={styles.item}
      onPress={() => props.onItemPress(info.index)}>
      <View
       style={{flexDirection: 'row', marginBottom: 4}}>
        {info.item.icon(styles.itemImage)}
        <Text
          style={styles.itemTitle}
          category='s2'>
          {info.item.title}
        </Text>
        <Text
          style={styles.itemTitle}
          category='s2'>
          (30/1100)
        </Text>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
      <Progress.Bar
         progress={0.3}
         height={15}
         borderColor={'#319400'}
         color={'#319400'}/>
       <View
          style={{
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Text
           category='s3' style={{fontSize: 10}}>
            {(30).toFixed(2)}%
          </Text>
        </View>
        </View>
    </ListItem>
  );


  return (
    <List
      {...listProps}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  item: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 4,
    flexDirection: 'column',
    maxWidth: Dimensions.get('window').width / 2 - (4 * 4 - 6),
    borderColor: '#d1edc2',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#edf5e9',
  },
  itemImage: {
    alignSelf: 'center',
    width: 32,
    height: 32,
    marginRight: 8,
  },
  itemTitle: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginRight: 2,
  },
});
