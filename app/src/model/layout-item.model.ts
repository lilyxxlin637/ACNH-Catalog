import { ImageSourcePropType } from 'react-native';

export interface LayoutItem {
  Name: string;
  Description: string;
  IconFilename: ImageSourcePropType;
  Sell: number;
  EnglishName: string;
  Size: string;
  Color1: string;
  Color2: string;
  HHABasePoints: number;

  InternalID: number;

  CritterpediaFilename: string;
  FurnitureFilename: string;
}
