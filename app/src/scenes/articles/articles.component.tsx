import React from 'react';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandTabBar } from '../../components/brand-tab-bar.component';
import { ArrowIosBackIcon, GridIcon, ListIcon } from '../../components/icons';
import { LayoutList } from '../../components/layout-list.component';
import { data } from './data';

export const ArticlesScreen = ({ navigation, state }): React.ReactElement => {

  const onTabSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  const onItemPress = (index: number): void => {
    navigation.navigate(data[index].route);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout insets='top'>
      <TopNavigation
        title='Articles'
        leftControl={renderBackAction()}
      />
       <Divider/>
      <LayoutList
        data={data}
        onItemPress={onItemPress}
      />
    </SafeAreaLayout>
  );
};
