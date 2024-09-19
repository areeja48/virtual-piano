const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");
powerToggleButton = document.getElementById("power-toggle");


let allKeys = [],
audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune
isPoweredOn = false;

const playTune = (key) => {
    if (!isPoweredOn) return; // Do nothing if the piano is off

    audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed 
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    if (!isPoweredOn) return; // Do nothing if the piano is off
    audio.volume = e.target.value; // passing the range slider value as an audio volume
}

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if (!isPoweredOn) return; // Do nothing if the piano is off
    // if the pressed key is in the allKeys array, only call the playTune function
    if(allKeys.includes(e.key)) playTune(e.key);
    
}

const togglePower = () => {
    isPoweredOn = !isPoweredOn; // Toggle the power state
    if (isPoweredOn) {
        pianoKeys.forEach(key => key.classList.add("disabled")); // Disable keys visually
    } else {
        pianoKeys.forEach(key => key.classList.remove("disabled")); // Enable keys visually
    }
}    


keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
powerToggleButton.addEventListener("click", togglePower);