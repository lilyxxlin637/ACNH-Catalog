import React from 'react';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandTabBar } from '../../components/brand-tab-bar.component';
import { ArrowIosBackIcon, GridIcon, ListIcon, CameraIcon } from '../../components/icons';
import { LayoutList } from '../../components/layout-list.component';
import { data } from './data';

export const ArticlesScreen = ({ navigation, state }): React.ReactElement => {

  const onTabSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  const onItemPress = (index: number): void => {
    navigation.navigate(data[index].route, {index: index, data: data});
  };

  const renderCameraAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={CameraIcon}
      onPress={navigation.goBack}
    />
  );

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
        rightControls={renderCameraAction()}
      />
       <Divider/>
      <LayoutList
        data={data}
        onItemPress={onItemPress}
      />
    </SafeAreaLayout>
  );
};
