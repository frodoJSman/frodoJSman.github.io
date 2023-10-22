const path = require("path");

const TRANSLATIONS_PATH = path.resolve(__dirname, "../translations.json");
const DICTIONARY_PATH = path.resolve(__dirname, "dictionary.txt");

const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const RUSSIAN_ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const RUSSIAN_LANGUAGE_CODE = "ru";
const ENGLISH_LANGUAGE_CODE = "en";

module.exports = {
  TRANSLATIONS_PATH,
  DICTIONARY_PATH,
  ENGLISH_ALPHABET,
  RUSSIAN_ALPHABET,
  RUSSIAN_LANGUAGE_CODE,
  ENGLISH_LANGUAGE_CODE,
};
