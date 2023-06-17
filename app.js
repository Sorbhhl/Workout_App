const song = document.querySelector('.song')
const play = document.querySelector('.play-btn')
const displayWorkout = document.querySelector('.current-workout')
const countDownContainer = document.querySelector('.cont-countdown-circle')
const countDownSpan = document.querySelector('.countdownCont span')
const barValFullWk = document.querySelector('.bar-value-full-wk')
const getReadyContainer = document.querySelector('.get-ready-cont')

//Time display
const timeDisplay = document.querySelector('.time-display')
const timeSelect = document.querySelectorAll('.workout_config button')

//Duration
let singleWorkoutDuration = 30;
let defaultDuration = 300;
let workoutRepetitions = 2;
//Full workout progress
const progressWkValue = document.querySelector('.progressbar_value');
const progressWk = document.querySelector('progress');
let progressBarWk = 0;

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
        if (defaultDuration == 370){ //300 seconds (5 minutes) + 7 seconds of rest each workout (70 seconds)
            workoutRepetitions = 2
            barValFullWk.textContent = '6 minutes'
        }else if(defaultDuration == 740){ //600 seconds (10 minutes) + 7 seconds of rest each workout (140 seconds)
            workoutRepetitions = 4
            barValFullWk.textContent = '12 minutes'
        }else{ //900 seconds (15 minutes) + 7 seconds of rest each workout (210 seconds)
            workoutRepetitions = 6
            barValFullWk.textContent = '18 minutes'
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
    timeSelect[0].disabled = true;
    timeSelect[1].disabled = true;
    timeSelect[2].disabled = true;
}

const workoutOnStop = (song, play, displayWorkout, workoutRepetitions) => {
    //Stop song and workout
    song.pause();
    play.classList.remove("play-btn-on-pause");
    play.textContent = "▶"
    displayWorkout.style.height = "0%";
    timeSelect[0].disabled = false;
    timeSelect[1].disabled = false;
    timeSelect[2].disabled = false;
    //Restart workout
    countDownSpan.textContent = '';
    currentWorkout.src = exercises[0];
    workoutRepetitions = 0;
    song.currentTime = 0;
}

//Progress bar for the full workout routine
const setBarValue = (value) => {
    progressWkValue.style.width = `${value}%`;
    progressWk.value = value;
}

//Song and progress workout bar
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    progressBarWk = currentTime*100/defaultDuration;
    setBarValue(progressBarWk);
}

//Change workout exercise every 30 seconds and 7 seconds of rest
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const changeCurrentWorkout = async (workoutRepetitions) =>{
    for (let n=0 ; n<workoutRepetitions; n++){
        for (let i=0 ; i<5 ; i++){
            //3, 2, 1 Go!
            currentWorkout.src = exercises[i];
            currentWorkout.style.height = '200px';
            getReadyContainer.style.display = 'block';
            timer();
            await sleep(7000);
            //Start the workout!   
            currentWorkout.style.height = '100%';  
            let workoutCounter = 30;
            workoutTimer(workoutCounter); 
            getReadyContainer.style.display = 'none';
            await sleep(5000);
            if(play.textContent == "▶"){
                return
            }
        }
        console.log(`Workout round: ${n+1}`)
    }
    currentWorkout.src = './resources/gifs/congrats.gif';
    await sleep(3000);
    play.textContent = "Restart workout"
}

//Exercises counter
const workoutTimer = (workoutCounter) => {
    let workoutTimer = setInterval( () => {
        timeDisplay.textContent = (workoutCounter<10?`0:0${workoutCounter}`:`0:${workoutCounter}`)
        workoutCounter--;
        if (workoutCounter == -1 || play.textContent == "▶") clearInterval(workoutTimer);
    }, 1000)
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