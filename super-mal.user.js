// ==UserScript==
// @name     SuperMAL
// @version  1
// @include  https://myanimelist.net/animelist/*
// @updateURL https://github.com/Tina-otoge/SuperMAL/raw/master/super-mal.user.js
// ==/UserScript==

const UNWANTED_TITLE_WORDS = [
  " nd",
  " rd",
  " th",
  "part",
  "season",
  ":"
];

function prepareName(text) {
  text = text.toLowerCase();
  text = text.replace(/[^a-z]+/g, " ");
  UNWANTED_TITLE_WORDS.forEach(word => {
    text = text.replace(new RegExp(`\w*${word}\w*`, "gi"), "");
  });
  text = text.trim();
  text = encodeURIComponent(text).replace(/%20/gi, "+");
  return text;
}

function createNyaaLinkElement(anime_name) {
  const result = document.createElement("a");
  result.href = `https://nyaa.si/?f=0&c=1_2&q=${anime_name}`;
  result.innerHTML = "Nyaa";
  result.style.paddingLeft = "2em";
  result.target = "_blank";
  return result;
}

function addLinks() {
  document.querySelectorAll("#list-container .data.title:not([data-super-done])").forEach(e => {
    e.setAttribute("data-super-done", true);
    let name = e.querySelector(".link").textContent;
    name = prepareName(name);
    const options = e.querySelector(".add-edit-more");
    const nyaa_link = createNyaaLinkElement(name);
    options.appendChild(nyaa_link);
  });
}


setInterval(addLinks, 500);
