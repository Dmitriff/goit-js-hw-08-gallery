import { galleryItems } from "./app.js";

function createGalleryElements(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
        </li>`;
    })
    .join("");
}

const cardsGallery = createGalleryElements(galleryItems);

const galleryContainer = document.querySelector(".js-gallery");

galleryContainer.insertAdjacentHTML("beforeend", cardsGallery);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}

function onCloseModal() {
  lightBox.classList.remove("is-open");
  window.removeEventListener("keydown", onEscKeyPress);
  imageLightBox.src = "";
}

function onOpenModal() {
  lightBox.classList.add("is-open");
  const btnClose = document.querySelector(".lightbox__button");
  btnClose.addEventListener("click", onCloseModal);
  window.addEventListener("keydown", onEscKeyPress);
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalSrcImg = event.target.dataset.source;

  onOpenModal();

  imageLightBox.src = originalSrcImg;
}

const lightBox = document.querySelector(".js-lightbox");
const imageLightBox = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

overlay.addEventListener("click", onOverlayClick);
