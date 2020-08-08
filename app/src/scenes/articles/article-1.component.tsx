import React from 'react';
import { StyleSheet, View, Image, ListView } from 'react-native';
import { TopNavigation, TopNavigationAction, Layout, Divider, Text, Button, List, ListItem } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/articles/article-1';
import { AuthData } from './data';
import item from 'src/layouts/articles/item';

export const Article1Screen = ({ navigation, route }): React.ReactElement => {

  const {params} = route;
  const index = params ? params.index : null;
  const data: AuthData[] = params ? params.data : null;

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderItemAccessory = (props) => (
    <Text selectable style={{flexWrap: 'wrap'}}>{props}</Text>
  );

  const renderDiescriptionAccessory = (props) => (
    <Text selectable style={{flexWrap: 'wrap', flex: 3}}>{props}</Text>
  );

  // tslint:disable-next-line: no-shadowed-variable
  const renderItem = ({ item, index }) => {
    if (item.title === '博物馆描述') {
      return (
        <ListItem
          style={styles.listItem}
          title={item.title}
          accessory={() => renderDiescriptionAccessory(item.value)}
        />
      );
    } else {
      return (
        <ListItem
          style={styles.listItem}
          title={item.title}
          accessory={() => renderItemAccessory(item.value)}
        />
      );
    }
};

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title={data[index].Name}
        leftControl={renderBackAction()}
      />
      <Layout>
        <Layout style={styles.itemLayout}>
          <Image
            style={styles.itemIamge}
            source={data[index].IconFilename}>
          </Image>
        </Layout>
        <List
          style={styles.listStyle}
          data={
            [
              {title: '英文名', value: data[index].EnglishName},
              {title: '快乐家积分', value: data[index].HHABasePoints},
              {title: '颜色1', value: data[index].Color1},
              {title: '颜色2', value: data[index].Color2},
              {title: '尺寸', value: data[index].Size},
              {title: '博物馆描述', value: data[index].Description},
            ]
          }
          renderItem={renderItem}>
        </List>
      </Layout>
    </SafeAreaLayout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eafde5',
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#a8deba',
  },
  itemLayout: {
    borderColor: '#bbbbbb',
    borderTopWidth: 1,
    marginHorizontal: 2,
    backgroundColor: '#eafde5',
  },
  itemIamge: {
    alignSelf: 'center',
    width: 96,
    height: 96,
  },
  headerContainer: {
    alignItems: 'center',
    minHeight: 256,
    paddingVertical: 24,
  },
  listStyle: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderColor: '#5eba7d',
    borderTopWidth: 7,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    margin: 5,
  },
  headerTitle: {
    textAlign: 'center',
    marginVertical: 24,
    zIndex: 1,
  },
  headerDescription: {
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  authoringInfoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
