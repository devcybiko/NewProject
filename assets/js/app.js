/**
 * Project: project name
 * Author: Your Name Here
 * Description: This is a project description...
 * Date: 01/01/2019
 */

 /**
  * GLOBAL VARIABLES
  */

/**
 * GLOBAL FUNCTIONS
 */
function random(min, max) {
	return Math.floor(Math.random() * (max - min +1)) + min;
}

/**
 * The main program
 */
function main() {
    // your program here
    console.log("main() started...");
    console.log("main() ended")
}

$('document').ready(main);