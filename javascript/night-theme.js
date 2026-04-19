const NightThemeBtn=document.getElementById("night-theme-btn")

NightThemeBtn.addEventListener("click", function() {
    document.body.classList.toggle("night-theme")
})






let currentAudio = null;
let currentButton = null;
let currentVolume = 0.7;

const buttons = document.querySelectorAll('.sound-btn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');

function updateVolume(value) {
    currentVolume = value / 100;
    volumeValue.textContent = value + '%';
    
    if (currentAudio) {
        currentAudio.volume = currentVolume;
    }
}

volumeSlider.addEventListener('input', (e) => {
    updateVolume(e.target.value);
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const soundFile = button.getAttribute('data-sound');
        
        if (currentButton === button) {
            // Останавливаем звук
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentAudio = null;
            }
            currentButton = null;
            button.classList.remove('active');
        } 
        else {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            
            currentAudio = new Audio(soundFile);
            currentAudio.loop = true;
            currentAudio.volume = currentVolume;
            currentAudio.play().catch(error => {
                console.log('Ошибка воспроизведения:', error);
            });
            
            if (currentButton) {
                currentButton.classList.remove('active');
            }
            
            currentButton = button;
            button.classList.add('active');
        }
    });
});

updateVolume(volumeSlider.value);