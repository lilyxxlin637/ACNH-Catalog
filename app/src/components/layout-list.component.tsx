import React from 'react';
import { ListRenderItemInfo, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, CardElement, List, ListElement, ListProps, Text, Button, ListItem } from '@ui-kitten/components';
import { LayoutItem } from '../model/layout-item.model';
import { inlineStyles } from 'react-native-svg';

export interface LayoutListProps extends Omit<ListProps, 'renderItem'> {
  data: LayoutItem[];
  onItemPress: (index: number) => void;
}

export type LayoutListElement = React.ReactElement<LayoutListProps>;


export const LayoutList = (props: LayoutListProps): ListElement => {
  const [textValue, setTextValue] = React.useState('拥有');
  const [, forceRender] = React.useReducer((s) => s + 1, 0);

  const onPress = (item: LayoutItem): void => {
    item.isOwned = true;
    setTextValue('已有');
    forceRender();
  };

  const { contentContainerStyle, onItemPress, ...listProps } = props;

  const renderItem = (info: ListRenderItemInfo<LayoutItem>): ListElement => (
    <ListItem
      style={styles.itemContainer}
      onPress={() => onItemPress(info.index)}>
      <View
        style={styles.item}>
        <View style={styles.leftContainer}>
        <Image source={info.item.IconFilename}
          style={styles.itemImage}/>
        <Text
            style={styles.itemName}
            category='s1'>
            {info.item.Name}
          </Text>
        </View>
        <View style={styles.rightContainer}>
        <Text
            category='s1'
            style={styles.itemSell}>
            {info.item.Sell.toString()}
          </Text>
          <TouchableOpacity onPress={() => onPress(info.item)} style={styles.itemButton}>
            <Text style={styles.itemButtonText}>{info.item.isOwned ? '已有' : '拥有'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ListItem>
  );

  React.useEffect(
    () => {
      // your refresh code
    },
    [textValue],
  );

  return (
    <List
      {...listProps}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    textAlignVertical: 'center',
    padding: 0,
  },
  itemContainer: {
    marginVertical: 0,
    marginHorizontal: 2,
    padding: 0,
  },
  itemDescription: {
    marginTop: 4,
  },
  itemSell: {
    borderRadius: 10,
    backgroundColor: '#f7c82a',
    color: '#FFFACD',
    paddingHorizontal: 8,
    paddingVertical: 0,
    margin: 0,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 0,
  },
  itemImage: {
    height: 40,
    resizeMode: 'contain',
    padding: 0,
    margin: 0,
  },
  itemButton: {
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 0,
    marginLeft: 10,
    marginHorizontal: 0,
    marginRight: 2,
    height: 20,
    backgroundColor: '#05c147',
    borderWidth: 0,
  },
  itemButtonText: {
    color: '#ffffff',
    fontSize: 12,
    textAlignVertical: 'center',
  },
});
