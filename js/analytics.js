// Google Analytics для CineWave

const GA_ID = "G-YEH5F5LHJF";

const script = document.createElement("script");
script.async = true;
script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;

document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", GA_ID);
