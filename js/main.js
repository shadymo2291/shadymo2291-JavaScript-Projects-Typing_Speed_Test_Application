// ========================
// Create Typing Speed Test Game:
// ========================

// General Element:
// ----------------

let level_selector_field = document.querySelector("select");
let level_options = document.querySelectorAll("option");
let welcoming_container = document.querySelector(".welcoming_container");
let insructions_container = document.querySelector(".insructions_container");
let instruction_level_name = document.querySelector(
  ".insructions_container .level_name",
);
let instruction_level_seconds = document.querySelector(
  ".insructions_container .level_seconds",
);
let start_theGame_btn = document.querySelector(".start_theGame_btn");
let test_container = document.querySelector(".test_container");
let test_heade_level_name = document.querySelector(
  ".test_container_header .level_name",
);
let test_heade_level_seconds = document.querySelector(
  ".test_container_header .level_seconds",
);
let target_word = document.querySelector(
  ".test_container_test-data .target_word",
);
let typing_input = document.querySelector(".test_container_test-data input");
let words_list_container = document.querySelector(
  ".test_container_test-data .test_container-wordsList",
);
let test_footer_container = document.querySelector(".test_container-footer");
let timer_container = document.querySelector(".test_container-footer .timer");
let timer = document.querySelector(".test_container-footer .timer span");
let words_counter = document.querySelector(
  ".test_container-footer .words_counter",
);
let total_number_ofWords = document.querySelector(
  ".test_container-footer .total_number_ofWords",
);
let score_container = document.querySelector(".score_container");
let score = document.querySelector(".score_container .score span");
let percentage = document.querySelector(".score_container .score .percentage");
let target_array;
let interval_timer;
let correct_word = 0;
let w_counter = 0;

// Main Arrays:
// ------------

let easy_words = [
  "cat",
  "dog",
  "sun",
  "hat",
  "run",
  "pen",
  "map",
  "cup",
  "red",
  "bed",
  "top",
  "win",
  "box",
  "day",
  "big",
];

let normal_words = [
  "apple",
  "table",
  "chair",
  "water",
  "green",
  "plant",
  "light",
  "stone",
  "mouse",
  "bread",
  "clock",
  "phone",
  "glass",
  "train",
  "smile",
];

let hard_words = [
  "keyboard",
  "language",
  "strength",
  "computer",
  "triangle",
  "building",
  "reaction",
  "parallel",
  "distance",
  "pressure",
  "midnight",
  "mountain",
  "graphics",
  "electric",
  "movement",
];

// Set The Levels Instructions:
// ----------------------------

let len;
function check_Test_level(test_level) {
  if (test_level === "easy") {
    instruction_level_name.innerHTML = test_level;

    instruction_level_seconds.innerHTML = 4;

    test_heade_level_name.innerHTML = test_level;

    test_heade_level_seconds.innerHTML = 4;

    target_array = easy_words;
  } else if (test_level === "normal") {
    instruction_level_name.innerHTML = test_level;

    instruction_level_seconds.innerHTML = 4;

    test_heade_level_name.innerHTML = test_level;

    test_heade_level_seconds.innerHTML = 4;

    target_array = normal_words;
  } else if (test_level === "hard") {
    instruction_level_name.innerHTML = test_level;

    instruction_level_seconds.innerHTML = 3;

    test_heade_level_name.innerHTML = test_level;

    test_heade_level_seconds.innerHTML = 3;

    target_array = hard_words;
  }
  len = target_array.length;
}

check_Test_level(level_selector_field.value);

// Start The Test:
// --------------

start_theGame_btn.onclick = () => {
  welcoming_container.style.display = "none";
  test_container.style.display = "flex";
  total_number_ofWords.innerHTML = ` / ${len}`;
  get_upcoming_target_word();
  typing_input.value = "";
  typing_input.focus();
};

// Showing Upcoming and Target Words:
// ----------------------------------
let random_index;

function get_upcoming_target_word() {
  w_counter++;
  words_counter.innerHTML = w_counter;
  words_list_container.innerHTML = "";
  random_index = Math.floor(Math.random() * target_array.length);
  target_word.innerHTML = target_array[random_index];
  target_array.splice(random_index, 1);

  for (let i = 0; i < target_array.length; i++) {
    let upcoming_word = document.createElement("div");
    upcoming_word.innerHTML = target_array[i];
    words_list_container.appendChild(upcoming_word);
  }
  showing_next_word();
}

// Showing The Next Word:
// ---------------------

let intCounter;
function showing_next_word() {
  intCounter = parseInt(test_heade_level_seconds.innerHTML);

  interval_timer = setInterval(() => {
    timer.innerHTML = intCounter;

    timer_container.style.backgroundImage = `conic-gradient(var(--second-color) ${(intCounter / parseInt(test_heade_level_seconds.innerHTML)) * 100}%, transparent 0%)`;
    if (intCounter-- === 0) {
      clearInterval(interval_timer);

      if (target_word.innerHTML === typing_input.value) {
        correct_word++;
      }

      if (target_array.length > 0) {
        get_upcoming_target_word();
      } else {
        test_container.style.display = "none";
        score.innerHTML = correct_word;

        let per_score = (
          (parseInt(correct_word) / parseInt(len)) *
          100
        ).toFixed(0);
        console.log(per_score);
        let score_counter = 0;
        let score_interval = setInterval(
          () => {
            score_counter++;
            percentage.innerHTML = `${((score_counter / parseInt(len)) * 100).toFixed(0)}%`;
            percentage.style.backgroundImage = `conic-gradient(var(--second-color) ${((score_counter / parseInt(len)) * 100).toFixed(0)}%, transparent 0%)`;

            if (
              ((score_counter / parseInt(len)) * 100).toFixed(0) ==
              parseInt(per_score)
            ) {
              clearInterval(score_interval);
            }
          },
          3000 / parseInt(per_score),
        );

        storing_theScore(
          level_selector_field.value,
          len,
          correct_word,
          per_score,
        );

        score_container.style.display = "block";
      }

      if (words_list_container.innerHTML == "") {
        words_list_container.style.display = "none";
      }

      typing_input.value = "";
    }
  }, 1000);
}

// Select The Test Level:
// ---------------------

level_selector_field.onchange = () => {
  check_Test_level(level_selector_field.value);
  words_list_container.innerHTML = "";
};

// Storing The Score At The Local Storage:
// ---------------------------------------

let score_info = {};
function storing_theScore(test_level, total_words, correct_words, percentage) {
  score_info = {
    date: new Date(),
    level: test_level,
    total_words: total_words,
    correct_words: correct_words,
    percentage: percentage,
  };

  localStorage.setItem("score_info", JSON.stringify(score_info));
  console.log(score_info);
}
