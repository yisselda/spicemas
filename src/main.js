import './css/base.css';
import './css/countdown.css';

import { start as startCountdown } from './js/countdown.js';
import { initConfetti } from './js/confetti.js';

startCountdown();
initConfetti(document.getElementById('confetti-canvas'));
