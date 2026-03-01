## Table of contents

- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

### Links

- Solution URL: https://shadymo2291.github.io/shadymo2291-JavaScript-Projects-Typing_Speed_Test_Application/

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- hover pseudo class
- animation
- JavaScript
- json
- Ajax
- interval
- events
- if conditions
- ES6
- local storage

### What I learned

in this project i used some CSS properties to help for styling application and create animation and using JavaScript make the interactive of the app (typing speed test game) as the user can selsct the test level and get the final score on display and also store it at the local storage

To see how you can add code snippets, see below:

function get_upcoming_target_word() {
w_counter++;
words_counter.innerHTML = w_counter;
words_list_container.innerHTML = "";
random_index = Math.floor(Math.random() \* target_array.length);
target_word.innerHTML = target_array[random_index];
target_array.splice(random_index, 1);

for (let i = 0; i < target_array.length; i++) {
let upcoming_word = document.createElement("div");
upcoming_word.innerHTML = target_array[i];
words_list_container.appendChild(upcoming_word);
}
showing_next_word();
}

### Continued development

I want to learn more about JavaScript and creating more applications to master Javascript.

## Author

- Frontend Mentor - [@shadymo2291](https://www.frontendmentor.io/profile/shadymo2291)
- https://www.upwork.com/freelancers/~01d544da35261cf01c

## Acknowledgments

I want to thank everyone who helped me to learn and to code, especially the Elzero Web School channel on YouTube
