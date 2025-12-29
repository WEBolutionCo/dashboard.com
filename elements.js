const projects = [
    {
        name: "calculator",
        spClass: "calc",
        heading: "Calculator",
        UI: "Frosted Glass UI",
        HTML: `
        <div class="calc-container">
            <input type="text" id="display" readonly>
            <div id="keys-container">
                <button class="keys control" onclick="addToInput('+')">+</button>
                <button class="keys" onclick="addToInput('7')">7</button>
                <button class="keys" onclick="addToInput('8')">8</button>
                <button class="keys" onclick="addToInput('9')">9</button>
                <button class="keys control" onclick="addToInput('-')">-</button>
                <button class="keys" onclick="addToInput('6')">6</button>
                <button class="keys" onclick="addToInput('5')">5</button>
                <button class="keys" onclick="addToInput('4')">4</button>
                <button class="keys control" onclick="addToInput('*')">*</button>
                <button class="keys" onclick="addToInput('3')">3</button>
                <button class="keys" onclick="addToInput('2')">2</button>
                <button class="keys" onclick="addToInput('1')">1</button>
                <button class="keys control" onclick="addToInput('/')">/</button>
                <button class="keys" onclick="addToInput('0')">0</button>
                <button class="keys" onclick="addToInput('.')">.</button>
                <button class="keys" onclick="calculate()">=</button>
                <button class="keys control" onclick="clearDisplay()">AC</button>
                <button class="keys control" onclick="clearLast()">DC</button>
            </div>
        </div>`,
        CSS:`
        .domain {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 100dvw;
            z-index: 20;
            pointer-events: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            font-family: 'Outfit', sans-serif;
            background: conic-gradient(#eee, #ccc, #bbb, #999, #777, #555, #444, #666, #888, #aaa, #ccc, #eee);
            background-size: cover;
        }
        
        .calc-container {
            background: #1212124D;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            overflow: hidden;
            max-width: 270px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 13px;
        }
        
        .keys {
            width: 47px;
            aspect-ratio: 1/1;
            border-radius: 50%;
            border: none;
            background: #333;
            color: #fff;
            font-size: 1.22rem;
            font-weight: 300;
            font-family: 'Outfit', sans-serif;
        }
        
        #keys-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            padding: 10px;
        }
        
        .control {
            background: linear-gradient(to right, #ed941f, #cf7704);
        }
        
        #display {
            background: #111111aa;
            width: 100%;
            height: 60px;
            border: none;
            outline: none;
            color: #fff;
            font-weight: 200;
            font-size: 28px;
            padding: 8px 12px;
        }`,
        JS: () => {
            var display = document.getElementById("display");

            var addToInput = function(input) {
                if (display.value.length < 16) {
                    display.value += input;
                }
            };
            
            var clearDisplay = function() {
                display.value = "";
            };
            
            var clearLast = function() {
                display.value = display.value.slice(0, -1);
            };
            
            var calculate = function() {
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = "Error";
                }
            };
            
            if (!window.__calcKeyHandlerAdded) {
                window.__calcKeyHandlerAdded = true;
                
                document.addEventListener("keydown", function(e) {
                    if (e.key >= "0" && e.key <= "9") {
                        addToInput(e.key);
                    } else if (["+", "-", "*", "/", "."].includes(e.key)) {
                        addToInput(e.key);
                    } else if (e.key === "Enter" || e.key === "=") {
                        calculate();
                    } else if (e.key === "Backspace") {
                        clearLast();
                    } else if (e.key === "Delete" && e.ctrlKey) {
                        clearDisplay();
                    }
                });
            }
        }
    }, // calculator 
    {
        name: "stopwatch",
        spClass: "stop",
        heading: "Stopwatch",
        UI: "RGB UI",
        HTML: `
        <div class="card-cont">
            <div class="card">
                <h2 id="timer">00:00<span class="mili-seconds">00</span></h2>
                <div class="button-div">
                    <button class="btn reset" onclick="resetTimer()">
                        <i class="fas fa-stop"></i>
                    </button>
                    <button class="btn play" onclick="playTimer()">
                        <i class="fas fa-play" id="fPlay"></i>
                    </button>
                    <button class="btn copy" onclick="copyTimer()">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        </div>`,
        CSS: `
        .domain {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 100dvw;
            z-index: 20;
            pointer-events: auto;
            background: linear-gradient(
            135deg,
            #1a0e13,  /* Deep wine red */
            #1e1b12, /* Dark olive drab */
            #102620,  /* Dark desaturated green/teal */
            #0c1a2b, /* Muted navy */
            #2b0c1b   /* Dark plum red */
            );
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        #timer {
            font-size: 28px;
            font-family: sans-serif, monospace;
            font-weight: 300;
        }
        
        .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 300px;
            padding: 32px;
            background: #121212;
            color: #ddd;
            border-radius: 8px;
            position: relative;
        }
        
        .card::after {
            content: '';
            position: absolute;
            z-index: -1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            padding: 2px;
            border-radius: 10px;
            background: conic-gradient(
                from var(--angle),
                #ff4ecd,
                #ff007c,
                #00b7ff,
                #ffe600,
                #00ffc3,
                #ff4ecd
            );
            animation: spin 5s linear infinite;
        }
        
        
        .card::before {
            content: '';
            position: absolute;
            transform: translate(-50%, -50%);
            z-index: -1;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            background: conic-gradient(
                from var(--angle),
                #ff4ecd,   /* Neon pink/plum */
                #ff007c,   /* Neon pinkish red */
                #00b7ff,   /* Neon blue */
                #ffe600,   /* Neon yellow */
                #00ffc3,   /* Neon teal */
                #ff4ecd    /* back to start */
            );
            padding: 2px;
            filter: blur(16px);
            opacity: 0.5;
            animation: spin 5s linear infinite;
        }
        
        @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }
        
        @keyframes spin {
            0% {
                --angle: 0deg;
            } 100% {
                --angle: 360deg;
            }
        }
        
        .button-div {
            width: 100%;
            display: flex;
            padding: 8px 0;
            justify-content: space-around;
            margin-top: 16px;
        }
        
        .btn {
            aspect-ratio: 1/1;
            width: 50px;
            border-radius: 25%;
            border: none;
            cursor: pointer;
            color: #ddd;
            background: #000;
        }
        
        .play {
            border: solid 2px #00b7ff;
            font-size: 14px;
        }
        
        .reset {
            border: solid 2px #00ffc3;
        }
        
        .copy {
            border: solid 2px #ff007c;
        }
        
        .mili-seconds {
            font-size: 22px;
            margin-left: 4px;
            font-family: sans-serif, monospace;
        }`,
        JS: () => {
            var timer = document.getElementById("timer");

            var shouldCount = false;
            var intervalId = null;
            
            var miliSeconds = 0;
            var seconds = 0;
            var minutes = 0;
            
            var updateUI = function() {
                var mi = miliSeconds < 10 ? "0" + miliSeconds : miliSeconds;
                var s = seconds < 10 ? "0" + seconds : seconds;
                var m = minutes < 10 ? "0" + minutes : minutes;
                
                timer.innerHTML = m + ":" + s + '<span class="mili-seconds">' + mi + "</span>";
            };
            
            var countUp = function() {
                miliSeconds++;
                if (miliSeconds >= 100) {
                    miliSeconds = 0;
                    seconds++;
                }
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                }
                updateUI();
            };
            
            window.playTimer = function() {
                shouldCount = !shouldCount;
                
                var icon = document.getElementById("fPlay");
                icon.classList.toggle("fa-play");
                icon.classList.toggle("fa-pause");
                
                if (shouldCount) {
                    intervalId = setInterval(countUp, 10);
                } else {
                    clearInterval(intervalId);
                }
            };
            
            window.resetTimer = function() {
                clearInterval(intervalId);
                intervalId = null;
                shouldCount = false;
                
                miliSeconds = 0;
                seconds = 0;
                minutes = 0;
                
                updateUI();
                
                var icon = document.getElementById("fPlay");
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            };
            
            window.copyTimer = function() {
                var mi = miliSeconds < 10 ? "0" + miliSeconds : miliSeconds;
                var s = seconds < 10 ? "0" + seconds : seconds;
                var m = minutes < 10 ? "0" + minutes : minutes;
                
                var text = m + " minutes " + s + " seconds " + mi + " milliseconds";
                navigator.clipboard.writeText(text);
            };
            
            if (!window.__stopwatchKeyHandlerAdded) {
                window.__stopwatchKeyHandlerAdded = true;
                
                document.addEventListener("keydown", function(e) {
                    if (e.key === " ") playTimer();
                    if (e.key === "Backspace") resetTimer();
                    if (e.key === "c") copyTimer();
                });
            }
        }
    }, // stopwatch
    {
        name: "quiz app",
        spClass: "quiz",
        heading: "Quiz App",
        UI: "Fantasy UI",
        HTML: `
        <div class="quiz-container">
            <h1 class="heading">Quiz App</h1>
            <div id="ques-cont"></div>
            <div class="btn-cont">
                <button id="submit">Submit</button>
            </div>
        </div>`,
        CSS: `
        .domain {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 100dvw;
            z-index: 20;
            pointer-events: auto;
            background: linear-gradient(
                135deg,
                #c4f1f9,
                #fbcfe8,
                #fed7aa,
                #e9d5ff
            );
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Poppins', sans-serif;
        }

        .quiz-container {
            background: #ffffff33;
            backdrop-filter: blur(10px);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid #ffffff33;
            width: 300px;
            box-shadow: 0 0 5px #22222222;
        }

        .heading {
            font-size: 28px;
            text-align: center;
        }

        .ques {
            font-size: 13px;
            margin: 20px 0;
        }

        .options {
            list-style: none;
            font-size: 13px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }

        .options input {
            margin-right: 8px;
        }

        .btn-cont {
            display: flex;
            justify-content: center;
            margin-top: 16px;
        }

        button {
            background: linear-gradient(135deg, #f2a7bf, #f3c679);
            border: none;
            border-radius: 8px;
            padding: 0.7rem 1.3rem;
            color: #3e3160;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 3px 5px rgba(0,0,0,0.13);
            transition: all 0.15s ease-in-out;
        }

        button:hover {
            background: linear-gradient(135deg, #e885a9, #e9b44d);
        }

        button:active {
            transform: scale(0.97);
            box-shadow: none;
        }`,
    
        JS: () => {
            var quesCont = document.getElementById("ques-cont");
            var submit = document.getElementById("submit");
            
            var score = 0;
            var qindex = 0;
            
            var questions = [
        	  {
        	    question: "1. What’s the capital of Germany?",
        	    options: ["France", "New York", "Rome", "Berlin"],
        	    correctOpt: "Berlin"
        	  },
        	  {
        	    question: "2. Who wrote 'Romeo and Juliet'?",
        	    options: ["Mark Twain", "William Shakespeare", "Jane Austen", "Charles Dickens"],
        	    correctOpt: "William Shakespeare"
        	  },
        	  {
        	    question: "3. What is the largest planet in our solar system?",
        	    options: ["Earth", "Jupiter", "Saturn", "Mars"],
        	    correctOpt: "Jupiter"
        	  },
        	  {
        	    question: "4. What is the chemical symbol for Gold?",
        	    options: ["Au", "Ag", "Gd", "Go"],
        	    correctOpt: "Au"
        	  },
        	  {
        	    question: "5. Which country is known as the Land of the Rising Sun?",
        	    options: ["China", "Japan", "Thailand", "South Korea"],
        	    correctOpt: "Japan"
        	  },
        	  {
        	    question: "6. How many continents are there on Earth?",
        	    options: ["5", "6", "7", "8"],
        	    correctOpt: "7"
        	  },
        	  {
        	    question: "7. What year did the Titanic sink?",
        	    options: ["1912", "1905", "1920", "1898"],
        	    correctOpt: "1912"
        	  },
        	  {
        	    question: "8. What is the tallest mountain in the world?",
        	    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
        	    correctOpt: "Mount Everest"
        	  },
        	  {
        	    question: "9. Who painted the Mona Lisa?",
        	    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Vincent van Gogh"],
        	    correctOpt: "Leonardo da Vinci"
        	  },
        	  {
        	    question: "10. Which gas do plants absorb from the atmosphere?",
        	    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        	    correctOpt: "Carbon Dioxide"
        	  },
        	  {
        	    question: "11. What is the smallest prime number?",
        	    options: ["1", "2", "3", "0"],
        	    correctOpt: "2"
        	  },
        	  {
        	    question: "12. Who discovered penicillin?",
        	    options: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Isaac Newton"],
        	    correctOpt: "Alexander Fleming"
        	  },
        	  {
        	    question: "13. What is the hardest natural substance on Earth?",
        	    options: ["Gold", "Diamond", "Iron", "Quartz"],
        	    correctOpt: "Diamond"
        	  },
        	  {
        	    question: "14. What currency is used in Japan?",
        	    options: ["Yuan", "Yen", "Won", "Dollar"],
        	    correctOpt: "Yen"
        	  },
        	  {
        	    question: "15. How many players are there in a football (soccer) team on the field?",
        	    options: ["9", "10", "11", "12"],
        	    correctOpt: "11"
        	  },
        	  {
        	    question: "16. Which planet is known as the Red Planet?",
        	    options: ["Venus", "Mars", "Jupiter", "Saturn"],
        	    correctOpt: "Mars"
        	  },
        	  {
        	    question: "17. What is the boiling point of water at sea level in Celsius?",
        	    options: ["90°C", "100°C", "110°C", "120°C"],
        	    correctOpt: "100°C"
        	  },
        	  {
        	    question: "18. Who is the author of 'Harry Potter' series?",
        	    options: ["J.K. Rowling", "Stephen King", "J.R.R. Tolkien", "George R.R. Martin"],
        	    correctOpt: "J.K. Rowling"
        	  },
        	  {
        	    question: "19. Which ocean is the largest?",
        	    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        	    correctOpt: "Pacific"
        	  },
        	  {
        	    question: "20. What is the name of the longest river in the world?",
        	    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        	    correctOpt: "Nile"
        	  },
        	  {
        	    question: "21. Which element has the atomic number 1?",
        	    options: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
        	    correctOpt: "Hydrogen"
        	  },
        	  {
        	    question: "22. What is the capital city of Australia?",
        	    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        	    correctOpt: "Canberra"
        	  },
        	  {
        	    question: "23. Who invented the telephone?",
        	    options: ["Nikola Tesla", "Alexander Graham Bell", "Thomas Edison", "Guglielmo Marconi"],
        	    correctOpt: "Alexander Graham Bell"
        	  },
        	  {
        	    question: "24. Which country hosted the 2016 Summer Olympics?",
        	    options: ["China", "Brazil", "UK", "Russia"],
        	    correctOpt: "Brazil"
        	  },
        	  {
        	    question: "25. What is the main ingredient in guacamole?",
        	    options: ["Tomato", "Avocado", "Onion", "Lime"],
        	    correctOpt: "Avocado"
        	  },
        	  {
        	    question: "26. How many bones are there in the adult human body?",
        	    options: ["206", "201", "196", "210"],
        	    correctOpt: "206"
        	  },
        	  {
        	    question: "27. Which planet has the most moons?",
        	    options: ["Saturn", "Jupiter", "Mars", "Neptune"],
        	    correctOpt: "Saturn"
        	  },
        	  {
        	    question: "28. What is the fastest land animal?",
        	    options: ["Lion", "Cheetah", "Tiger", "Leopard"],
        	    correctOpt: "Cheetah"
        	  },
        	  {
        	    question: "29. Who is known as the father of computers?",
        	    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
        	    correctOpt: "Charles Babbage"
        	  },
        	  {
        	    question: "30. What language has the most native speakers worldwide?",
        	    options: ["English", "Mandarin", "Spanish", "Hindi"],
        	    correctOpt: "Mandarin"
        	  },
        	  {
        	    question: "31. What is the chemical formula for water?",
        	    options: ["H2O", "CO2", "O2", "NaCl"],
        	    correctOpt: "H2O"
        	  },
        	  {
        	    question: "32. Which country is famous for the pyramids?",
        	    options: ["Mexico", "Egypt", "Peru", "Sudan"],
        	    correctOpt: "Egypt"
        	  },
        	  {
        	    question: "33. What is the capital of Canada?",
        	    options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
        	    correctOpt: "Ottawa"
        	  },
        	  {
        	    question: "34. Which metal is liquid at room temperature?",
        	    options: ["Mercury", "Iron", "Gold", "Silver"],
        	    correctOpt: "Mercury"
        	  },
        	  {
        	    question: "35. Who painted the ceiling of the Sistine Chapel?",
        	    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        	    correctOpt: "Michelangelo"
        	  },
        	  {
        	    question: "36. What is the square root of 64?",
        	    options: ["6", "7", "8", "9"],
        	    correctOpt: "8"
        	  },
        	  {
        	    question: "37. What is the largest mammal?",
        	    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        	    correctOpt: "Blue Whale"
        	  },
        	  {
        	    question: "38. Which continent is the Sahara Desert located in?",
        	    options: ["Asia", "Africa", "Australia", "South America"],
        	    correctOpt: "Africa"
        	  },
        	  {
        	    question: "39. How many colors are there in a rainbow?",
        	    options: ["5", "6", "7", "8"],
        	    correctOpt: "7"
        	  },
        	  {
        	    question: "40. Which organ in the human body pumps blood?",
        	    options: ["Lungs", "Kidneys", "Heart", "Liver"],
        	    correctOpt: "Heart"
        	  },
        	  {
        	    question: "41. What is the currency of the United Kingdom?",
        	    options: ["Euro", "Dollar", "Pound Sterling", "Yen"],
        	    correctOpt: "Pound Sterling"
        	  },
        	  {
        	    question: "42. Who wrote '1984'?",
        	    options: ["George Orwell", "Aldous Huxley", "Jules Verne", "F. Scott Fitzgerald"],
        	    correctOpt: "George Orwell"
        	  },
        	  {
        	    question: "43. Which is the smallest country in the world?",
        	    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        	    correctOpt: "Vatican City"
        	  },
        	  {
        	    question: "44. What does DNA stand for?",
        	    options: ["Deoxyribonucleic Acid", "Dinucleic Acid", "Deoxynucleic Acid", "Deoxyribose Acid"],
        	    correctOpt: "Deoxyribonucleic Acid"
        	  },
        	  {
        	    question: "45. Who was the first person to walk on the moon?",
        	    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
        	    correctOpt: "Neil Armstrong"
        	  },
        	  {
        	    question: "46. What is the chemical symbol for Sodium?",
        	    options: ["S", "Na", "So", "Sd"],
        	    correctOpt: "Na"
        	  },
        	  {
        	    question: "47. Which year did World War II end?",
        	    options: ["1944", "1945", "1946", "1947"],
        	    correctOpt: "1945"
        	  },
        	  {
        	    question: "48. What is the name of the longest bone in the human body?",
        	    options: ["Tibia", "Femur", "Humerus", "Fibula"],
        	    correctOpt: "Femur"
        	  },
        	  {
        	    question: "49. Which country is known for maple syrup?",
        	    options: ["USA", "Canada", "Sweden", "Finland"],
        	    correctOpt: "Canada"
        	  },
        	  {
        	    question: "50. What is the primary language spoken in Brazil?",
        	    options: ["Spanish", "Portuguese", "French", "English"],
        	    correctOpt: "Portuguese"
        	  }
        	];
            
            var renderQues = function() {
                quesCont.innerHTML = "";
                
                var quesP = document.createElement("p");
                quesP.className = "ques";
                quesP.innerText = questions[qindex].question;
                
                var ul = document.createElement("ul");
                
                questions[qindex].options.forEach(function(option) {
                    var li = document.createElement("li");
                    li.className = "options";
                    
                    var input = document.createElement("input");
                    input.type = "radio";
                    input.name = "question" + qindex;
                    input.value = option;
                    
                    li.appendChild(input);
                    li.appendChild(document.createTextNode(option));
                    ul.appendChild(li);
                });
                
                quesCont.appendChild(quesP);
                quesCont.appendChild(ul);
            };
            
            var restart = function() {
                score = 0;
                qindex = 0;
                submit.style.display = "inline-block";
                document.querySelector(".heading").innerText = "Quiz App";
                renderQues();
            };
            
            var nextQues = function() {
                var options = quesCont.querySelectorAll("li");
                
                options.forEach(function(li) {
                    var radio = li.querySelector("input");
                    if (radio.checked && radio.value === questions[qindex].correctOpt) {
                        score++;
                    }
                });
                
                if (qindex < questions.length - 1) {
                    qindex++;
                    renderQues();
                } else {
                    quesCont.innerHTML = "";
                    
                    var heading = document.querySelector(".heading");
                    heading.innerText = "Quiz Completed!";
                    
                    var scoreP = document.createElement("p");
                    scoreP.className = "ques";
                    scoreP.style.textAlign = "center";
                    scoreP.innerText =
                        "Your score is " + score + "/" + questions.length;
                    
                    var restartBtn = document.createElement("button");
                    restartBtn.innerText = "Restart";
                    restartBtn.onclick = restart;
                    
                    var btnCont = document.createElement("div");
                    btnCont.className = "btn-cont";
                    btnCont.appendChild(restartBtn);
                    
                    quesCont.appendChild(scoreP);
                    quesCont.appendChild(btnCont);
                    submit.style.display = "none";
                }
            };
            
            submit.onclick = nextQues;
            renderQues();
        }
    }, // quiz app 
    {
        name: "contact app",
        spClass: "cont",
        heading: "Contacts",
        UI: "Neon UI",
        HTML: `
        <div class="cont-container">
            <div class="row-1">
                <div id="contacts">Contacts</div>
                <div id="saveContacts">New Contact</div>
            </div>
            <div class="row-2">
                <div class="tab-1">
                    <div class="no-cont">
                        <p class="no-contact">No Contacts</p>
                    </div>
                </div>
                
                <div class="tab-2">
                    <h3 class="heading-2">Create New Contact</h3>
                    <p class="text">Create a new contact by filling in the informations below:</p>
                    <div class="input-fields">
                        <input type="text" class="input" placeholder="Name" id="nameInput" required>
                        <input type="number" class="input" placeholder="Phone" id="numberInput" required>
                        <input type="email" class="input" placeholder="Email (optional)" id="emailInput">
                    </div>
                    <div class="btn-cont">
                        <button id="submit">Add</button>
                    </div>
                </div>
            </div>
        </div>`,

        CSS: `
        .domain {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 100dvw;
            z-index: 20;
            pointer-events: auto;
            background: #000;
            color: #fff;
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }
          
        .cont-container {  
            background: #00000000;  
        	height: 430px;  
        	width: 90%;  
            max-width: 640px;  
        	display: flex;  
        	flex-direction: column;  
        }  
          
        .row-1 {  
        	display: flex;  
        	margin-bottom: 12px;  
        }  
          
        #contacts {  
        	margin-right: 8px;  
        	background: #111;  
        	font-size: 13.5px;  
        	border-radius: 12px;  
        	height: 40px;  
        	width: 120px;  
        	display: flex;  
        	justify-content: center;  
        	align-items: center;  
        	cursor: pointer;  
        }  
          
        #saveContacts {  
        	background: #111;  
        	border-radius: 12px;  
        	font-size: 13.5px;  
        	height: 40px;  
        	width: 120px;  
        	display: flex;  
        	justify-content: center;  
        	align-items: center;  
        	cursor: pointer;  
        }  
          
        .row-2 {  
        	background: #111;  
        	flex: 1;  
        	position: relative;  
        	border-radius: 12px;  
        }  
          
        .row-2::after {  
        	content: "";  
        	position: absolute;  
        	background: linear-gradient(135deg, #00fff3, #ff073a);  
        	height: 100%;  
        	width: 100%;  
        	transform: translate(-50%, -50%);  
        	top: 50%;  
        	left: 50%;  
        	z-index: -1;  
        	padding: 1.2px;  
        	border-radius: 12px;  
        }  
          
        .tab-1 {  
         	height: 100%;  
        	max-height: 350px;  
        	width: 100%;  
        	padding: 12px;  
          	overflow-y: auto;  
          	overflow-x: hidden;  
        	position: absolute;  
        	background: #000;  
        	border-radius: 15px;  
        }  
          
          
        .contact {  
        	overflow: hidden;  
        	background: #111;  
        	padding: 12px;  
        	border-radius: 12px;  
        	margin-bottom: 12px;  
        }  
          
        .contact:last-child {  
        	margin-bottom: 0;  
        }  
          
        .cont-info {  
        	font-size: 12px;  
        	margin: 4px 0;  
        }  
          
        .phone{  
        	color: #aaa;  
        	margin-right: 24px;  
        }  
          
        .email {  
        	color: #555;  
        }  
          
        .btn-container {  
        	padding-top: 16px;  
        	margin-top: 12px;  
        	display: flex;  
        	border-top: 1px solid #555;  
        }  
          
        .btn {  
        	color: #ddd;  
        	flex: 1;  
        	height: 32px;  
        	background: transparent;  
        	border: none;  
        	border-left: solid 1px #555;  
        	font-family: 'Poppins', sans-serif;  
        	transition: all 0.15s ease-in-out;  
        	cursor: pointer;  
        }  
          
        .btn.phone {  
        	margin-right: 0;  
        	border-left: none;  
        	border-radius: 8px 0 0 8px;  
        }  
          
        .delete {  
        	border-radius: 0 8px 8px 0;  
        }  
          
        .btn.phone:hover {  
        	background: #00cc66;  
        }  
          
        .message:hover {  
        	background: #00ccc2;  
        }  
          
        .delete:hover {  
        	background: #ff073a;  
        }  
          
        .bottom-line {  
        	display: none;  
        	margin: 12px 0 32px 0;  
        	background: #777;  
        	border: none;  
        	height: 1.5px;  
        	border-radius: 0.75px;  
        }  
          
        i {  
        	margin-right: 6px;  
        }  
          
        .tab-2 {  
        	background: #000;  
        	height: 100%;  
        	width: 100%;  
        	position: absolute;  
        	border-radius: 15px;  
        	padding: 12px;  
        	display: flex;  
        	flex-direction: column;  
        	z-index: -1;  
        }  
          
        .input-fields {  
        	display: flex;  
        	flex-direction: column;  
        	padding: 16px;  
        	margin-top: 16px;  
        	border: solid 1px #555;  
        	border-radius: 12px;  
        }  
          
        .input {  
        	height: 32px;  
        	margin-bottom: 20px;  
        	padding-left: 12px;  
        	border-radius: 12px;  
        	border: none;  
        	outline: none;  
        	background: #222;  
        	color: #fff;  
        	font-family: 'Poppins', sans-serif;  
        }  
          
        .input#email {  
        	margin-bottom: 0;  
        }  
          
        .text {  
        	margin: 12px 0;  
        	font-size: 12px;  
        	color: #999;  
        }  
          
        .btn-cont {  
        	flex: 1;  
        	display: flex;  
        	justify-content: flex-end;  
        	align-items: flex-end;  
        }  
          
        #submit {  
        	height: 40px;  
        	width: 108px;  
        	border-radius: 20px;  
        	border: none;  
        	background: #222;  
        	color: #fff;  
        	font-family: 'Poppins', sans-serif;  
        	cursor: pointer;  
        }   
          
        .no-cont {  
        	width: 100%;  
        	height: 100%;  
        	display: flex;  
        	justify-content: center;  
        	align-items: center;  
        }  
          
        .no-contact {  
        	font-size: 12px;  
        	color: #555;  
        }`,

        JS: () => {
            var contCont = document.querySelector(".tab-1");

            var getSafeStorage = function(key, fallBack) {
                if (fallBack === void 0) { fallBack = []; }
                try {
                    var data = localStorage.getItem(key);
                    return data ? JSON.parse(data) : fallBack;
                } catch (err) {
                    console.error("Unable to show data, invalid data type", err);
                    return fallBack;
                }
            };
            
            var contacts = getSafeStorage("contData");
            
            var Contact = function(contName, contPhone, contEmail) {
                this.name = contName;
                this.phone = contPhone;
                this.email = contEmail;
            };
            
            var saveContacts = function() { localStorage.setItem("contData", JSON.stringify(contacts)); };
            
            var submitBtn = document.getElementById("submit");
            submitBtn.onclick = function() {
                var nameInput = document.getElementById("nameInput");
                var phoneInput = document.getElementById("numberInput");
                var emailInput = document.getElementById("emailInput");
                
                var nameValue = nameInput.value.trim();
                var phoneValue = phoneInput.value.trim();
                var emailValue = emailInput.value.trim();
                
                if (!nameInput.checkValidity() || !phoneInput.checkValidity()) {
                    alert("Please enter a valid name and phone number.");
                    return;
                }
                
                if (!emailInput.checkValidity() || emailValue === "") emailValue = "No Email";
                
                contacts.push(new Contact(nameValue, phoneValue, emailValue));
                saveContacts();
                renderContacts();
                
                nameInput.value = "";
                phoneInput.value = "";
                emailInput.value = "";
            };
            
            var renderContacts = function() {
                contCont.innerHTML = "";
                if (contacts.length === 0) {
                    var noContactCont = document.createElement("div");
                    var noContact = document.createElement("p");
                    noContactCont.className = "no-cont";
                    noContact.className = "no-contact";
                    noContact.innerText = "No Contacts";
                    noContactCont.appendChild(noContact);
                    contCont.appendChild(noContactCont);
                } else {
                    contacts.forEach(function(contObj, contIndex) {
                        var contact = document.createElement("div");
                        contact.className = "contact";
                        contact.innerHTML = `
                            <h3 class="cont-name"><i class="fa-solid fa-bars"></i>${contObj.name}</h3>
                            <p class="cont-info"><span class="phone">${contObj.phone}</span><span class="email">~${contObj.email}</span></p>
                            <div class="btn-container">
                                <button class="btn phone phn"><i class="fa-solid fa-phone"></i>Phone</button>
                                <button class="btn message msg"><i class="fa-solid fa-message"></i>Message</button>
                                <button class="btn delete"><i class="fa-solid fa-trash"></i>Delete</button>
                            </div>
                        `;
                        
                        var phoneBtn = contact.querySelector(".phn");
                        var messageBtn = contact.querySelector(".msg");
                        var deleteBtn = contact.querySelector(".delete");
                        
                        phoneBtn.onclick = function() { alert("Error 258: Cellular connection not supported"); };
                        messageBtn.onclick = function() { alert("Error 261: Cellular connection not supported"); };
                        deleteBtn.onclick = function() {
                            contacts.splice(contIndex, 1);
                            saveContacts();
                            renderContacts();
                        };
                        
                        contCont.appendChild(contact);
                    });
                }
            };
            
            var contTab = document.getElementById("contacts");
            var saveTab = document.getElementById("saveContacts");
            var tab1 = document.querySelector(".tab-1");
            var tab2 = document.querySelector(".tab-2");
            
            contTab.onclick = function() {
                tab1.style.zIndex = "1";
                tab2.style.zIndex = "-1";
                contTab.style.borderBottom = "2px solid #00fff3";
                saveTab.style.borderBottom = "none";
            };
            saveTab.onclick = function() {
                tab2.style.zIndex = "1";
                tab1.style.zIndex = "-1";
                saveTab.style.borderBottom = "2px solid #ff073a";
                contTab.style.borderBottom = "none";
            };
            
            renderContacts();
        }
    }, // contact app
    {
        name: "todo app",
        spClass: "todo",
        heading: "To-Do App",
        UI: "Retro UI",
        HTML: `
        <div class="todo-container">
            <div class="header-cont">
                <h1 class="heading">To-Do App</h1>
                <div class="prog-cont">
                    <div class="prog">
                        <div class="bar-fill"></div>
                        <p class="prog-stat">None</p>
                    </div>    
                </div>
            </div>
    
            <div class="input-div">    
                <input type="text" placeholder="Enter a Task" id="input"/>    
                <button class="submitBtn">ADD</button>    
            </div>    
    
            <ul id="listContainer">    
                <div class="no-task-cont">    
                    <p class="no-task">No Tasks</p>    
                </div>    
            </ul>    
        </div>`,
    
        CSS: `
        .domain {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 100dvw;
            z-index: 20;
            pointer-events: auto;
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); 
            margin: 0;      
            padding: 0;      
            color: #eeeeff;      
            display: flex;      
            justify-content: center;      
            align-items: center;      
            background-repeat: no-repeat;      
            background-size: cover;
        }     
              
        .todo-container {      
        	height: auto;      
        	min-height: 260px;      
        	background: #2e2a4fbb;      
        	backdrop-filter: blur(12px);      
        	border-radius: 16px;      
        	border: solid 0.3px #6a5fa055;      
        	padding: 16px;      
        	width: 90%;      
        	max-width: 400px;      
        }      
              
        .heading {      
        	font-size: 28px;      
        	padding-left: 4px;      
        }      
              
        .input-div {      
        	background: linear-gradient(135deg, #1a2d35, #203a43, #2c5364);      
        	display: flex;      
        	justify-content: space-between;      
        	height: 38px;      
        	border-radius: 19px;      
        	overflow: hidden;      
        	margin: 12px 0;      
        	border: solid 0.3px #2c5364;      
        }      
              
        #input {      
        	flex: 1;      
        	background: transparent;      
        	border: none;      
        	outline: none;      
        	padding: 0 12px;      
        	color: #5e9dad;      
        	font-size: 12.5px;      
        }      
              
        #input::placeholder {      
        	color: #5e9dad45;      
        	font-size: 12.5px;      
        }      
              
        .submitBtn {      
        	width: 72px;      
        	border: none;      
        	border-radius: 19px;      
        	background: #6a5fa0dd;      
        	color: #eeeeff;      
        }      
              
        #listContainer {      
        	min-height: 140px;      
        	max-height: 240px;      
        	overflow: auto;      
        	scroll-behavior: smooth;       
        	padding-right: 8px;      
        }      
              
        #listContainer::-webkit-scrollbar {      
          	width: 3px;      
        }      
              
        #listContainer::-webkit-scrollbar-thumb {      
        	background: #6a5fa055;      
        	border-radius: 4px;      
        }      
              
        #listContainer li {      
        	border: solid 0.3px #6a5fa055;      
        	list-style-type: none;      
        	margin-bottom: 12px;      
        	height: 38px;      
        	border-radius: 19px;      
        	color: #eeeeff;       
        	font-size: 14px;      
        	display: flex;      
        	justify-content: space-between;      
        	align-items: center;      
        	padding-left: 12px;      
        	display: flex;      
        	cursor: pointer;      
        }      
              
        .fa-checked, .fa-unchecked {      
        	font-size: 16px;      
        	margin-right: 8px;      
        }      
              
        .fa-checked {      
        	color: #aaaaee;      
        }      
              
        .checked {      
        	text-decoration: line-through;      
        	color: #aaaaee;      
        }      
              
        .header-cont {      
        	display: flex;      
        	justify-content: space-between;      
        	align-items: center;      
        }      
              
        .prog-cont {      
        	width: 118px;      
        	background: linear-gradient(135deg, #203a43, #2c5364);      
        	height: 38px;      
        	border-radius: 19px;      
        	overflow: hidden;      
        	padding: 2px;      
        }      
              
        .prog {      
        	background: #2e2a4f;      
        	width: 100%;      
        	height: 100%;      
        	display: flex;      
        	justify-content: center;      
        	align-items: center;      
        	border-radius: 19px;      
        	border: solid 0.3px #6a5fa055;      
        }      
              
        .prog-stat {      
        	color: #aaaaee;      
        	font-size: 12px;      
        }      
              
        .cross {      
        	font-size: 18px;      
        	padding-right: 12px;      
        	transition: all 0.15s ease-in-out;      
        }      
              
        .cross:hover {      
        	color: #ff1144;      
        }      
              
        .no-task-cont {      
        	display: flex;      
        	justify-content: center;      
        	align-items: center;      
        	min-height: 120px;      
        }      
              
        .no-task {      
        	font-size: 12px;      
        	color: #6a5fa0aa;      
        }      
              
        .bar-fill {      
        	position: absolute;      
        	top: 0;      
        	left: 0;      
        	height: 100%;      
        	width: 0%;      
        	background: linear-gradient(90deg, #2c5364, #4ca1af);      
        	border-radius: 16px;      
        	transition: width 0.4s ease-in-out;      
        	z-index: 0;      
        }      
              
        .prog {      
        	position: relative;      
        	overflow: hidden;      
        }      
              
        .prog-stat {      
        	position: relative;      
        	z-index: 1;      
        }`,
    
        JS: () => {
            var listCont = document.getElementById("listContainer");
            var input = document.getElementById("input");
            var submitBtn = document.querySelector(".submitBtn");
            var progStat = document.querySelector(".prog-stat");
            var taskArray = JSON.parse(localStorage.getItem("Data")) || [];
            
            var saveData = function() {
                localStorage.setItem("Data", JSON.stringify(taskArray));
            };
            
            var TaskClass = function(taskText, taskChecked) {
                this.task = taskText;
                this.checked = taskChecked;
            };
            
            var addTasks = function() {
                if (input.value.trim() !== "") {
                    taskArray.push(new TaskClass(input.value.trim(), false));
                    input.value = "";
                    saveData();
                    renderTasks();
                }
            };
            
            submitBtn.addEventListener("click", addTasks);
            document.addEventListener("keydown", function(e) {
                if (e.key === "Enter") addTasks();
            });
            
            var countCheckedTasks = function() {
                var checkedTasks = taskArray.filter(function(t) { return t.checked; }).length;
                var bar = document.querySelector(".bar-fill");
                
                if (taskArray.length === 0) {
                    progStat.innerText = "None";
                    bar.style.width = "0%";
                    progStat.style.color = "#aaaaee55";
                } else {
                    bar.style.width = (checkedTasks / taskArray.length) * 100 + "%";
                    progStat.innerText = checkedTasks === taskArray.length ? "All Done!" : "Done: " + checkedTasks + " / " + taskArray.length;
                    progStat.style.color = "#aaaaee";
                }
            };
            
            var renderTasks = function() {
                var prevScroll = listCont.scrollTop;
                listCont.innerHTML = "";
                
                if (taskArray.length === 0) {
                    listCont.innerHTML = `
                        <div class="no-task-cont">
                            <p class="no-task">No Tasks</p>
                        </div>
                    `;
                } else {
                    taskArray.forEach(function(taskObj, index) {
                        var li = document.createElement("li");
                        li.innerHTML = `
                            <span>
                                <i class="${taskObj.checked ? 'fa-solid' : 'fa-regular'} fa-check-circle ${taskObj.checked ? 'fa-checked' : 'fa-unchecked'}"></i>
                                <span class="${taskObj.checked ? 'checked' : 'unchecked'}">${taskObj.task}</span>
                            </span>
                        `;
                        li.addEventListener("click", function() {
                            taskObj.checked = !taskObj.checked;
                            saveData();
                            renderTasks();
                        });
                        
                        var cross = document.createElement("i");
                        cross.classList.add("fa-solid", "fa-xmark", "cross");
                        cross.addEventListener("click", function(e) {
                            e.stopPropagation();
                            taskArray.splice(index, 1);
                            saveData();
                            renderTasks();
                        });
                        
                        li.appendChild(cross);
                        listCont.appendChild(li);
                    });
                }
                
                countCheckedTasks();
                listCont.scrollTop = prevScroll;
            };
            
            renderTasks();
        }
    }, // to-do app
    {
        name: "weather app",
        spClass: "weth",
        heading: "Weather App",
        UI: "Fresh UI",
        HTML: `
        <div class="weth-container">
            <div class="search">
                <input type="text" class="cityInput" placeholder="Enter city name">
                <button class="searchBtn"><i class="fa-solid fa-search"></i></button>
            </div>
            <div class="main">
                <div class="weather-icon-cont">
                    <img src="https://rakim24.github.io/images/weather/cloudy-day.png" class="weather-icon">
                </div>
                <div class="weather-info-cont">
                    <p class="cityName">No city</p>
                    <p class="temp">---</p>
                    <div class="fTemp">Feels like: ---</div>
                </div>
            </div>
            <div class="sub-main">
                <div class="subCol-1">
                    <img src="https://rakim24.github.io/images/weather/weather.png" class="sub-img1">
                    <p class="sHead">Weather</p>
                    <p class="sDesc des">---</p>
                </div>
                <div class="subCol-2">
                    <img src="https://rakim24.github.io/images/weather/humidity.png" class="sub-img">
                    <p class="sHeads">Humidity</p>
                    <p class="sDesc hum">---</p>
                </div>
                <div class="subCol-3">
                    <img src="https://rakim24.github.io/images/weather/wind.png" class="sub-img">
                    <p class="sHeads">Wind</p>
                    <p class="sDesc wind">
                        --- <br>
                        ---
                    </p>
                </div>
            </div>
            <div class="footer">
                <p class="credits">Info secured from: <a href="https://openweathermap.org">openweathermaps</a></p>
            </div>
        </div>`,
        
        CSS: `
        .domain {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 100dvw;
            z-index: 20;
            pointer-events: auto;
            background: linear-gradient(
                135deg,
                #bfe5e5 0%,
                #c6eff1 25%,
                #bdf5ea 50%,
                #baeaea 75%,
                #aacee6 100%);
            display: flex;
            justify-content: center;
            align-items: center;
        }  
          
        .weth-container {  
        	background: rgba(255, 255, 255, 0.10);  
        	backdrop-filter: blur(10px);  
        	-webkit-backdrop-filter: blur(10px);  
        	border: 1px solid rgba(255, 255, 255, 0.3);  
        	border-radius: 16px;  
        	width: 80%;  
        	max-width: 280px;  
        	height: 420px;  
        	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);  
        	padding: 12px;  
        	display: flex;  
        	flex-direction: column;  
        }  
          
        .search {  
        	display: flex;  
        	align-items: center;  
        	height: 32px;  
        	padding-left: 12px;  
        	background: #ffffffbb;  
        	overflow: hidden;  
        	border-radius: 16px;  
        }  
          
        .cityInput {  
        	flex: 1;  
        	min-width: auto;  
        	height: 100%;  
        	background: #00000000;  
        	border: none;  
        	outline: none;  
        	font-size: 11px;  
        }  
          
        .searchBtn {  
        	width: 32px;  
        	aspect-ratio: 1/1;  
        	border-radius: 16px;  
        	border: solid 1px #ffffff55;  
        	background: linear-gradient(  
        		135deg,  
        		#00b4d8 0%,  
        		#0077b6 100%);  
        	color: #fff;  
        	cursor: pointer;  
        	transition: all 0.2s ease;  
        }  
          
        .main {  
        	margin-top: 12px;  
        	padding: 12px;  
        	height: 150px;  
        	border-radius: 16px;  
        	background: rgba(255, 255, 255, 0.2);  
        	backdrop-filter: blur(10px);  
        	-webkit-backdrop-filter: blur(10px);  
        	border: 1px solid rgba(255, 255, 255, 0.4);  
        	display: flex;  
        	justify-content: space-between;  
        	align-items: center;  
        }  
          
        .weather-icon-cont {  
        	flex-basis: 48%;  
        	aspect-ratio: 1/1;  
        	padding: 12px;  
        }  
          
        .weather-icon {  
        	width: 100%;  
        	background: #99999900;  
        }  
          
        .weather-info-cont {  
        	background: #77777700;  
        	height: 100%;  
        	margin-left: 12px;  
        	flex: 1;  
        	color: #00000099;  
        	  
        	display: flex;  
        	flex-direction: column;  
        	justify-content: center;  
        }  
          
        .cityName {  
        	font-size: 11px;  
        	color: #55555599;  
        }  
          
        .temp {  
        	font-size: clamp(24px, 6vw, 32px);  
        	margin: 12px 0 8px 0;  
        }  
          
        .fTemp {  
        	font-size: clamp(10px, 2vw, 12px);  
        }  
          
        .sub-main {  
        	display: flex;  
        	justify-content: space-between;  
        	align-items: center;  
        }  
          
        .sub-main div {  
        	margin-top: 12px;  
        	height: 130px;  
        	border-radius: 16px;  
        	background: rgba(255, 255, 255, 0.2);  
        	backdrop-filter: blur(10px);  
        	-webkit-backdrop-filter: blur(10px);  
        	border: 1px solid rgba(255, 255, 255, 0.4);  
        	  
        	flex-basis: 31%;  
        	padding: 8px;  
        	text-align: center;  
        	display: flex;  
        	flex-direction: column;  
        	justify-content: space-between;  
        	align-items: center;  
        }  
          
        .sub-img {  
        	width: 70%;  
        	padding: 2px;  
        }  
          
        .sub-img1 {  
        	width: 70%;  
        	padding: -2px;  
        }  
          
        .sHead, .sHeads {  
        	margin-top: 8px;  
        	font-size: 11px;  
        	color: #00000099;  
        }  
          
        .sHeads {  
        	margin-top: 12px;  
        }  
          
        .sDesc {  
        	font-size: 10px;  
        	color: #55555599  
        }  
          
        .footer {  
        	margin-top: 12px;  
        	border-radius: 16px;  
        	background: rgba(255, 255, 255, 0.2);  
        	backdrop-filter: blur(10px);  
        	-webkit-backdrop-filter: blur(10px);  
        	border: 1px solid rgba(255, 255, 255, 0.4);  
        	padding: 12px;  
        	transition: all 0.3s ease-in-out;  
        	  
        	flex: 1;  
        	display: flex;  
        	justify-content: center;  
        	align-items: center;  
        }  
          
        .credits {  
        	font-size: 10px;  
        	color: #55555599;  
        }  
          
        .credits a {  
        	color: #008001;  
        	text-decoration: none;  
        }  
          
        .credits a:active {  
        	color: #6666ff;  
        }  
          
        .error {  
        	font-size: 11px;  
        	color: #000000bb;  
        }`,
        
        JS: () => {
            var apiKey = "cb181b2fc6e7692315366a1c8ad62288";
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
            
            var cityInput = document.querySelector(".cityInput");
            var searchBtn = document.querySelector(".searchBtn");
            
            var cityNameDOM = document.querySelector(".cityName");
            var temp = document.querySelector(".temp");
            var fTemp = document.querySelector(".fTemp");
            var sHead = document.querySelector(".sHead");
            var des = document.querySelector(".des");
            var hum = document.querySelector(".hum");
            var wind = document.querySelector(".wind");
            var icon = document.querySelector(".weather-icon");
            var footer = document.querySelector(".footer");
            
            var weatherCases = {
                Clear_day: "sunny.png",
                Clear_night: "moon.png",
                Clouds_day: "cloudy-day.png",
                Clouds_night: "cloudy-night.png",
                Mist_day: "fog.png",
                Mist_night: "fog.png",
                Rain_day: "rainy-day.png",
                Rain_night: "rainy-night.png",
                Snow_day: "snowy-day.png",
                Snow_night: "snowy-night.png",
                Thunderstorm_day: "thunder-day.png",
                Thunderstorm_night: "thunder-night.png"
            };
            
            var showError = function(err) {
                footer.innerHTML = "";
                var error = document.createElement("p");
                error.classList.add("error");
                error.innerHTML = '<span style="color: #ff0000bb;">Error:</span> ' + err;
                footer.appendChild(error);
                footer.style.background = "rgba(255, 100, 100, 0.2)";
                footer.style.border = "1px solid rgba(255, 100, 100, 0.4)";
            };
            
            var checkWeather = async function() {
                var cityName = cityInput.value.trim().toLowerCase();
                
                try {
                    if (!cityName) return showError("No city name entered");
                    
                    var response = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + cityName);
                    if (!response.ok) return showError("Invalid city name (" + response.status + ")");
                    
                    var data = await response.json();
                    
                    footer.innerHTML = '<p class="credits">Info secured from: <a href="https://openweathermap.org">openweathermaps</a></p>';
                    footer.style.background = "rgba(255, 255, 255, 0.2)";
                    footer.style.border = "1px solid rgba(255, 255, 255, 0.4)";
                    
                    temp.innerHTML = Math.round(data.main.temp) + "° C";
                    fTemp.innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "° C";
                    sHead.innerHTML = data.weather[0].main;
                    hum.innerHTML = data.main.humidity + "%";
                    
                    cityNameDOM.innerHTML = cityName
                        .split(" ")
                        .map(function(w) { return w[0].toUpperCase() + w.slice(1); })
                        .join(" ");
                    
                    des.innerHTML = data.weather[0].description
                        .split(" ")
                        .map(function(w) { return w[0].toUpperCase() + w.slice(1); })
                        .join(" ");
                    
                    var windDeg = data.wind.deg;
                    var directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
                    var windIndex = Math.floor((windDeg + 22.5) / 45) % 8;
                    wind.innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/h <br> " + directions[windIndex];
                    
                    var isDay = data.weather[0].icon.includes("d");
                    var key = data.weather[0].main + "_" + (isDay ? "day" : "night");
                    icon.src = "https://rakim24.github.io/images/weather/" + weatherCases[key];
                    
                } catch (err) {
                    console.error("Error fetching weather data:", err);
                    showError("HTTP or Network problem (" + (err.status || err) + ")");
                }
                
                cityInput.value = "";
            };
            
            searchBtn.addEventListener("click", checkWeather);
            document.addEventListener("keydown", function(e) {
                if (e.key === "Enter") checkWeather();
                else if (e.key === "Space") e.preventDefault();
            });
        }
    }  // weather app
];

const contacts = [
    {
        name: "Gmail",
        icon: "assets/gmail.png",
        value: "rakimsadman@gmail.com",
        primaryBtn: {
            text: "Gmail Now →",
            link: "mailto:rakimsadman@gmail.com?subject=Hey%20Rakim!&body=Yo%20bro%2C%20just%20wanted%20to%20reach%20out!"
        },
        secondaryBtn: "Copy Gmail"
    }, //gmail
    {
        name: "Whatsapp",
        icon: "assets/whatsapp.png",
        value: "+8801912707671",
        primaryBtn: {
            text: "Chat Now →",
            link: "https://wa.me/8801912707671?text=Hey%20Rakim%2C%20I%20just%20saw%20your%20portfolio!"
        },
        secondaryBtn: "Copy Number"
    }, //whatsapp
    {
        name: "LinkedIn",
        icon: "assets/linkedin.png",
        value: "Underwork",
        disabled: true
    }  //LinkedIn
];

const milestones = [
    {
        type: "arrow",
        img: "assets/arrow-4.png",
        grid: "mil-0"
    }, // arrow
    {
        type: "done",
        img: "assets/html.png",
        grid: "mil-1"
    }, // done
    {
        type: "arrow",
        img: "assets/arrow.png",
        grid: "mil-2"
    }, // arrow
    {
        type: "arrow-small",
        img: "assets/arrow-2.png",
        grid: "mil-6"
    }, // arrow-small
    {
        type: "done",
        img: "assets/css.png",
        grid: "mil-3"
    }, // done
    {
        type: "arrow-small",
        img: "assets/arrow-2.png",
        grid: "mil-6"
    }, // arrow-small
    {
        type: "arrow",
        img: "assets/arrow.png",
        grid: "mil-4"
    }, // arrow
    {
        type: "done",
        img: "assets/js.png",
        grid: "mil-5"
    }, // done
    {
        type: "arrow-small",
        img: "assets/arrow-2.png",
        grid: "mil-6"
    }, // arrow-small
    {
        type: "going",
        img: "assets/tailwind.png",
        grid: "mil-7"
    }, // going
    {
        type: "arrow-small",
        img: "assets/arrow-2.png",
        grid: "mil-6"
    }, // arrow-small
    {
        type: "arrow",
        img: "assets/arrow-3.png",
        grid: "mil-8"
    }, // arrow
    {
        type: "going",
        img: "assets/react-sm.png",
        grid: "mil-9"
    }, // going
    {
        type: "arrow-small",
        img: "assets/arrow-2.png",
        grid: "mil-6"
    }, // arrow-small
    {
        type: "arrow",
        img: "assets/arrow-3.png",
        grid: "mil-10"
    }, // arrow
    {
        type: "undone",
        img: "assets/node.png",
        grid: "mil-11"
    }  // undone
];

const milestoneInfo = [
    {
        colorClass: "st-b",
        text: "Finished"
    }, // Finished
    {
        colorClass: "st-g",
        text: "Ongoing"
    }, // Ongoing
    {
        colorClass: "st-w",
        text: "Unfinished"
    }  // Unfinished
];

const credits = [
    {
        name: "Kennst du schon die Umkreisel App?",
        attribute: "Background"
    }, // Kennst du schon the Umkreisel App?
    {
        name: "Freepik",
        attribute: "HTML icon"
    }, // Freepik
    {
        name: "pixel perfect",
        attribute: "CSS icon"
    }, // pixel perfect
    {
        name: "Freepik",
        attribute: "JavaScript icon"
    }, // Freepik
    {
        name: "Erix",
        attribute: "React icon"
    }, // Erix
    {
        name: "Icon8.com",
        attribute: "Tailwind icon"
    }, // Icon8.com
    {
        name: "Icon8.com",
        attribute: "Node.js icon"
    }, // Icon8.com
    {
        name: "Freepik",
        attribute: "Contact background"
    }, // Freepik
    {
        name: "Freepik",
        attribute: "Gmail icon"
    }, // Freepik
    {
        name: "Freepik",
        attribute: "WhatsApp icon"
    }, // Freepik
    {
        name: "Riajulislam",
        attribute: "LinkedIn icon"
    }, // Riajulislam
    {
        name: "Icon8.com",
        attribute: "Menu icon"
    } // Icon8.com
];

export {projects, contacts, milestones, milestoneInfo, credits};