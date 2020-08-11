import { LayoutItem } from '../model/layout-item.model';

export interface AuthData extends LayoutItem {
  route: string;
}

export const data: AuthData[] = [
    {
      Name: 'Camera',
      EnglishName: 'anchovy',
      Sell: 200,
      HHABasePoints: 71,
      Size: '1x1',
      InternalID: 4201,
      IconFilename: require('../../images/Fish/Fish81.png'),
      CritterpediaFilename: 'FishAntyobi',
      FurnitureFilename: 'FtrFishAntyobi',
      Description: 'There are more than 140 species of anchovy, but they do all have some things in common. They are small and feed by simply swimming with their mouths open to filter food particles from the sea. (In my sleepier moments, I sometimes wish I could do that...)',
      Color1: '',
      Color2: '',
      route: 'Camera',
    }
]