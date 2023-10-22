const fs = require("fs");
const { DICTIONARY_PATH, TRANSLATIONS_PATH } = require("./constants.cjs");
const { prepareTranslationsAndAbbreviations } = require("./prepare.cjs");
const { parseAbbreviations, parseTranslations } = require("./parse.cjs");

const data = fs.readFileSync(DICTIONARY_PATH, "utf8");
let dictionary = data.toString();
const { dictionaryTranslations, dictionaryAbbreviations } =
  prepareTranslationsAndAbbreviations(dictionary);

const abbreviationsMap = parseAbbreviations(dictionaryAbbreviations);
const translations = parseTranslations(
  dictionaryTranslations,
  abbreviationsMap
);

fs.writeFileSync(
  TRANSLATIONS_PATH,
  JSON.stringify(translations, null, 4),
  "utf8"
);

/* 
КОСЯКИ СЛОВАРЯ

АББРЕВИАТУРЫ
- Нет пробела между аббреиатурой и расшифровкой [APCUGAssociation of PC Users Groups]
- Аббревиатура маленькими буквами [bp battery-powered]

ПЕРЕВОДЫ
- Нет пробела между английскими словами и русскими
- Строка может начинаться с английского слова, которое является продолжением русского перевода с предыдущей строки. 
  В этом случае не понятно, новое это слово или продолжение
- Есть несколько вариантов перевода [ускоренный графический порт]
*/
