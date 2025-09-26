function loadText(text) {
    document.getElementById("windowText").innerHTML = text;
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
        loadText("");
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
        loadText("<h1>Contact Info</h1><br>Mr. Wegscheid - shaun.wegscheid@springbranchisd.com<br><br>Mrs. Wegscheid - Cherly.Wegscheid@springbranchisd.com<br><br>Henson Liga - ligahen000@mysbisd.org");
        windowBackground.style.display = "block";
        windowD.offsetHeight;
        windowD.classList.add("show");
    });
}