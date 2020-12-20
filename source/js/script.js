// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

let currentScreenName = ``;
document.body.addEventListener(`beforeScreenChanged`, (e) => {
  const {screenName, done} = e.detail;

  if (currentScreenName === `story` && screenName === `prizes`) {
    showCurtain(done);
  } else {
    done();
  }

  if (screenName === `rules`) {
    handleRulesScreen();
  }

  currentScreenName = screenName;
});


function handleRulesScreen() {
  const rulesLink = document.querySelector(`.js-rules-link`);
  animateWidth(rulesLink);
}

function animateWidth(el) {
  const {width} = getComputedStyle(el);
  el.style.width = 0;
  getComputedStyle(el).width;
  el.style.width = width;
  el.addEventListener(`transitionend`, (e) => {
    el.style.width = `auto`;
  }, {once: true});
}

function showCurtain(done) {
  const curtain = document.querySelector(`.js-screen-curtain`);
  curtain.addEventListener(`transitionend`, () => {
    done();
    curtain.style.opacity = 0;
    curtain.classList.remove(`--visible`);
    curtain.addEventListener(`transitionend`, () => {
      curtain.style.opacity = 1;
    }, {once: true});
  }, {once: true});
  curtain.classList.add(`--visible`);
}

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

function main() {
  document.body.classList.add(`loaded`);
}

window.main = main;
