const {
  ENGLISH_ALPHABET,
  RUSSIAN_ALPHABET,
  RUSSIAN_LANGUAGE_CODE,
  ENGLISH_LANGUAGE_CODE,
} = require("./constants.cjs");

function parseAbbreviations(dictionaryAbbreviations) {
  // Переносим аббревиатуры на несколько строк в одну
  const dictionaryAbbreviationLines = dictionaryAbbreviations.split(/\r?\n/);

  const dictionaryCompleteAbbreviationLines = [];
  let completeAbbreviationLine;

  for (let i = 0; i < dictionaryAbbreviationLines.length; i++) {
    if (completeAbbreviationLine === undefined) {
      completeAbbreviationLine = dictionaryAbbreviationLines[i];
    } else {
      completeAbbreviationLine = `${completeAbbreviationLine} ${dictionaryAbbreviationLines[i]}`;
    }

    // если вторая буква в строке маленькая, то это продолжение предыдущей строки/ аббревиатуры
    const isNextLineContinuation = ENGLISH_ALPHABET.some(
      (char) =>
        char.toLowerCase() === (dictionaryAbbreviationLines[i + 1] || "")[1]
    );

    // если это последняя строка или следующая уже другая аббревиатура
    if (
      i === dictionaryAbbreviationLines.length - 1 ||
      !isNextLineContinuation
    ) {
      dictionaryCompleteAbbreviationLines.push(completeAbbreviationLine);
      completeAbbreviationLine = undefined;
    }
  }

  // собираем в объект вида
  // {"АББРЕВИАТУРА": ["Первый вариант расшифровки", "Второй вариант расшифровки"]}
  const abbreviationsMap = dictionaryCompleteAbbreviationLines.reduce(
    (abbreviationsMap, abbreviationLine) => {
      const [abb, ...abbDescrParts] = abbreviationLine.split(" ");

      return {
        ...abbreviationsMap,
        [abb.toUpperCase()]: abbDescrParts
          .join(" ")
          .split(";")
          .map((part) => part.trim()),
      };
    },
    {}
  );

  return abbreviationsMap;
}

function parseTranslations(dictionaryTranslations, abbreviationsMap) {
  // Переносим переводы на несколько строк в одну
  const dictionaryTranslationLines = dictionaryTranslations.split(/\r?\n/);

  const dictionaryCompleteTranslationLines = [];
  let completeTranslationLine;

  for (let i = 0; i < dictionaryTranslationLines.length; i++) {
    if (completeTranslationLine === undefined) {
      completeTranslationLine = dictionaryTranslationLines[i];
    } else {
      completeTranslationLine = `${completeTranslationLine} ${dictionaryTranslationLines[i]}`;
    }

    // если вторая буква в строке маленькая, то это продолжение предыдущей строки/ перевода
    const isNextLineContinuation = [...RUSSIAN_ALPHABET, "("].some(
      (char) =>
        char.toLowerCase() ===
        (dictionaryTranslationLines[i + 1] || "")[0]?.toLowerCase()
    );

    // если это последняя строка или следующая уже другой перевод
    if (
      i === dictionaryTranslationLines.length - 1 ||
      !isNextLineContinuation
    ) {
      dictionaryCompleteTranslationLines.push(completeTranslationLine);
      completeTranslationLine = undefined;
    }
  }

  // собираем в объект вида
  // {"english word": ["перевод 1", "перевод 2"]}
  const translationsMap = dictionaryCompleteTranslationLines.reduce(
    (translationsMap, translationLine) => {
      const words = translationLine.split(" ");
      const russianWordsStartIndex = words.findIndex((word) =>
        RUSSIAN_ALPHABET.some((l) =>
          word.toLowerCase().includes(l.toLowerCase())
        )
      );

      // zstring Z-строка;
      const englishWords = words
        .slice(0, russianWordsStartIndex)
        .join(" ")
        .trim();
      const russianWords = words.slice(russianWordsStartIndex).join(" ");

      return {
        ...translationsMap,
        [englishWords]: russianWords.split(";").map((part) => part.trim()),
      };
    },
    {}
  );

  return Object.entries(translationsMap).map(([englishWord, russianWords]) => {
    const abbDescriptions = abbreviationsMap[englishWord.toUpperCase()] || [];
    return {
      [RUSSIAN_LANGUAGE_CODE]: russianWords,
      [ENGLISH_LANGUAGE_CODE]: [englishWord, ...abbDescriptions],
    };
  });
}

module.exports = { parseAbbreviations, parseTranslations };
