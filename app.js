const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play-btn')
    const displayWorkout = document.querySelector('.current-workout')
    const countDownSpan = document.querySelector('.countdownCont span')
    const countDownContainer = document.querySelector('.cont-countdown-circle')

    //Time display
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.workout_config button')

    //Duration
    let fakeDuration = 30;

    //Exercises
    let currentWorkoutCont = document.querySelector('.current-workout-img');
    let currentWorkout = document.querySelector('.current-workout-img img');
    const exercises =["./resources/gifs/a93c82108677535.5fc3684e78f67.gif",
        "./resources/gifs/c700df108677535.5fc364926db90.gif",
        "./resources/gifs/3dec53108677535.5fc364926eaa1.gif",
        "./resources/gifs/47a59d108677535.62c7ebd2c9907.gif",
        "./resources/gifs/a258b2108677535.5fc364926e4a7.gif"
    ]

    //Start workout
    play.addEventListener('click', () => {
        checkPlaying(song, play, displayWorkout);
    })

    //function changes on play and stop the workout
    const checkPlaying = (song, play, displayWorkout) =>{
        if(song.paused) {
            song.play();
            play.classList.add("play-btn-on-pause");
            play.textContent = "◼"
            displayWorkout.style.height = "75%";
            changeCurrentWorkout();
        }else{
            song.pause();
            play.classList.remove("play-btn-on-pause");
            play.textContent = "▶"
            displayWorkout.style.height = "0%";
            //Restart workout
            song.currentTime = 0;
            changeCurrentWorkout.stop();
            currentWorkout.src = exercises[0];
        }
    }

    //Change workout duration
    timeSelect.forEach(option =>{
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })

    //Song and timer countdown
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        //Animate the timeDisplay
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            //play.src = ''
        }
    }

    //Change workout exercise every 30 seconds and 7 seconds of rest
    const sleep = async (milliseconds) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });
    };

    const changeCurrentWorkout = async () =>{
        for (let i=0 ; i<5 ; i++){
            //Reset timer and change exercise
            currentWorkoutCont.style.display = 'block';
            song.currentTime = 0;            
            currentWorkout.src = exercises[i];
            await sleep(5000);
            //After 30 seconds, rest for 7 seconds
            currentWorkoutCont.style.display = 'none';
            timer();
            await sleep(7000);
            countDownContainer.style.display = 'none';
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
    }   
}

app();