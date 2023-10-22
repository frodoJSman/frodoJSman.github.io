import "./style.css";
import { renderResults, renderSuggestions } from "./components";
import { searchTranslation } from "./utils";

const languageFromEl = document.querySelector("#language-from");
const languageToEl = document.querySelector("#language-to");

const translatorPromptEl = document.querySelector("#translator-prompt");
const translatorPromptClearEl = document.querySelector(
  "#translator-prompt-clear"
);
const translatorPromptSwitcherEl = document.querySelector(
  "#translator-switcher"
);
const translatorResultsEl = document.querySelector("#translator-results");
const translatorSuggestionsEl = document.querySelector(
  "#translator-suggestions"
);

const languages = {
  en: "Английский",
  ru: "Русский",
};
let languageFrom = "en";
let languageTo = "ru";

import dictionary from "./translations.json";

translatorPromptEl.addEventListener("input", (e) => {
  const prompt = e.target.value;

  if (prompt && prompt.length > 1) {
    const { suggestions, results } = searchTranslation(
      dictionary,
      languageFrom,
      languageTo,
      prompt
    );
    renderSuggestions(translatorSuggestionsEl, suggestions);
    renderResults(translatorResultsEl, results);
  } else {
    renderSuggestions(translatorSuggestionsEl, []);
    renderResults(translatorResultsEl, []);
  }
});

translatorSuggestionsEl.addEventListener("click", (e) => {
  const suggestion = e.target.dataset?.suggestion;
  if (suggestion) {
    translatorPromptEl.value = suggestion;
    translatorPromptEl.dispatchEvent(new Event("input"));
  }
});

translatorPromptClearEl.addEventListener("click", (e) => {
  translatorPromptEl.value = "";
  translatorPromptEl.dispatchEvent(new Event("input"));
});

translatorPromptSwitcherEl.addEventListener("click", (e) => {
  [languageTo, languageFrom] = [languageFrom, languageTo];
  languageFromEl.textContent = languages[languageFrom];
  languageToEl.textContent = languages[languageTo];
  translatorPromptEl.value = "";
  translatorPromptEl.dispatchEvent(new Event("input"));
});
