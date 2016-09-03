"use strict";
window.onload = function() {
    var ColorSpace = {};
    
    ColorSpace = (function() {
            var numSquares = 12,
            colors = [],
            pickedColor,
            sqaures = document.querySelectorAll(".square"),
            colorDisplay = document.getElementById("colordisplay"),
            messageDisplay = document.querySelector("#message"),
            h1 = document.querySelector("h1"),
            resetButton = document.querySelector("#reset"),
            modeButtons = document.querySelectorAll(".mode"),
            modeNumber = 0;
        
        modeButtons[1].style.color = "firebrick";
        for (var i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener("click", function() {
                this.textContent === "Easy" ? numSquares = 3 : false;
                this.textContent === "Hard" ? numSquares = 12 : false;
                this.textContent === "God" ? numSquares = 32 : false;
                if (this.textContent === "Hard") {
                    this.style.color = "firebrick";
                    modeButtons[0].style.color = "#000";
                }
                if (this.textContent === "Easy") {
                    this.style.color = "#56FF4E"; //Bright emerald
                    modeButtons[1].style.color = "#000";
                }
                if (this.textContent === "God") {
                    modeButtons[1].style.color = "#000";
                }
                if (!this.classList.contains("selected")) {
                    newGame();
                    this.classList.add("selected")
                    if (this === modeButtons[0] || this === modeButtons[2]) {
                        modeButtons[1].classList.remove("selected");
                    }
                    modeNumber++;
                }
                if(modeNumber === 2) {
                    if (this === modeButtons[1]) {
                        modeButtons[0].classList.remove("selected");
                    }
                    if (this === modeButtons[0]) {
                        modeButtons[0].classList.remove("selected");
                    }
                    modeNumber = 0;
                }
            });
        }

        function newGame() {
                colors = generateRandomeColors(numSquares);
                pickedColor = pickColor();
                colorDisplay.textContent = pickedColor;
                h1.style.background = "steelblue";
                resetButton.textContent = "New Colors";
                messageDisplay.textContent = "";
                for (var i = 0; i < sqaures.length; i++) {
                    if (colors[i]) { //checks if color is at that index
                        sqaures[i].style.display = "block";
                        sqaures[i].style.background = colors[i];
                    } else {
                        sqaures[i].style.display = "none"; 
                    }
                }
                applyRandomColors();
        }
            resetButton.addEventListener("click", function() {
               newGame();
            });
        
            newGame();
            colorDisplay.textContent = pickedColor;

        
        
        function applyRandomColors() {
            for (var i = 0; i < sqaures.length; i++){
                sqaures[i].style.background = colors[i];


                sqaures[i].addEventListener("click", function() {
                    var clickedColor = this.style.background;
                    if (clickedColor === pickedColor) {
                        messageDisplay.textContent = "Correct!";
                        resetButton.textContent = "Play Again?";
                        h1.style.background = clickedColor;
                        changeColors(clickedColor);
                    } else {
                        this.style.background = "#232323";
                        messageDisplay.textContent = "Try Again!";
                    }
                });
            }
        }
        function changeColors(color) {
            
            for (var i = 0; i < sqaures.length; i++) {
                sqaures[i].style.background = color;
            }
        }
        function pickColor() {
            var random = Math.floor(Math.random() * colors.length);
            
            return colors[random];
        }
        function generateRandomeColors(num) {
            var arr = [];
            for (var i = 0; i < num; i++) {
                arr.push(randomColor());
            }
            return arr;
        }
        function randomColor() {
            var r = Math.floor(Math.random() * 256),
                g = Math.floor(Math.random() * 256),
                b = Math.floor(Math.random() * 256);
            
            return "rgb(" + r + ", " + g + ", " + b +")";
        }
        applyRandomColors();
    }());
}
