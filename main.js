import data from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  btnClose: document.querySelector(".lightbox__button"),
  imgOrigin: document.querySelector(".lightbox__image"),
  lightboxContent: document.querySelector(".lightbox__overlay"),
};

const cardMarkup = creatImagesMarkup(data);
refs.gallery.insertAdjacentHTML("afterbegin", cardMarkup);

refs.gallery.addEventListener("click", onClick);
refs.btnClose.addEventListener("click", removeActiveClass);
refs.lightboxContent.addEventListener("click", removeActiveClass);

console.dir(refs.lightboxContent);

console.log(refs.lightboxContent);

function creatImagesMarkup(markup) {
  return markup
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-index="${index}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightbox.classList.add("is-open");

  refs.imgOrigin.src = e.target.dataset.source;
  refs.imgOrigin.alt = e.target.alt;

  currentIndex = Number(e.target.dataset.index);

  window.addEventListener("keyup", onEscClose);
}

function removeActiveClass() {
  refs.lightbox.classList.remove("is-open");

  window.removeEventListener("keyup", onEscClose);

  refs.imgOrigin.src = "";
  refs.imgOrigin.alt = "";
}
let currentIndex = 0;

function onEscClose(e) {
  console.dir(e.keyCode);
  switch (e.keyCode) {
    case 27:
      removeActiveClass();
      break;
    case 37:
      showPrev();
      break;
    case 39:
      showNext();
      break;
  }
}
function showPrev() {
  if (currentIndex - 1 < 0) {
    return;
  }
  currentIndex -= 1;
  refs.imgOrigin.src = data[currentIndex].original;
}
function showNext() {
  if (currentIndex + 1 >= data.length) {
    return;
  }
  currentIndex += 1;
  refs.imgOrigin.src = data[currentIndex].original;
}
