status1 = "";

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
    object=document.getElementById("object_input").value;
    console.log("Object: " + object);
}

function modelLoaded() {
    console.log("Model is Loaded");
    status1 = true;
}

function draw() {
    image(video, 0, 0, 400, 350);
}