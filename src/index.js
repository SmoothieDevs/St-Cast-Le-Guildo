
/*
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";*/
import "./js/loader.js";
import "./css/main.scss";
import Splitting from "splitting";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easepick } from '@easepick/core';
import { DateTime } from '@easepick/datetime';
import { LockPlugin } from '@easepick/lock-plugin';
import { RangePlugin } from '@easepick/range-plugin';
import { AmpPlugin } from '@easepick/amp-plugin';
import "./js/weatherAPI.js";
import "./js/section2";
/* import "./footer"; */
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementsByClassName("hero-banner")[0] != undefined) {
        let hero = document.querySelector(".hero-banner");
        let navOpen = false;
        //////////// MAIN LOGO ANIMATION ON START SCROLL ////////////
        let mainLogo = document.querySelector(".wrapper-home");
        let tlMainLogo = gsap.timeline({ paused: true });
        let logoSup = document.querySelector('.wrapper-home .sup');
        let logoSub = document.querySelector('.wrapper-home .sub');
        const charSplit = Splitting({ by: 'chars' });

        const mqs = [
            window.matchMedia("(max-width: 576px)"),
            window.matchMedia("(max-width: 768px)"),
            window.matchMedia("(max-width: 1024px)"),
        ];


        if (mqs[1].matches) {
            console.log("less 768px");
            tlMainLogo.to(mainLogo, { top: 50, duration: 1, ease: "power2.inOut" }, 'scroll')
                .to(logoSup, {
                    fontSize: 20, duration: 1, ease: "power2.inOut",
                }, 'scroll')
                .to(logoSub, { fontSize: 15, duration: 1, ease: "power2.inOut" }, 'scroll')
        } else {
            console.log(" more 768px");
            tlMainLogo.to(mainLogo, { top: 50, duration: 1, ease: "power2.inOut" }, 'scroll')
                .to(logoSup, {
                    fontSize: 30, duration: 1, ease: "power2.inOut",
                }, 'scroll')
                .to(logoSub, { fontSize: 18, duration: 1, ease: "power2.inOut" }, 'scroll')
        }

        //Si le site charge pas sur la page d'accueil, on met le logo en haut
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 && navOpen == false) {
            tlMainLogo.play(1);
        }


        //////////// Navigation Apparition ////////////
        let navigationTL = gsap.timeline({ paused: true });

        if (mqs[0].matches) {
            console.log("less 576px");
        } else {
            console.log("more 576px");
        }
        navigationTL.to(".bg-img", { scale: 1, duration: 2, delay: 2.5, ease: "power3.inOut" }, 'start')
            .to(".tl-wrapper", { opacity: 1, duration: 1, delay: 2.5, ease: "power3.inOut" }, 'start')
            .to(".wrapper-infos", { opacity: 1, duration: 1, delay: 2.5, ease: "power1.inOut" }, 'start')
            .to(".wrapper-home .sup .char", { y: 0, stagger: .08, duration: 1, delay: 1.8, ease: "power1.inOut" }, 'start')
            .to(".wrapper-home .sub .char", { y: 0, stagger: .08, duration: 1, delay: 2.3, ease: "power1.inOut" }, 'start');
        navigationTL.play();

        /////////// NAVIGATION ///////////
        let button = document.querySelector(".btn-menu");
        let nav = document.querySelector("nav");
        let navAnimDone = true;

        button.addEventListener("click", function () {
            if (!navOpen) {
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

        document.querySelectorAll("nav li a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
                navOpen = false;
            });
        });

        function openMenu() {
            nav.classList.add("on");
            button.classList.add("on");
            tlNavOpen.timeScale(1).play(0);
            if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
                tlMainLogo.play();
            }
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
            if (document.documentElement.scrollTop < 20) {
                tlMainLogo.reverse();
            }
        }

        //////////// Reservation bar ////////////
        /*
                let reservation = document.getElementsByClassName("menu-form")[0]
                let reservationForm = reservation.querySelector("form");
                let inputPersonnes = reservation.querySelector(".personnes input")
                let inputDateDepart = reservation.querySelector("input#depart")
                let inputDateArrive = reservation.querySelector("input#arrive")
                let nbPersonnes = 1;
                inputPersonnes.value = "0" + nbPersonnes;
                let btnPlus = reservation.querySelector(".plus");
                let btnLess = reservation.querySelector(".less");
                let dateSelector = document.querySelector("#date-selector");
                let inputDate = reservation.querySelector(".wrapper-input.date");
                let dateNextButton = document.querySelector(".menu-form .next button");
                let dateBackButton = document.querySelectorAll(".menu-form .back button");
                let tlNextDate = gsap.timeline({ paused: true });
                let tlBackDate = gsap.timeline({ paused: true });
                let dateSelectorOpen = false;
        
                inputDate.addEventListener("click", function () {
                    if (!dateSelectorOpen) {
                        openDateSelector();
                        dateSelectorOpen = true;
                    } else {
                        closeDateSelector();
                        dateSelectorOpen = false;
                    }
                });
        
                if (dateBackButton != null && dateNextButton != null) {
                    dateBackButton.forEach(e => {
                        e.addEventListener("click", function () {
                            tlBackDate.play(0);
                        });
                    })
                    dateNextButton.addEventListener("click", function () {
                        if (inputDateArrive.value && inputDateDepart.value) {
                            tlNextDate.play(0);
                        }
                    });
        
                    tlNextDate.to(".first-step", {
                        opacity: 0, duration: 1, ease: "power4.out", onComplete: function () {
                            document.querySelector(".first-step").style.display = "none";
                            document.querySelector(".second-step").style.display = "flex";
                            gsap.to(".second-step", { opacity: 1, duration: 1, ease: "power4.out" });
                        }
                    }, "next");
        
                    tlBackDate.to(".second-step", {
                        opacity: 0, duration: 1, ease: "power4.out", onComplete: function () {
                            document.querySelector(".first-step").style.display = "flex";
                            document.querySelector(".second-step").style.display = "none";
                            gsap.to(".first-step", { opacity: 1, duration: 1, ease: "power4.out" });
                        }
                    }, "back");
                }
        
        
        
                function openDateSelector() {
                    dateSelector.classList.add("on");
                    button.classList.add("on");
                    document.body.classList.remove("black");
                    if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
                        tlMainLogo.play();
                    }
                }
                function closeDateSelector() {
                    dateSelector.classList.remove("on");
                    button.classList.remove("on");
                    if (document.documentElement.scrollTop < 20) {
                        tlMainLogo.reverse();
                    }
                    if (actualNavColor == 1) {
                        document.body.classList.add("black");
                    }
                }
                btnPlus.addEventListener("click", function () {
                    if (nbPersonnes < 6) {
                        nbPersonnes++;
                        inputPersonnes.value = "0" + nbPersonnes;
                    }
                })
                btnLess.addEventListener("click", function () {
                    if (nbPersonnes > 1) {
                        nbPersonnes--;
                        inputPersonnes.value = "0" + nbPersonnes;
                    }
                })
        
                // Toutes les dates sont bloquées par défaut. Les seules qui sont autorisées sont les périodes ouvertes par l'admin et qui ne sont pas réservées.
                fetch('/api/availabilities')
                    .then((response) => response.json())
                    .then((data) => {
                        const availableRanges = data.data.availabilitiesWithBooked.map(d => [new DateTime(d['from'], 'YYYY-MM-DD'), new DateTime(d['to'], 'YYYY-MM-DD')]);
                        const picker = new easepick.create({
                            element: '#datepicker',
                            css: [
                                'images/css/easypickUser.css'
                            ],
                            setup(picker) {
                                picker.on('select', (e) => {
                                    const { view, date, target } = e.detail;
                                    inputDateArrive.value = e.detail.start.format('DD MMM. YYYY');
                                    inputDateDepart.value = e.detail.end.format('DD MMM. YYYY');
                                });
                            },
                            zIndex: 10,
                            lang: 'fr-FR',
                            format: 'DD MMM YYYY',
                            grid: 2,
                            calendars: 2,
                            inline: true,
                            plugins: [
                                AmpPlugin,
                                RangePlugin,
                                LockPlugin
                            ],
                            LockPlugin: {
                                minDate: new Date(),
                                inseparable: true,
                                filter(date, picked) {
                                    return !date.inArray(availableRanges);
                                },
                            }
                        })
                    });
        
                //////////// Reservation bar Apparition ////////////
        
                let reservationBarTl = gsap.timeline({ paused: true })
                let hideReservationBarTl = gsap.timeline({ paused: true }).to(reservation, { bottom: -250, duration: .6, ease: "power2.inOut" });
        
                reservationBarTl.to(reservation, { scaleX: 1, duration: 1.8, delay: 2, ease: "power1.inOut", onComplete: function () { reservationForm.style.display = "flex" } }, 'start')
                    .to(reservationForm, { duration: 1, opacity: 1, ease: "power3.inOut" })
        
                reservationBarTl.play();
        */
        //////////// SCROLLING ////////////
        let sectionWhite = document.querySelectorAll('section[data-color="white"]');
        let sectionBlack = document.querySelectorAll('section[data-color="black"]');
        let lastScroll = 0;
        let actualNavColor = 0;

        function getWhiteTransitionTopValue() {
            let result = []
            sectionWhite.forEach(element => {
                result.push(element.getBoundingClientRect().top)
            })
            return result;
        }

        function getBlackTransitionTopValue() {
            let result = []
            sectionBlack.forEach(element => {
                result.push(element.getBoundingClientRect().top)
            })
            return result;
        }

        function getWhiteTransitionBottomValue() {
            let result = []
            sectionWhite.forEach(element => {
                result.push(element.getBoundingClientRect().bottom)
            })
            return result;
        }

        function getBlackTransitionBottomValue() {
            let result = []
            sectionBlack.forEach(element => {
                result.push(element.getBoundingClientRect().bottom)
            })
            return result;
        }

        let WhiteTransitionTopValue = getWhiteTransitionTopValue();
        let BlackTransitionTopValue = getBlackTransitionTopValue();
        let WhiteTransitionBottomValue = getWhiteTransitionBottomValue();
        let BlackTransitionBottomValue = getBlackTransitionBottomValue();

        function scrollFunction() {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
            if (currentScroll > 0 && lastScroll <= currentScroll) {
                lastScroll = currentScroll;
                //Downscroll
                if (actualNavColor == 1) {
                    WhiteTransitionTopValue.forEach(elem => {
                        if (document.documentElement.scrollTop + 100 > elem && document.documentElement.scrollTop < elem + 300) {
                            document.body.classList.remove("black");
                            actualNavColor = 0;
                        }
                    })
                } else {
                    BlackTransitionTopValue.forEach(elem => {
                        if (document.documentElement.scrollTop + 100 > elem && document.documentElement.scrollTop < elem + 300) {
                            if (!navOpen) {
                                document.body.classList.add("black")
                            }
                            actualNavColor = 1;
                        }
                    })
                }
            }
            else {
                lastScroll = currentScroll;
                //UP
                if (actualNavColor == 1) {
                    WhiteTransitionBottomValue.forEach(elem => {
                        if (document.documentElement.scrollTop < elem && document.documentElement.scrollTop > elem - 300) {
                            document.body.classList.remove("black")
                            actualNavColor = 0
                        }
                    })
                } else {
                    BlackTransitionBottomValue.forEach(elem => {
                        if (document.documentElement.scrollTop < elem && document.documentElement.scrollTop > elem - 300) {
                            if (!navOpen) {
                                document.body.classList.add("black")
                            }
                            actualNavColor = 1
                        }
                    })
                }
            }
            if ((document.body.scrollTop > 20 || document.documentElement.scrollTop) > 20 && navOpen == false) {
                tlMainLogo.play();
            } else if ((document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) && navOpen == false) {
                tlMainLogo.reverse();
            }
            if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
                hero.classList.add("hide")
            } else {
                hero.classList.remove("hide")
            }
        }
        window.onscroll = function () { scrollFunction() };

        //////////// IMAGE EFFECT ON SCROLLING WITH GSAP ////////////
        let items = document.querySelectorAll('.item');
        items.forEach(function (el) {
            let elId = el.getAttribute('id');
            let elTransform = el.dataset.transform
            let parent = el.parentNode;
            let parentId = parent.getAttribute('id');

            gsap.to("#" + elId, {
                transform: elTransform,
                transformOrigin: 'center',
                ease: 'none',
                scrollTrigger: {
                    trigger: "#" + parentId,
                    scrub: 1,
                    start: 'top bottom',
                    end: 'bottom top',
                    markers: false,
                }
            });
        });
    }
})