// Use a simple in-memory variable instead of localStorage
let darkmode = null;
const themeSwitch = document.getElementById('theme-switch');
const logoImages = document.querySelectorAll('.logo');

// Check if user prefers dark mode from their system settings
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    darkmode = 'active';
    logoImages.forEach(logo => {
        logo.src = logo.src.includes('/content/') 
            ? '../../images/small white.png' 
            : '../../images/small white.png';
        logo.alt = 'white version';
    });
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    darkmode = null;
    logoImages.forEach(logo => {
        logo.src = logo.src.includes('/content/') 
            ? '../../images/small black.png' 
            : '../../images/small black.png';
        logo.alt = 'black version';
    });
}

// Check system preference on load
if (prefersDarkScheme.matches) {
    enableDarkmode();
}

themeSwitch.addEventListener('click', () => {
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// Optional: Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    e.matches ? enableDarkmode() : disableDarkmode();
});

//let darkmode = localStorage.getItem('darkmode')
//const themeSwitch = document.getElementById('theme-switch')
///const logoImages = document.querySelectorAll('.logo')

//const enableDarkmode = () => {
    //document.body.classList.add('darkmode')
    //localStorage.setItem('darkmode', 'active')
    //logoImages.forEach(logo => {
        //logo.src = '/images/small white.png'
        //logo.alt = 'white version'
    //})
//}

//const disableDarkmode = () => {
    //document.body.classList.remove('darkmode')
    //localStorage.setItem('darkmode', null)
    //logoImages.forEach(logo => {
        //logo.src = 'images/small black.png'
        //logo.alt = 'black version'
    //})
 
//}
//if (darkmode === 'active') enableDarkmode()

//themeSwitch.addEventListener('click', () => {
    //darkmode = localStorage.getItem('darkmode')
    //darkmode !== "active" ? enableDarkmode() : disableDarkmode()

//} )
