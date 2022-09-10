let video=document.querySelector("video");
let captureBtnCont=document.querySelector(".capture-btn-cont");
let captureBtn=document.querySelector(".capture-btn");
let recordBtn=document.querySelector(".record-btn");
let recordBtnCont=document.querySelector(".record-btn-cont");
let transparentColor="transparent";
let chunks=[];
let shouldRecord=false;
let timer=document.querySelector('.timer');
let recorder;
let contraints={
    video:true,
    audio:false
}

navigator.mediaDevices.getUserMedia(contraints).then((stream)=>{
    video.srcObject=stream;

    recorder=new MediaRecorder(stream);
    recorder.addEventListener("start",()=>{
        //memory
        chunks=[];
        console.log('video started');
    })

    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
        console.log('video getting recorded');
    })

    recorder.addEventListener("stop",()=>{
        //convert video
        let blob=new Blob(chunks,{type: 'video/mp4' });
        console.log('video stopped');
        let videoURL=URL.createObjectURL(blob);
        //download video
        let a=document.createElement('a');
        a.href=videoURL;
        a.download="myVideo.mp4";
        a.click();
        //store in database

    })
})

captureBtnCont.addEventListener("click",()=>{
    captureBtn.classList.add('scale-capture');
    let canvas=document.createElement("canvas");
    let tool=canvas.getContext("2d");
    canvas.width=video.videoWidth;
    canvas.height=video.videoHeight;

    tool.drawImage(video,0,0,canvas.width,canvas.height);
    tool.fillStyle=transparentColor;
    tool.fillRect(0,0,canvas.width,canvas.height);
    let imageURL=canvas.toDataURL();
    // let img=document.createElement("img");
    // img.src=imageURL;
    // document.body.append(img);
    setTimeout(()=>{
        captureBtn.classList.remove("scale-capture");
    },510);
});

recordBtnCont.addEventListener("click",()=>{
    shouldRecord=!shouldRecord;
    if(shouldRecord)
    {
        //recording start
        recordBtn.classList.add("scale-record");
        recorder.start();
        //start timer
        startTimer();
    }
    else
    {
        recordBtn.classList.remove("scale-record");
        //stop recording
        recorder.stop();
        // end timer
        stopTimer();
    }
})


let counter=0;
let timerId;
function startTimer()
{
    timer.style.display='block';
    function displayTimer()
    {
        let totalSeconds=counter;

        let hours=Number.parseInt(totalSeconds/3600);
        totalSeconds=totalSeconds%3600;

        let minutes=Number.parseInt(totalSeconds/60);
        totalSeconds=totalSeconds%60;

        let seconds=totalSeconds;

        hours = (hours < 10) ? `0 ${hours}` : hours;
        minutes = (minutes < 10) ? `0 ${minutes}` : minutes;
        seconds = (seconds < 10) ? `0 ${seconds}` : seconds;

        timer.innerText=`${hours}:${minutes}:${seconds}`;

        counter++;
    }
    timerId=setInterval(displayTimer,1000);
}

function stopTimer(timerID) {
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = 'none';
}


let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");

allFilters.forEach((filterElem) => {
    filterElem.addEventListener('click', () => {
        transparentColor = getComputedStyle(filterElem).getPropertyValue('background-color');
        filterLayer.style.backgroundColor = transparentColor;
    })
})
