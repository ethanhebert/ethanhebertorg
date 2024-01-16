const containerNames = ["PORTFOLIO", "ABOUT", "CONTACT", "", "", "", "GITHUB", "RESUME", "PAPERS"];
const containerLinks = ["./portfolio.html", "./about.html", "./contact.html", "", "", "", "https://github.com/ethanhebert", "./files/HebertEthanResume.pdf", ""];
const papers = ["./files/chatGPTinEducation.pdf", "./files/dall-eImageOfMan.pdf"];
const linkLocations = ["_self", "_self", "_self", "", "", "", "_blank", "_blank", "_blank"];
const windowsEl = document.querySelector("#windows");
const windowBackEl = document.querySelector("#windowBack");
const windowFrontEl = document.querySelector("#windowFront");

// for animations
let animationRunning = true;
let currColor = 0;
const c3animationOrder = [3, 0, 1, 2, 5, 8, 7, 6];
let c3index = 0;
let c3grid = [0, 0, 0, 1, 0, 0, 0, 0, 0];
const c4animationOrder = [
    [
    0,0,0,
    0,1,0,
    0,0,0
    ],
    [
    0,1,0,
    1,1,1,
    0,1,0
    ],
    [
    1,1,1,
    1,0,1,
    1,1,1
    ],
    [
    1,0,1,
    0,0,0,
    1,0,1
    ],
    [
    0,0,0,
    0,0,0,
    0,0,0
    ],
    [
    1,0,1,
    0,0,0,
    1,0,1
    ],
    [
    1,1,1,
    1,0,1,
    1,1,1
    ],
    [
    0,1,0,
    1,1,1,
    0,1,0
    ]
];
let c4index = 0;
let c5grid = [0, 1, 0, 1, 0, 1, 0, 1, 0];
let timeoutID = 0;
let showingPapers = false;

// if window resizes, check if you need to switch to small screen version
window.addEventListener('resize', startup);

// create the grid on startup
startup();

// fill the grid based on screen size
function startup() {
    //if (window.innerWidth > 490) {
        setFrontGrid();
        setBackGrid(-1);
    //}
    //else {
    //    setFilledGrid();
    //}    
}

// invisible grid to detect hovering
function setFrontGrid() {
    windowFrontEl.innerHTML = "";
    let frontString = "";
    for (let i=0; i<containerNames.length/3; i++) {
        frontString += '<div class="row">\n';
        for (let j=0; j<containerNames.length/3; j++)
            frontString += `<div class="container" onmouseover="setBackGrid(${3*i + j})" onmouseout="setBackGrid(-1)" onclick="clicked(${3*i + j})"></div>`;
        frontString += '</div>\n';
    }
    windowFrontEl.innerHTML = frontString;
}

// visible grid to show containers and change color on hover
function setBackGrid(hoveredContainer) {
    if (!showingPapers) {
        // end animations when you stop hovering over the square
        if (hoveredContainer == -1) {
            animationRunning = false;
            clearTimeout(timeoutID);
        }
        // clear the screen
        windowBackEl.innerHTML = "";
        let backString = "";
        // build the containers, coloring in a hovered container
        for (let i=0; i<containerNames.length/3; i++) {
            backString += '<div class="row">\n';
            for (let j=0; j<containerNames.length/3; j++) {
                if (3*i + j == hoveredContainer)
                    backString += `<div class="container" id="c${3*i + j}">${containerNames[3*i + j]}</div>`;
                else
                    backString += `<div class="container">${containerNames[3*i + j]}</div>`;
            }
            backString += '</div>\n';
        }
        windowBackEl.innerHTML = backString;
    }
}

// used to perform grid animations with an inputted array of on/off values for each container and the color
function animateGrid(containers, color) {
    // clear the screen
    windowBackEl.innerHTML = "";
    let backString = "";
    // build the containers, coloring in desired containers at desired color
    for (let i=0; i<containerNames.length/3; i++) {
        backString += '<div class="row">\n';
        for (let j=0; j<containerNames.length/3; j++) {
            if (containers[3*i + j])
                backString += `<div class="container" id="c${color}">${containerNames[3*i + j]}</div>`;
            else
                backString += `<div class="container">${containerNames[3*i + j]}</div>`;
        }
        backString += '</div>\n';
    }
    windowBackEl.innerHTML = backString;
}

// for mobile
function setFilledGrid() {
    windowBackEl.innerHTML = "";
    windowFrontEl.innerHTML = "";
    let frontString = "";
    for (let i=0; i<containerNames.length/3; i++) {
        frontString += '<div class="row">\n';
        for (let j=0; j<containerNames.length/3; j++)
            frontString += `<div class="container" id="c${3*i + j}" onclick="clicked(${3*i + j})">${containerNames[3*i + j]}</div>`;
        frontString += '</div>\n';
    }
    windowFrontEl.innerHTML = frontString;
}

// what to do when a container is clicked
function clicked(container) {
    switch (container) {
        case 3: if (!animationRunning) {
                    currColor = 3;
                    c3grid = [0, 0, 0, 1, 0, 0, 0, 0, 0];
                    c3index = 0;
                    animationRunning = true; 
                    c3animation(); }
                else
                    stopAnimation(3);
                break;
        case 4: if (!animationRunning) {
                    currColor = 4;
                    c4index = 0;
                    animationRunning = true;
                    c4animation(); }
                else
                    stopAnimation(4);
                break;
        case 5: if (!animationRunning) {
                    currColor = 5;
                    c5grid = [0, 1, 0, 1, 0, 1, 0, 1, 0];
                    animationRunning = true;
                    c5animation(); }
                else
                    stopAnimation(5);
                break;
        case 6: if (showingPapers)
                    window.open(papers[0], "_blank");
                else
                    window.open(containerLinks[container], linkLocations[container]);
                break;
        case 7: if (showingPapers)
                    window.open(papers[1], "_blank");
                else
                    window.open(containerLinks[container], linkLocations[container]);
                break;
        case 8: if (!showingPapers)
                    showPapers();
                else
                    hidePapers();
                break;
        default: if (containerLinks[container] != "") {
                    console.log("yuh")
                    window.open(containerLinks[container], linkLocations[container]); }
                break;
    }
}

// color changing spiral
function c3animation() {
    animateGrid(c3grid, currColor);
    c3index = (c3index+1) % c3animationOrder.length;
    if (!c3index)
        currColor = (currColor+1) % 9;
    for (let i=0; i<c3grid.length; i++) {
        if (i == c3animationOrder[c3index])
            c3grid[i] = 1;
        else
            c3grid[i] = 0;
    }
    timeoutID = setTimeout(c3animation, 100);
}

// wavy loop
function c4animation() {
    animateGrid(c4animationOrder[c4index], currColor);
    c4index = (c4index+1) % c4animationOrder.length;
    if (!c4index)
        currColor = (currColor+1) % 9;
    timeoutID = setTimeout(c4animation, 100);
}

// casino-style checkerboard flash
function c5animation() {
    animateGrid(c5grid, currColor);
    for (let i=0; i<c5grid.length; i++) {
        if (c5grid[i] == 0)
            c5grid[i] = 1;
        else
            c5grid[i] = 0;
    }
    timeoutID = setTimeout(c5animation, 100);
}

// stop any running animation
function stopAnimation(animNum) {
    animationRunning = false;
    clearTimeout(timeoutID);
    setBackGrid(animNum);
}

// change the containers to show research papers for selection
function showPapers() {
    showingPapers = true;
    // display papers in other containers
    windowBackEl.innerHTML = "";
    let backString = "";
    for (let i=0; i<containerNames.length/3; i++) {
        backString += '<div class="row">\n';
        for (let j=0; j<containerNames.length/3; j++) {
            if (3*i + j == 6)
                backString += `<div class="container" id="c8">CHATGPT IN EDUCATION</div>`;
            else if (3*i + j == 7)
                backString += `<div class="container" id="c8">DALL-E AND ETHICS</div>`;
            else if (3*i + j == 8)
                backString += `<div class="container" id="c8">CLOSE</div>`;
            else
                backString += `<div class="container">${containerNames[3*i + j]}</div>`;
        }
        backString += '</div>\n';
    }
    windowBackEl.innerHTML = backString;
}

// hide papers if papers tab is clicked again
function hidePapers() {
    showingPapers = false;
    setBackGrid(8);
}