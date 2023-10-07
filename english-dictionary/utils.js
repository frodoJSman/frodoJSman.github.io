export function searchTranslation(
  dictionary,
  languageFrom,
  languageTo,
  prompt
) {
  let suggestions = [];
  let results = [];
  for (const wordEntry of dictionary) {
    const isMatching = wordEntry[languageFrom].some(
      (word) => word.toLowerCase() === prompt.toLowerCase().trim()
    );
    const wordEntrySuggestion = wordEntry[languageFrom].filter((word) =>
      word.toLowerCase().startsWith(prompt.toLowerCase().trim())
    );

    suggestions = [...suggestions, ...wordEntrySuggestion];

    if (isMatching) {
      results = wordEntry[languageTo];
      suggestions = [];
      break;
    }
  }

  return {
    suggestions: suggestions.slice(0, 3),
    results,
  };
}
