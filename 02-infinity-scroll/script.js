/*
    API Key Schema: https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
*/

const ACCESS_KEY = "Td5Ehi_1-lyvqfq_ZJLEow3fIVdyNClS-xdN9qMG_WI";
const count_initial_load = 5;
const count_subsequent_loads = 20;
let count = count_initial_load;
const unsplashAPIUrl = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = count_subsequent_loads;
    }
};

const setAttributes = (el, attributes) => {
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
};

const displayPhotos = (photosArray) => {
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    totalImages = photosArray.length;
};

// get photos from unsplash
const getPhotos = () => {
    fetch(unsplashAPIUrl)
        .then((response) => response.json())
        .then((response) => displayPhotos(response))
        .catch((err) => console.log(err));
};

// check to see if scroll near bottom... if so, load more photos
window.addEventListener("scroll", () => {
    const MIN_DIST_FROM_BOTTOM = 600;
    const pageHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;

    // console.log(document.body.scrollHeight - window.scrollY + window.innerHeight);

    if (pageHeight - (viewportHeight + window.scrollY) < MIN_DIST_FROM_BOTTOM && ready) {
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();
