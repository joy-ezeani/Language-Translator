const selectTag = document.querySelectorAll("select");
fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
exchangeIcon = document.querySelector(".exchange");
icons = document.querySelectorAll(".i");
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
  for (const countryCode in countries) {
    // english as default in from lang and french in to lang
    let selected;
    if (id == 0 && countryCode == "en-GB") {
      selected = "selected";
    } else if (id == 1 && countryCode == "fr-FR") {
      selected = "selected";
    }
    let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  //to generate and render translation api
  let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  if (!text) return;
  toText.setAttribute("placeholder", "Translating.....");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}&de=royaltyint15@gmail.com`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach((icon) => {
  //when copy icon is clicked
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let speakText;
      if (target.id == "from") {
        speakText = new SpeechSynthesisUtterance(fromText.value);
        speakText.lang = selectTag[0].value;
      } else {
        speakText = new SpeechSynthesisUtterance(toText.value);
        speakText.lang = selectTag[1].value;
      }
      speechSynthesis.speak(speakText);
    }
  });
});
