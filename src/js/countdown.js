const SPICEMAS_DATE = new Date('2026-08-10T06:00:00-04:00');

const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

let timerId = null;

function update() {
    const diff = SPICEMAS_DATE - Date.now();

    if (diff <= 0) {
        els.days.textContent = '0';
        els.hours.textContent = '00';
        els.minutes.textContent = '00';
        els.seconds.textContent = '00';
        stop();
        return;
    }

    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);

    set(els.days, String(d));
    set(els.hours, String(h).padStart(2, '0'));
    set(els.minutes, String(m).padStart(2, '0'));
    set(els.seconds, String(s).padStart(2, '0'));
}

function set(el, value) {
    el.textContent = value;
    el.dataset.value = value;
}

export function start() {
    update();
    timerId = setInterval(update, 1000);
}

export function stop() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}
