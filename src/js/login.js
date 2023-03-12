import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Splitting from "splitting";

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("login")) {
        const charSplit = Splitting({ by: 'chars' });
        //////////// Navigation Apparition ////////////
        let tl = gsap.timeline({ paused: true }).to(".wrapper-infos", { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power1.inOut" }, 'start')
            .to(".tl-wrapper", { opacity: 1, duration: 1, delay: 1, ease: "power3.inOut" }, 'start')
            .to(".main-logo .sup .char", { y: 0, stagger: .08, duration: 1, delay: 1, ease: "power1.inOut" }, 'start')
            .to(".main-logo .sub .char", { y: 0, stagger: .08, duration: 1, delay: 1.5, ease: "power1.inOut" }, 'start');
        tl.play();

        let actualNavColor = 1;
        let navOpen = false;
        let button = document.querySelector(".btn-menu");
        let nav = document.querySelector("nav");
        let navAnimDone = true;

        button.addEventListener("click", function () {
            if (navOpen == false) {
                navAnimDone = false;
                openMenu();
                navOpen = true;
            } else {
                closeMenu();
                navOpen = false;
            }
        });

        let tlNavOpen = gsap.timeline({ paused: true });
        let tlNavClose = gsap.timeline({ paused: true });
        tlNavOpen.to(".link-number span", { delay: 0.2, y: 0, duration: .8, ease: "power1.out", stagger: .05 }, "open")
            .to("nav li a", { y: 0, duration: 1, ease: "power4.out", stagger: .05, onComplete: function () { navAnimDone = true; } }, "open")

        tlNavClose.to(".link-number span", { delay: 0.1, y: "-100%", duration: 1, ease: "power4.out", stagger: .05 }, "close")
            .to("nav li a", { y: "-100%", duration: .3, ease: "power1.in", stagger: .05 }, "close")

        function openMenu() {
            nav.classList.add("on");
            button.classList.add("on");
            tlNavOpen.timeScale(1).play(0);
            if (actualNavColor == 1) {
                document.body.classList.remove("black");
            }
        }

        function closeMenu() {
            nav.classList.remove("on");
            button.classList.remove("on");
            if (navAnimDone == true) {
                tlNavClose.play(0);
            } else {
                tlNavOpen.timeScale(2).reverse();
            }
            if (actualNavColor == 1) {
                document.body.classList.add("black");
            }
        }
    }
});