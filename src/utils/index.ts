import { Categories, Kana, Types } from "../data/kana";

export interface KanaType {
  name: Types;
  kana: Kana[];
}

export interface KanaCategroy {
  name: Categories;
  kana: Kana[];
}

export function getKanaByType(kana: Kana[]): KanaType[] {
  const kanaTypes: KanaType[] = [];

  const uniqueTypes = kana
    .map((aKana) => aKana.type)
    .filter((type, index, self) => self.indexOf(type) === index);

  uniqueTypes.forEach((type) => {
    kanaTypes.push({
      name: type,
      kana: kana.filter((aKana) => (aKana.type === type ? true : false)),
    });
  });

  return kanaTypes;
}

export function getKanaByCategroy(kana: Kana[]): KanaCategroy[] {
  const KanaCategries: KanaCategroy[] = [];

  const uniqueCategories = kana
    .map((aKana) => aKana.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  uniqueCategories.forEach((category) => {
    KanaCategries.push({
      name: category,
      kana: kana.filter((aKana) =>
        aKana.category === category ? true : false
      ),
    });
  });

  return KanaCategries;
}
