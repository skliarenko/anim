window.addEventListener('DOMContentLoaded', () => {
    const pins = document.querySelectorAll('.pin');
    const hoverPins = document.querySelector('.all-pin-hover');

    const hoverPinsSoundSrc = hoverPins.getAttribute('data-audio');
    const hoverPinsSound = document.createElement('audio');

    hoverPinsSound.src = hoverPinsSoundSrc;
    document.querySelector('.audio-wrapper').appendChild(hoverPinsSound);

    if (pins) {
        pins.forEach(pin => {

            const pinSoundSrc = pin.getAttribute('data-audio');
            const pinSound = document.createElement('audio');

            pinSound.src = pinSoundSrc;
            document.querySelector('.audio-wrapper').appendChild(pinSound);

            pin.querySelector('.pin__pulse').addEventListener('click', () => {

                pinSound.play();
            })

            if (parseInt(pin.style.right) < 50) pin.classList.add('pin-r');
            if (parseInt(pin.style.left) < 30) pin.classList.add('pin-l');
            if (parseInt(pin.style.top) < 50) pin.classList.add('pin-t');

            document.addEventListener('click', function (e) {

                if (e.target === pin.querySelector('.pin__pulse') || e.target === pin.querySelector('.pin__title')) {
                    pin.classList.add('active');
                } else {
                    pin.classList.remove('active');
                }
            })

            hoverPins.addEventListener('mouseover', () => {
                pin.querySelector('.pin__dot').classList.add('opacity');
                hoverPinsSound.play();
            })

            hoverPins.addEventListener('mouseout', () => {
                setTimeout(() => {
                    pin.querySelector('.pin__dot').classList.remove('opacity')
                }, 4000);
            })
        });
    }


    const introMusic = document.querySelector('.btn-sound');
    const dataMainAudio = document.querySelector('.desktop-mirror').getAttribute('data-audio');

    const audioMain = document.createElement('audio');

    audioMain.src = dataMainAudio;
    // audioMain.autoplay = true;
    audioMain.loop = true;
    document.querySelector('.audio-wrapper').appendChild(audioMain);

    let soundState = true;

    introMusic.addEventListener('click', () => {

        if (soundState) {
            soundState = false;
            audioMain.play();

            introMusic.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-3 h-3"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path></svg>
        `
        } else {
            soundState = true;
            introMusic.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-3 h-3"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        `
            audioMain.pause();
        }


    })


    function stepSlider () {
        const
            btn = document.querySelector('.preview__btn'),
            allTabs = document.querySelectorAll('.preview__item'),
            preview = document.querySelector('.preview');

        let opBg = 0.9;
        let counter = 0;

        btn.addEventListener('click', function () {


            if (counter === allTabs.length - 1) {
                hide(preview);
            } else {
                hide(allTabs[counter]);
                show(allTabs[counter + 1]);
                counter++;
            }
        });

        function show(elem){
            elem.classList.remove('hidden');

            if (opBg >= 0.7) {
                preview.style.backgroundColor = `rgba(0, 0, 0, ${opBg -= 0.1})`;
             }

            console.log(opBg)

        }

        function hide(elem){
            elem.classList.add('hidden');
        }


        }
    stepSlider ();

    const swiper = new Swiper('.mobile-mirror__slider', {

        pagination: {
            el: '.mobile-mirror__pagination',
            clickable: true
        },

        on: {
            slideChange: function () {
                mobileSlide();
            },
        },
    });

    function mobileSlide() {
        const index_currentSlide = swiper.realIndex;
        const currentSlide = swiper.slides[index_currentSlide];

        const images = document.querySelector('.mobile-mirror__img');
        images.style.backgroundPosition = currentSlide.getAttribute('data-position');
        images.style.transform = `scale(${currentSlide.getAttribute('data-size')})`;
    }

    mobileSlide();

})




