# <p align="center">CODE NEXUS</p>

\
&nbsp;
Live link can be found here - [Code Nexus]()

\
&nbsp;

# Goal for hackathon project

The mission for this project was to create a retro game with 80's music and deploy it. In order to particpate one must be a student at Code Institute or an alumni.
**([Promo Banner](/docs/wireframes/hackathon-banner-20231608.jpg))**

The schedule for the Retro Quest hackathon is as follow for August 2023:

- Wednesday, 16th August
    - Register for the Intro Webinar Here, which kicks off the event at 17:00.
    - Teams will be assigned immediately after the Intro Webinar and announced in the Slack channel.
    - Create your team Slack channel and connect with your Team Facilitator.

- Thursday/Friday, 17th & 18th August
    - Set up your team page in the Hackathon app, project board, workspaces, etc.
    - Plan your project, project management, and dividing up of tasks.
    - Recommended first deployment on Friday.

- Saturday/Sunday, 19th & 20th August
    - Each team member dedicates a minimum of 3-5 hours per day to working in sprints on solo tasks, chatting
with, connecting and working together as a team.
    - Continuous deployment.

- Monday, 21st August
    - Final touches to project.
    - Update Hackathon App team page (team name, project name, banner, logo, description, etc.).
    - Final Deployment.
    - Submit project & add details to team page.
    - **3pm sharp - Project Submission Deadline - no further commits or changes to projects.**
    - Register for the Project Presentations Webinar Here @ 17:00: At least one member per team to join and present.

- Tuesday, 22nd August
    - **Winners Announcement** - Winners will be announced at 4pm on Slack.

# Features

### Existing features:

- Gameplay
    - Character movements:
        - WASD inputs: "key presses for using the WASD inputs allows the characer to move on screen (left, right, up, down)"
        - SpaceBar: allows the character to jump
        - In case of invalid character input: "nothing occurs on screen"
    
    - Shooting (projectiles): 
        - Allows the user to defend themselves against enemies

    - Environment interaction:
        - Climb ladders

- Menu
    - Menu is pressing any key to start game(*kept simplisic due to time constraints*)

- Game screen
    - Blue screen instructing user to press any button to play

- Rules
    - Eliminate enemies and defeat boss

### Future features to implement

- Scoring system
- More interactive menu
- shield pick ups  + more weapons
- collectables


## Testing

- VS Code workspace was used to test functionality for both game and API
- Before deployment data validation was tested with a large number of different inputs. Letters, characters, lengths, reverse, capital, lowercase.

#### Breakpoints

- There are not breakpoints set for this project

### Browser testing

- Test on Firefox, Edge, Chrome, and Safari
- General testing on the laptop of each team member each using Chrome.

### Bugs 

#### During Testing

- (***Ladder climb***) - when reaching top of ladder player would stutter to reach top
- (***Floor fall***) - For some reason characer would fall through fall in a certain location of map but wouldn't always happen

#### Unfixed Bugs
- (***Jump on crouch***) - while crouched user can still jump in crouch animation
- (***Floor fall***) - For some reason characer would fall through fall in a certain location of map but wouldn't always happen


## Hosting & Deployment

- The site was hosted and deployed to GitHub Pages
- No API needed

## Technologies used

### Languages

* javascript
* html

### Frameworks

* kaboom.js

## Credits:

### Text content

Text content was a collaboration between all team members on our constent ***SLACK***  24/7 calls

### Daily logs

In the ***calls*** folder all daily conversations for the project were logged in.
- [20231608-Call](/docs/calls/20231608.md)
- [20231708-Call](/docs/calls/20231708.md)
- [20231808-Call](/docs/calls/20231808.md)
- [20231908-Call](/docs/calls/20231908.md)
- [20232008-Call](/docs/calls/20232008.md)

### Coding help
* The whole team collaborated in helping each other
* The majority of the programming came from :
    * **Sean** and **Robin**
* The majority of the sprite creations was done by: 
    * **Abhilash**
* The majority of the documentation was done by:
    * **Royer**

* Speacial thanks:
    * **Dayna** 
    * For really making an effort but due to school work and life had to depart mid project

### Design
- Map design were mostly assets thanks to:
    - [Warped City](https://ansimuz.itch.io/warped-city "Warped City")

- Main character was also a design from the Warped City assets
- Sprites done by **Abhilash** and **Robin**
- Map design done by **Sean** and **Royer**

### Audio