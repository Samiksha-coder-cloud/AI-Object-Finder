status1 = "";
objects = [];

function preload() {
}

function setup() {
    canvas = createCanvas(400, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object1 = document.getElementById("object_input").value;
    console.log("Object: " + object1);
}

function modelLoaded() {
    console.log("Model is Loaded");
    status1 = true;
}

function draw() {
    image(video, 0, 0, 400, 350);

    if (status1 != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            
            percent = floor(objects[i].confidence * 100);

            fill("#ff0000");
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    if (objects[i].label == object1) {
        video.stop();
        objectDetector.detect(gotResult);

        document.getElementById("object_found").innerHTML = object1 + " Found";
        speak();
    }
    else {
        document.getElementById("object_found").innerHTML = object1 + " Not Found";
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(object1 + " Found")
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}