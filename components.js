export function renderResults(rootEl, results) {
  const resultsHTML = results
    .map((result) => `<span class="translator__result">${result}</span>`)
    .join("");

  if (resultsHTML) {
    rootEl.innerHTML = resultsHTML;
  } else {
    rootEl.innerHTML = '<span class="translator__result">Перевод</span>';
  }
}

export function renderSuggestions(rootEl, suggestions) {
  const suggestionHTML = suggestions
    .map(
      (suggestion) =>
        `<span class="translator__suggestion" data-suggestion="${suggestion}">${suggestion}</span>`
    )
    .join("");

  rootEl.innerHTML = suggestionHTML;
}
