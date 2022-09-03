# Hack The Web
[Github Link](https://github.com/VisheshVGR/Hack_The_Web) | [See live](https://hack-the-web.vercel.app/)


## Table of Contents 📕

- [Tally CodeBrewers-2022](#tally-codebrewers-2022)
- [Tools and Technology](#tools-and-technology)
- [Features :](#features-)
  - [Special Features](#special-features)
  - [Homepage](#homepage)
  - [Contests Page](#contests-page)
  - [Host Page](#host-page)
  - [Single Contest Page](#single-contest-page)
  - [Standings Page](#standings-page)
  - [Future Work](#future-work)
- [Gallery](#gallery)
- [Database Schema](#database-schema)


#  Tally CodeBrewers-2022
* The Challenge
	* Build a Quiz Organizing Platform
	* Essential features which were expected
	   1. Quiz Admin Register, and Sign In flow 
	   2. Quiz Admin can publish a quiz.
	   3. Quiz taker can attempt a quiz using a shared link. 
	   4. Score of all participants for a quiz to be available to quiz admin at the end of quiz
	* Detailed View of the Problem Statement can be found [here](https://mirror1.tallysolutions.com/Downloads/office/ProblemStatement_CommanderofFullStack.pdf)


## Tools and Technology

* The Front-end is created in **React.js** and **Material UI**. 
* For creating Back-end, we used **Firebase**. For the database, we used Google Firestore. We created a very flexible and versatile foundation for our codebase, so that in future its functionality could be easily extended and new agents could be easily added into it.
* For hosting we used **Vercel** which is a cloud platform that enables developers to host websites and web services that deploy instantly, scale automatically, and require no supervision.

# Features :

## Special Features
* All Data is live fetched and updated improving user experience.
* This is a single-page website with no refresh on page change enhancing page load speed.
* Strict security rules with proper feedback messages using react-toastify.
* Responsive website with accessibility features.
  
## Homepage
* Login/Signup 
	* Users can login/signup via Google Authentication. 

## Contests Page
* It has three sections Live Constest / Upcoming Contest / Expired Contests with contest cards in them.
* Each contest card contains following:
* Information about the contest.
* Link to open the constest
* Copy Link button to copy shareable link of the contest
  
## Host Page
* It has four sections Create Contest / Live Constest / Upcoming Contest / Expired Contests with contest cards in them which is hosted by Logged In user.
* Quiz Admin can create and schedule multiple contest.
* Quiz Admin vary weightage of each questions.
* Quiz Admin can share link of the quiz.
* Quiz Admin can see status of all quizzes created till then.
  
## Single Contest Page
* Quiz Takers can access this window through shareable link.
* Quiz Takers can only attempt the quiz withing the time slot assigned by the Quiz Admin.
* Quiz Takers can re-attempt any unsubmitted quiz if any network failure occurs.
* Quiz Takers will get the results instantly after their successfull submission.
* Quiz Takers responses will be valid only if they were submitted with the allotted time duration.

## Standings Page
* Every user can see realtime score of all participants of any quiz. 
* Every user can search for score of any participant through participants name.
* Every user can sort result on the basis of  score.

## Future Work
  * Auto Adding Participants using CSVs
    * Quiz Master will be able to directly add participants instead of manually entering 
everyone.
* Timer per questions
	*	In addition to overall time duration, time per question can also be fixed by Quiz Master
* Prompt users for marked/ unattempted question
	* Before submitting the quiz, participants will get prompted for marked & unanswered questions
* Showing Detailed Statistics 
	* Detailed statistics related to quiz like maximum marks, lowest marks, average marks etc.
* Prompt users for terminated Quizzes.
	* If an quiz is terminated while a participant is attempting quiz, he/she will be prompted that quiz is over
* QuizMasters can share realtime clarifications.  
	* Quiz Masters will be able to share any clarifications regarding quiz or any question that they have

# Gallery

|||
|:-------------------------:|:-------------------------:|
|<img width="1604" alt="Home Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Homepage-1.png">  Home Page |  <img width="1604" alt="Home Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Homepage-2.png"> Home Page |
|<img width="1604" alt="Contests Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Contests-page.png"> Contests Page|<img width="1604" alt="Google Sign In/Out" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/SignIn-Out.png"> Google Sign In/Out |
|<img width="1604" alt="Host Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Hostpage-1.png"> Host Page |<img width="1604" alt="Host Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Hostpage-2.png"> Host Page |
|<img width="1604" alt="Create Contest Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Create-contest.png"> Create Contest Page|<img width="1604" alt="Contest Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Contest-page-1.png"> Contest Page |
|<img width="1604" alt="Contest Page (Questions)" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Contest-page-2.png"> Contest Page (Questions)|<img width="1604" alt="Current Standings Page" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/Current-standings.png"> Current Standings Page |

# Database Schema
* Contests Schema
<img width="1604" alt="Contests Schema" src="https://raw.githubusercontent.com/VisheshVGR/Hack_The_Web/main/Gallery/DB-schema.png">
