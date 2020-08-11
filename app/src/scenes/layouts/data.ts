import React from 'react';
import { ImageStyle } from 'react-native';
import { ThemedIcon } from '../../components/themed-icon.component';
import {
  AssetArticlesDarkIcon,
  AssetArticlesIcon,
  AssetFishIcon,
  AssetInsectsIcon,
  AssetFossilsIcon,
  AssetDiyIcon,
  AssetFurnitureIcon,
  AssetClothesIcon,
  AssetAuthDarkIcon,
  AssetAuthIcon,
  AssetDashboardsDarkIcon,
  AssetDashboardsIcon,
  AssetEcommerceDarkIcon,
  AssetEcommerceIcon,
  AssetMessagingDarkIcon,
  AssetMessagingIcon,
  AssetSocialDarkIcon,
  AssetSocialIcon,
  CameraIcon,
} from '../../components/icons';

import { MenuItem } from '../../model/menu-item.model';

export interface LayoutData extends MenuItem {
  route: string;
}

export const data: LayoutData[] = [
  {
    title: '鱼类',
    route: 'Fish',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetFishIcon, dark: AssetArticlesDarkIcon },
      );
    },
  },
  {
    title: '虫类',
    route: 'Insects',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetInsectsIcon, dark: AssetArticlesDarkIcon },
      );
    },
  },
  {
    title: '化石',
    route: 'Fossils',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetFossilsIcon, dark: AssetArticlesDarkIcon },
      );
    },
  },
  {
    title: 'DIY',
    route: 'DIY',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetDiyIcon, dark: AssetArticlesDarkIcon },
      );
    },
  },
  {
    title: '家具',
    route: 'Furnitures',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetFurnitureIcon, dark: AssetArticlesDarkIcon },
      );
    },
  },
  {
    title: '服装',
    route: 'Clothes',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetClothesIcon, dark: AssetArticlesDarkIcon },
      );
    },
  },
  {
    title: 'Dashboards',
    route: 'Dashboards',
    icon: (style: ImageStyle) => {
      return React.createElement(
        ThemedIcon,
        { ...style, light: AssetDashboardsIcon, dark: AssetDashboardsDarkIcon },
      );
    },
  },

];
