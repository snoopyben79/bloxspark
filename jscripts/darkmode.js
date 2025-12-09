let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')
const logoImages = document.querySelectorAll('.logo')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
    logoImages.forEach(logo => {
        logo.src = '/images/small white.png'
        logo.alt = 'white version'
    })
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    logoImages.forEach(logo => {
        logo.src = '/images/small black.png'
        logo.alt = 'black version'
    })
 
}
if (darkmode === 'active') enableDarkmode()

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
} )