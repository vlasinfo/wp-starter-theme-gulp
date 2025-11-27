// main.js
import initPreloader from './modules/preloader.js';
import initHero from './modules/hero.js';
import initHeader from './modules/header.js';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();

  // Make sure hero + header run only once
  const onPreloaderFinish = () => {
    initHeader();
    initHero();

    // Remove listener after it fires once
    document.removeEventListener('preloaderFinished', onPreloaderFinish);
  };

  document.addEventListener('preloaderFinished', onPreloaderFinish);
});
