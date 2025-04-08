// Variables to manage the countdown timer
let countdown; // Stores the interval ID for the countdown
let isPaused = false; // Tracks whether the countdown is paused
let timeLeft = { hours: 0, minutes: 0, seconds: 0 }; // Object to store the remaining time

// DOM elements for buttons and the timer display
let pauseButton = document.getElementById('pauseButton');
let clearButton = document.getElementById('clearButton');
let startButton = document.getElementById('startButton');
let timerDisplay = document.getElementById('timerDisplay');

// Function to start the countdown
function startCountdown() {
    // Retrieve input values for hours, minutes, and seconds
    timeLeft.hours = Number(document.getElementById("hours").value) || 0;
    timeLeft.minutes = Number(document.getElementById("minutes").value) || 0;
    timeLeft.seconds = Number(document.getElementById("seconds").value) || 0;

    // Validate that at least one time value is entered
    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        alert("Please enter a valid time.");
        return;
    }

    // Clear any existing countdown and reset the pause state
    clearInterval(countdown);
    isPaused = false;

    // Start the countdown interval
    countdown = setInterval(function () {
        if (!isPaused) {
            // Decrease seconds, and adjust minutes and hours if necessary
            if (timeLeft.seconds > 0) {
                timeLeft.seconds--;
            } else if (timeLeft.minutes > 0) {
                timeLeft.minutes--;
                timeLeft.seconds = 59;
            } else if (timeLeft.hours > 0) {
                timeLeft.hours--;
                timeLeft.minutes = 59;
                timeLeft.seconds = 59;
            }

            // Update the timer display
            timerDisplay.textContent = formatTime(timeLeft);

            // Stop the countdown when time reaches zero
            if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                clearInterval(countdown);
                alert("Time is up!");
            }
        }
    }, 1000); // Executes every second

    // Update button visibility
    startButton.classList.add('d-none'); // Hide the Start button
    pauseButton.classList.remove('d-none'); // Show the Pause button
    clearButton.classList.remove('d-none'); // Show the Clear button
}

// Function to pause or resume the countdown
function pauseCountdown() {
    isPaused = !isPaused; // Toggle the pause state
    pauseButton.innerHTML = isPaused ? "Resume" : "Pause"; // Update button text
}

// Function to clear the countdown and reset everything
function clearCountdown() {
    clearInterval(countdown); // Stop the countdown interval
    // Reset input fields and timer display
    document.getElementById("hours").value = '';
    document.getElementById("minutes").value = '';
    document.getElementById("seconds").value = '';
    timerDisplay.textContent = "00:00:00";
    isPaused = true; // Set the countdown to a paused state

    // Update button visibility
    startButton.classList.remove('d-none'); // Show the Start button
    pauseButton.classList.add('d-none'); // Hide the Pause button
    clearButton.classList.add('d-none'); // Hide the Clear button
}

// Function to format the time as HH:MM:SS
function formatTime(time) {
    let hours = time.hours;
    let minutes = time.minutes;
    let seconds = time.seconds;

    // Add leading zeros to single-digit values
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${hours}:${minutes}:${seconds}`; // Return formatted time
}
