const internshipEl = document.querySelector("#internship");
const resumeCountEl = document.querySelector("#resumeCount");

// start the increment loop
var timer = setInterval(incrementResumes, randTime());

// scroll to internship and change colors
function internshipOn() {
    internshipEl.innerHTML = `<span id="color-change">Internship.</span>`;
    scrollToElement(internshipEl);
}

// scroll to an element on the screen, centered
function scrollToElement(element) {
    let position = 0;
    while(element != null) {
        position += element.offsetTop;
        element = element.offsetParent;
        window.scrollTo({top: position - window.innerHeight/2, behavior: 'smooth'}); 
    }
}

// increment resume count on loop
function incrementResumes() {
    resumeCountEl.innerText = Number(resumeCountEl.innerText) + 1;
    clearInterval(timer);
    timer = setInterval(incrementResumes, randTime());
}

// retruns a random time in ms
function randTime() {
    return (100 + Math.random()*1000);
}