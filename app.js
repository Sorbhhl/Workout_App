const song = document.querySelector('.song')
const play = document.querySelector('.play-btn')
const displayWorkout = document.querySelector('.current-workout')
const countDownContainer = document.querySelector('.cont-countdown-circle')
const countDownSpan = document.querySelector('.countdownCont span')

//Time display
const timeDisplay = document.querySelector('.time-display')
const timeSelect = document.querySelectorAll('.workout_config button')

//Duration
let singleWorkoutDuration = 30;
let defaultDuration = 300;
let workoutRepetitions = 2;

//Exercises
let currentWorkoutCont = document.querySelector('.current-workout-img');
let currentWorkout = document.querySelector('.current-workout-img img');
const exercises =["./resources/gifs/a93c82108677535.5fc3684e78f67.gif",
    "./resources/gifs/c700df108677535.5fc364926db90.gif",
    "./resources/gifs/3dec53108677535.5fc364926eaa1.gif",
    "./resources/gifs/47a59d108677535.62c7ebd2c9907.gif",
    "./resources/gifs/a258b2108677535.5fc364926e4a7.gif"
]

//Change workout duration
timeSelect.forEach(option =>{
    option.addEventListener('click', function() {
        defaultDuration = this.getAttribute('data-time');
        if (defaultDuration == 300){
            workoutRepetitions = 2
        }else if(defaultDuration == 600){
            workoutRepetitions = 4
        }else{
            workoutRepetitions = 6
        }    
    })
})

//Start workout
play.addEventListener('click', () => {
    checkPlaying(song);
})

//function changes on play and stop the workout
const checkPlaying = (song) =>{
    if(song.paused) {
        workoutOnStart(song, play, displayWorkout, workoutRepetitions);
    }else{
        workoutOnStop(song, play, displayWorkout, workoutRepetitions);
    }
}

const workoutOnStart = (song, play, displayWorkout, workoutRepetitions) => {
    //Start song and workout
    song.play();
    play.classList.add("play-btn-on-pause");
    play.textContent = "◼"
    displayWorkout.style.height = "75%";
    changeCurrentWorkout(workoutRepetitions);
}

const workoutOnStop = (song, play, displayWorkout, workoutRepetitions) => {
    //Stop song and workout
    song.pause();
    play.classList.remove("play-btn-on-pause");
    play.textContent = "▶"
    displayWorkout.style.height = "0%";
    //Restart workout
    //changeCurrentWorkout.pause();
    countDownSpan.textContent = '';
    currentWorkout.src = exercises[0];
}

//Song and timer countdown
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = singleWorkoutDuration - currentTime;
    let seconds = '';
    let minutes = '';
    if (currentWorkoutCont.style.display == 'block'){
        seconds = Math.floor(elapsed % 60);
        minutes = Math.floor(elapsed / 60);
    }else{
        song.currentTime = 0;
        seconds = '00';
        minutes = '0'
    }
    //Animate the timeDisplay
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= singleWorkoutDuration){
        song.currentTime = 0;
    }
} 

//Change workout exercise every 30 seconds and 7 seconds of rest
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const changeCurrentWorkout = async (workoutRepetitions) =>{
    for (let i=0 ; i<workoutRepetitions; i++){
        for (let i=0 ; i<5 ; i++){
            //3, 2, 1 Go!
            currentWorkoutCont.style.display = 'none';
            //timeDisplay.style.display = 'none';
            countDownContainer.style.display = 'block';
            timer();
            await sleep(7000);
            //Start the workout!        
            currentWorkout.src = exercises[i];
            currentWorkoutCont.style.display = 'block';
            timeDisplay.style.display = 'block';
            countDownContainer.style.display = 'none';
            await sleep(5000);
            if(play.textContent == "▶"){
                return
            }
        }
    }
}

//Counter between exercises
const timer = () => {
    let counter = 5;
    countDownContainer.style.display = 'block';
    let timer = setInterval( () => {
        countDownSpan.textContent = (counter==0?'GO!':counter);
        counter--;
        if (counter == -1) clearInterval(timer);
    }, 1000);
    countDownSpan.textContent = '';
}