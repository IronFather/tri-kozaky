import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

function createMarkupGallery (arr) {
    return arr
    .map(({preview, original, description}) => {
    return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div>`
    })
    .join("");
}; //1+

const marcupGalleryItems = createMarkupGallery(galleryItems);
galleryEl.innerHTML = marcupGalleryItems;//1+


galleryEl.addEventListener(`click`, onGalleryItemClick); //2+

function onGalleryItemClick(e) {
    const galleryImg = e.target.classList.contains(`gallery__image`);
    
    e.preventDefault();

    if(!galleryImg) {
        return
    }

    const bigGalleryImg = e.target.dataset.source; //2+
    // console.log(bigGalleryImg);

    const modal = basicLightbox.create(`
        <img width="1400" height="900" src="${bigGalleryImg}">
    `);
    modal.show();
    
    document.addEventListener("keydown", onModalClose);
    // console.log(e);
    function onModalClose(e) {
        if ("Escape" === e.code) {
            modal.close();

            document.removeEventListener("keydown", onModalClose);
            // console.log(`Escape`);
        }
    }
};
