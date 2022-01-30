# Team Directory Site Builder

This program is intended for use by team managers to build a directory site listing the contact information for their project team. It is a Command Line Interface (CLI) program that uses npm inquirer to collect data and generate a uniquely-named team site. 
    
This program allows team leaders a quick way to catalog the contact info for members of their project team in one place for ease of access. The site itself could also be held as part of a record in perpetuity. 

I learned a lot about using regex to validate user responses while building this program, which feels like a very powerful tool! It was also great to learn more about how to weave CLIs with JS, HTML, and CSS to churn out files. It was pretty cool seeing it all fit together! 

In the future, additional features could be added to this program, such as adding direct messaging through slack to the finished site, GitHub intern pages, phone extension or phone messaging features, etc. The sky’s the limit!

## Table of Contents
* [Installation](#installation)
* [Instructions for Use](#instructions-for-use)
* [Credits](#credits)
* [License](#license)
    
## Installation
1. This program requires the following programs be installed:<ul><li>node.js</li><li>npm inquirer</li><li>npm jest</li></ul>

2. Before running this program, please have the following information on hand and / or loaded into your 'asset/images' folder:<ul><li>for each team member gather the following:<ul><li>correct spelling of first and last name</li><li>email</li><li>employer ID number</li><li>FOR PERMANENT ENGINEER EMPS: GitHub username</li><li>FOR INTERNS: school they are attending</li></ul></li></ul>


## Instructions for Use
<ol><li>Clone down the repos, open it in your code editor, and open integrated terminal.</li><li>Ensure that all the necessary programs and packages are installed, and that the recommended prep information has been gathered to ensure moving through the program smoothly. <strong>It is important to make sure that you have valid GitHub usernames for any engineers you are attempting to enter into the program. Watch the video walkthrough to see how to bypass this step if necessary.</strong></li><li>Begin the program using the `node index.js` command in your terminal.</li><li>You will first be prompted to enter information about the team manager. This should be the person running the program.</li><img src="/Assets/step_4.png" alt="CLI screen" title="manager assertation" width="500px"><li>After completing your information, you will be prompted to begin adding team members by role.</li><img src="/Assets/step_5b.png" alt="CLI" title="adding an intern" width="500px"><li>Entries are validated before being accepted in the following ways<ul><li>names must be first and last, divided by a space</li><li>EIDs must be numeric only</li><li>emails must contain “@” and “.”</li><li>office numbers must contain a number</li><li>GitHub usernames must return an actual GitHub profile</li></ul>For a visual, reference <a href="/Assets/step_6a.png">this image</a> and <a href="/Assets/step_6b.png" alt="engineer entry">this image</a></li><li>After completing the last question, an HTML file with the department name from your program entry will be [generated in the same folder as the index.js file](/Assets/step_7a.png) you used to run the program. This file is yours to edit as needed and move where you wish.<a href="/Assets/step_7b.png">generated page</a></li><li>Please watch the video walkthrough below.</li></ol>

Here is a [video walkthrough](https://drive.google.com/file/d/1twpcsL2xNGraVXaX901eFTyuiIjb-79G/view?usp=sharing).

## Credits 


- [@UW Full Stack Web Dev Bootcamp](https://bootcamp.uw.edu/): 

  - Initial starter code and teaching me what I’m doing

- [Sameeri’s Code-Inquirer wiki on GitHub](https://github.com/sameeri/Code-Inquirer/wiki/Asking-questions-away-with-Inquirer%21)

  -provided a deeper understanding of how to use validations

- [Eloquent Javascript](https://eloquentjavascript.net/09_regexp.html)

  -some basic information on how regex is written

- [Programiz](https://www.programiz.com/javascript/regex)

  -another overview of the use of regex


## License
The files in this repository are covered by the [MIT License](https://choosealicense.com/licenses/mit/).
