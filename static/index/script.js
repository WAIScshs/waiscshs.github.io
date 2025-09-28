let currentIndex = 0;
let texts = []
let images = []

const regularWidth = 1920;
const regularHeight = 995;
let currentWidth;
let currentHeight;

function loadText(text, image = ["images/Frame 31.png"]) {
    currentIndex = 0;
    if (Array.isArray(text)) {
        texts = text;
    } else if (typeof text === "string") {
        texts = [text];
    } else {
        texts = [""]
    }

    if (Array.isArray(image)) {
        images = image;
    } else if (typeof image === "string") {
        images = [image];
    }
    
    loadFrame();
}

function loadSizes() {
    let vector1 = document.getElementById("vector1");
    const vector2 = document.getElementById("vector2");
    const logo = document.querySelector(".container img");

    
    
    if (vector1 === null) {
        vector1 = document.querySelectorAll("div canvas")[0];
    }

    logo.style.width = currentHeight * 0.45 + "px";
    logo.style.height = currentHeight * 0.45 * 0.3333 + "px";

    vector1.style.width = currentWidth * 1.5 + "px";
    vector1.style.height = currentHeight + "px";
    vector1.style.left = -(currentWidth * 1.5 - window.innerWidth)/2 + "px";
    vector1.style.bottom = -currentHeight * 0.25 + "px";

    vector2.style.width = currentWidth * 1.6 + "px";
    vector2.style.height = currentHeight + "px";
    vector2.style.left = -(currentWidth * 1.6 - window.innerWidth)/2 + "px";
    vector2.style.bottom = -currentHeight * 0.43 + "px";
}

function loadFrame() {
    document.getElementById("windowText").innerHTML = texts[currentIndex];
    document.getElementById("windowImage").src = images[currentIndex] === "" ? "images/Frame 31.png" : images[currentIndex];
}

function getNextMeeting(refDate, today) {
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysInBetween = 14;
    const daysSinceRef = Math.floor((today - refDate) / msPerDay);
    const daysUntilNext = daysInBetween - (daysSinceRef % daysInBetween);
    const nextMeeting = new Date(today.getTime() + (daysUntilNext * msPerDay));
    return nextMeeting;
}

window.onload = function() {

    currentWidth = window.innerWidth;
    currentHeight = window.innerHeight;
    if (currentHeight / regularHeight < currentWidth / regularWidth) {
        currentHeight = currentWidth/regularWidth * regularHeight;
    } else {
        currentWidth = currentHeight/regularHeight * regularWidth;
    }
    currentHeight = parseInt(currentHeight);
    currentWidth = parseInt(currentWidth);

    window.addEventListener("resize", function() {
        currentWidth = window.innerWidth;
        currentHeight = window.innerHeight;
        if (currentHeight / regularHeight < currentWidth / regularWidth) {
            currentHeight = currentWidth/regularWidth * regularHeight;
        } else {
            currentWidth = currentHeight/regularHeight * regularWidth;
        }
        currentHeight = parseInt(currentHeight);
        currentWidth = parseInt(currentWidth);
        loadSizes();
    });

    setTimeout(loadSizes, 100);

    let mouseX = 0;
    let mouseY = 0;

    const image = document.getElementById("vector1");
    var canvas = fx.canvas();
    var texture = canvas.texture(image);
    
    image.parentNode.insertBefore(canvas, image);
    image.parentNode.removeChild(image);
    canvas.draw(texture).update();
    
    window.addEventListener("mousemove", function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.pageX - rect.left;
        mouseY = e.pageY - rect.top;

        mouseX = ((mouseX - canvas.width/2)/2) + canvas.width/2;
        mouseY = ((mouseY - canvas.height/2)/2) + canvas.height/2;

        canvas.draw(texture)
            .zoomBlur(parseInt(mouseX), parseInt(mouseY), 0.2)
            .update();
    });


    const windowBackground = document.getElementById("windowBackground");
    const windowD = document.getElementById("windows");

    windowBackground.addEventListener("click", function (event) {
        if (event.target.id === "windowBackground") {
            windowD.classList.remove("show");
            setTimeout(function() {
                windowBackground.style.display = "none";
            }, 500);
        }
    });

    windowD.addEventListener("click", function() {
        if (texts.length < 2) return;
        currentIndex++;
        currentIndex %= texts.length;
        windowD.classList.add("tuck");
        setTimeout(function() {
            loadFrame();
            windowD.classList.remove("tuck");
        }, 600);
    });

    const projects = document.getElementById("projects");
    const members = document.getElementById("members");
    const meetings = document.getElementById("meetings")
    const contact = document.getElementById("contact");

    projects.addEventListener("click", function() {
        loadText("");
        windowBackground.style.display = "block";
        windowD.offsetHeight;
        windowD.classList.add("show");
    });

    members.addEventListener("click", function() {
        const henson = "<h1>Henson L.</h1><br>Henson is our current president and he started the club";
        const paisley = "<h1>Paisley T.</h1><br>Paisley is our current vice president.";
        const samuel = "<h1>Samuel D.</h1><br>Samuel is our secretary officer.";
        const marcus = "<h1>Marcus W.</h1><br>Marcus is our public relations officer";
        const sergio = "<h1>Sergio A.</h1><br>Sergio is our web master"
        const siddhant = "<h1>Siddhant S.</h1><br>Siddhant is Sergio's trainee for the web master."

        loadText(
            [henson, paisley, samuel, marcus, sergio, siddhant],
            ["images/Member/rando.jpeg", "images/Member/rando.jpeg", "images/Member/Sam.jpg", "images/Member/Marcus.png", "images/Member/Sergio.jpg", "images/Member/rando.jpeg"]
        );
        windowBackground.style.display = "block";
        windowD.offsetHeight;
        windowD.classList.add("show");
    });

    const firstMeeting = new Date('2025-9-18');
    meetings.addEventListener("click", function() {
        const today = new Date();
        const nextMeetingDate = getNextMeeting(firstMeeting, today);
        const daysUntilMeeting = Math.ceil((nextMeetingDate - today) / (1000 * 60 * 60 * 24));
        const meetingInfo = `<h1>Meeting Schedule</h1><br>We will be hosting our next meeting on ${nextMeetingDate.toLocaleDateString()}<br><br>${daysUntilMeeting} days untill the next CSHS meeting<br><br>We host our meetings every other week in room A125`;
        loadText(meetingInfo);
        windowBackground.style.display = "block";
        windowD.offsetHeight;
        windowD.classList.add("show");
    });

    contact.addEventListener("click", function() {
        loadText("<h1>Contact Info</h1><br>Mr. Wegscheid: shaun.wegscheid@springbranchisd.com<br><br>Mrs. Wegscheid: Cherly.Wegscheid@springbranchisd.com<br><br>Henson Liga: ligahen000@mysbisd.org");
        windowBackground.style.display = "block";
        windowD.offsetHeight;
        windowD.classList.add("show");
    });
}