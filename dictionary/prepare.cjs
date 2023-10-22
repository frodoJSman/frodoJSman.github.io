const { ENGLISH_ALPHABET } = require("./constants.cjs");

function prepareTranslationsAndAbbreviations(dictionary) {
  // убрать разделение букв типа "-A-"
  ENGLISH_ALPHABET.forEach((char) => {
    dictionary = dictionary.replaceAll(`- ${char} -`, "");
  });

  // убрать нумерацию переводов тиа "1."
  [...Array(25).keys()].reverse().forEach((num) => {
    dictionary = dictionary.replaceAll(`${num}.`, "");
  });

  // заменить множественные пробелы на одинарные
  dictionary = dictionary
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => line.replaceAll(/\s\s+/g, " ").trim())
    .join("\n");

  let [dictionaryTranslations, dictionaryAbbreviations] =
    dictionary.split("Сокращения");

  // убрать пустые строки
  dictionaryTranslations = dictionaryTranslations
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .join("\n");

  dictionaryAbbreviations = dictionaryAbbreviations
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .join("\n");

  return { dictionaryTranslations, dictionaryAbbreviations };
}

module.exports = { prepareTranslationsAndAbbreviations };
