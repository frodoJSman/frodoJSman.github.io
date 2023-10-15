import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSLATIONS_FILENAME = path.resolve(__dirname, "translations.txt");
const ABBREVIATIONS_FILENAME = path.resolve(__dirname, "abbreviations.txt");
const DICTIONARY_PATH = path.resolve(__dirname, "dictionary.txt");
const ENGLISH_ALPHABET = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((char) => char.toUpperCase());

try {
  const data = fs.readFileSync(DICTIONARY_PATH, "utf8");
  let dictionary = data.toString();

  // убрать разделение букв типа "-A-"
  ENGLISH_ALPHABET.forEach((char) => {
    dictionary = dictionary.replaceAll(`- ${char} -`, "");
  });

  // убрать нумерацию переводов тиа "1."
  [...Array(20).keys()].forEach((num) => {
    dictionary = dictionary.replaceAll(`${num}.`, "");
  });

  // заменить множественные пробелы на одинарные
  dictionary = dictionary
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => line.replaceAll(/\s\s+/g, " "))
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

  fs.writeFileSync(TRANSLATIONS_FILENAME, dictionaryTranslations);
  fs.writeFileSync(ABBREVIATIONS_FILENAME, dictionaryAbbreviations);
} catch (e) {
  console.log("Error:", e);
}
