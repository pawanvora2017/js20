const videoEl = document.getElementById("video");
const button = document.getElementById("button");

// prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoEl.srcObject = mediaStream;
        videoEl.onloadedmetadata = () => {
            videoEl.play();
        };
    } catch (err) {
        console.log("Oops!", err);
    }
}

button.addEventListener("click", async () => {
    // Disable button
    button.disabled = true;

    // start picture-in-picture
    await videoEl.requestPictureInPicture();

    // Enable button
    button.disabled = false;
});

// on load
selectMediaStream();
