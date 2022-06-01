leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song=""
song1="";
scoreLeftWrist=0;
songStatus="";

function preload(){
    song=loadSound("rickroll.mp3");
    song1=loadSound("sovietmarch.mp3");
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function setup(){
    canvas=createCanvas(500,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500)

    fill("#33f982");
    stroke("#fb01fb");

    song=song.isPlaying();
    song1=song1.isPlaying();

    songStatus=song1;
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(songStatus=="false"){
            song.play();
            document.getElementById("song_n").innerHTML=song;
        }
    }
    songStatus=song2;
    if(scoreWightWrist>0.2){
        circle(RightWristX, RightWristY, 20);
        song2.stop();
        if(songStatus=="false"){
            song.play();
            document.getElementById("song_n").innerHTML=song2;
        }
    }
}