import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Splitting from 'splitting';
import { easepick } from '@easepick/core';
import { DateTime } from '@easepick/datetime';
import { LockPlugin } from '@easepick/lock-plugin';
import { RangePlugin } from '@easepick/range-plugin';
import { AmpPlugin } from '@easepick/amp-plugin';
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('admin-dashboard')) {
        const charSplit = Splitting({ by: 'chars' });
        //////////// Navigation Apparition ////////////
        let tl = gsap.timeline({ paused: true }).to('.wrapper-infos', { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power1.inOut' }, 'start')
            .to('.main-logo .sup .char', { y: 0, stagger: .08, duration: 1, delay: 1, ease: 'power1.inOut' }, 'start')
            .to('.main-logo .sub .char', { y: 0, stagger: .08, duration: 1, delay: 1.5, ease: 'power1.inOut' }, 'start');
        tl.play();

        //////////// Datepicker pour l'admin ////////////
        // Affichage des périodes marquées disponibles et des périodes réservées pour autorisation/bloquage des dates
        let inputDateFrom = document.querySelector("input#from");
        let inputDateTo = document.querySelector("input#to");
        let inputType = document.querySelector("input#type");
        let buttonLock = document.querySelector("button#lock");
        let buttonUnlock = document.querySelector("button#unlock");
        let dateManagerForm = document.getElementById('dateManagerForm');

        fetch('/api/availabilities')
            .then((response) => response.json())
            .then((data) => {
                const availableRanges = data.data.availabilities.map(d => [new DateTime(d['from'], 'YYYY-MM-DD'), new DateTime(d['to'], 'YYYY-MM-DD')]);
                const bookedRanges = data.data.bookings.map(d => [new DateTime(d['start'], 'YYYY-MM-DD'), new DateTime(d['end'], 'YYYY-MM-DD')]);
                const pickerA = new easepick.create({
                    element: '#datepicker',
                    css: [
                        'images/css/easypick.css'
                    ],
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
                            return date.inArray(bookedRanges);
                        },
                    },
                    setup(picker) {
                        picker.on('view', (evt) => {
                            const { view, date, target } = evt.detail;
                            if (view === 'CalendarDay' && !date.inArray(availableRanges) && !target.classList.contains('not-available')) {
                                target.style.color = 'orange';
                            }
                        });
                        picker.on('select', (evt) => {
                            inputDateFrom.value = evt.detail.start.format('DD MMM. YYYY');
                            inputDateTo.value = evt.detail.end.format('DD MMM. YYYY');
                        });
                    }
                })
            })

        buttonLock.addEventListener('click', (e) => {
            e.preventDefault();
            if (inputDateFrom.value === '' || inputDateTo.value === '') {
                alert('Veuillez sélectionner une période');
            } else if (confirm('Voulez-vous vraiment bloquer ces dates ?')) {
                inputType.value = 'unavailable';
                dateManagerForm.submit();
            }
        });

        buttonUnlock.addEventListener('click', (e) => {
            e.preventDefault();
            if (inputDateFrom.value === '' || inputDateTo.value === '') {
                alert('Veuillez sélectionner une période');
            } else if (confirm('Voulez-vous vraiment débloquer ces dates ?')) {
                inputType.value = 'available';
                dateManagerForm.submit();
            }
        });

    }
    if (document.getElementById('user-dashboard')) {
        const charSplit = Splitting({ by: 'chars' });
        //////////// Navigation Apparition ////////////
        let tl = gsap.timeline({ paused: true }).to('.wrapper-infos', { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power1.inOut' }, 'start')
            .to('.main-logo .sup .char', { y: 0, stagger: .08, duration: 1, delay: 1, ease: 'power1.inOut' }, 'start')
            .to('.main-logo .sub .char', { y: 0, stagger: .08, duration: 1, delay: 1.5, ease: 'power1.inOut' }, 'start');
        tl.play();
    }
});
