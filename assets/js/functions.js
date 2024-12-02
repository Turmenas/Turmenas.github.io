//Darkmode toggle

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-toggle');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if(darkmode === 'active') enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode'); // Update the value of darkmode
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

//Scroll to top

const scrollToggle = document.getElementById('scroll-toggle');

scrollToggle.addEventListener("click", () => {
    window.scrollTo(0, 0)
});