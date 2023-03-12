import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementsByClassName("section2")[0] != undefined) {
        gsap.registerPlugin(ScrollTrigger);
        let tlSlider = gsap.timeline({ paused: true });
        let actual = document.querySelector("section.section2 .actual");
        let total = document.querySelector("section.section2 .total");
        let images = document.querySelectorAll("section.section2 img");
        let index = 1;
        let timer;
        let timerOn = false;
        // Observer Variables //
        let target = document.querySelector('#section2');
        let options = {
            threshold: .2
        }

        let callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTimer()
                } else {
                    clearTimer()
                }
            });
        };

        let observer = new IntersectionObserver(callback, options);

        actual.innerHTML = index;
        total.innerHTML = images.length;

        tlSlider.to("section.section2 .hidder-l", { width: "50%", duration: 1, ease: "power3.inOut" }, 'switch')
            .to("section.section2 .hidder-r", { width: "50%", duration: 1, ease: "power3.inOut" }, 'switch')
            .to(actual, { y: 10, opacity: 0, duration: .75, delay: .2, ease: "power3.inOut" }, 'switch')

        function startTimer() {
            timer = setTimeout(() => {
                switchImage()
            }, 7000)
            timerOn = true;
        }

        function clearTimer() {
            if (timerOn == true) {
                clearTimeout(timer);
                timerOn = false;
            }
        }

        function switchImage() {
            let lastIndex = index;
            tlSlider.play();
            setTimeout(function () {
                if (index !== images.length) {
                    index = index + 1
                } else {
                    index = 1
                }
                actual.innerHTML = index;
                images[index - 1].style.display = 'block'
                images[lastIndex - 1].style.display = 'none'
                tlSlider.reverse();
                if (timerOn == true) {
                    startTimer()
                }

            }, 1100)
        }
        observer.observe(target);
    }
})