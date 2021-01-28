# Final Project: JSCube

Web Programming with Python and JavaScript

JSCube is a javascript powered Rubiks cube emulator.  The Django framework is leveraged to enable user creation and the saving of puzzles within user profiles.  The emulator can be used without creating an account, however, only users with accounts and who are logged-in can save their progress on one or more puzzles.


# Files list:
- Django defaults
    - views.py: server side instructions for handling:
        -   initial, open access view of index.html
        -   login/logout
        -   register
        -   retrieve saved puzzles
        -   save puzzles
    -   models.py
        - defines the model for a default user
        - defines the model for a saved puzzle
    - urls.py
        - defines the paths for
            - index
            - login/register/logout
            - saved puzzles
            - save a puzzle
- Templates
    - layout.html: contains title, css and script links, and bootstrap navbar setup
    - login.html: login form
    - register.html: registration form
    - index.html: main html file
        - holds the html to construct the cube emulator   
    - saved_puzzles.html: available only to logged-in users
        - contains list all of a user's saved puzzles
- Static
    - main.js
        - assigns functions to the buttons displayed on index.html
        - defines default values for new puzzles
        - includes the snapshot() function to record a puzzle's history and current square arrangement
        - includes a setColors() function to apply a given arrangement of square colors to the cube
    - horizontal.js
        - defines the functions needed to move squares left or right horizontally
        - defines the function moveRow() that applies colors to the cube based on a passed array of colors and a direction of rotation
            - moveRow() calls a function snapShot() to record the history and current status of the cube
        - defines the function moveFace() that applies colors to one of the 6 cube faces based on a passed array of colors and a direction of rotation
    - vertical.js
        - defines the funtions needed to move squares up or down
        - each function passes arrays of colors to the moveRow() function
        - for puzzle actions that move a cube face, the moveFace() function is called
    - cube.css
        - defines the css styling for the cube
        - defines an animation for the undo and redo buttons when no further actions are available
    - cube.png: picture of a Rubiks cube

# Required Components
- Distinct and not CS50W Pizza Project
    - This project ended up requiring far more front-end development than I anticipated.  While it borrows heavily from prior projects to handle the user registration and login process, everything else was built "from scratch"
- Utilize Django
    - I used Django to allow a user to save their puzzles on the server.  The Puzzle model allows for the storage of textfields that I use to store JSON strings in order to record the layout and history of saved puzzles.
- Mobile responsive
    - While the cube itself remains static, due to the css implementation of the cube effect, all other page components are mobile responsive
- Complexity justification
    -  This project pushed me to better understand the interplay between server and client side code.  Building the cube with javascript and css was very complex (at my skill level).  Connecting the javascript cube to a backend model also proved complicated, and I struggled with managing the conversions required to store data in localStorage as strings then maniulate within javascript or Python as JSON objects.  Future additions to this project would include:
        - A scramble button to randomly configure the cube
        - Interactive cube (I initially tried to use [Chrome Cube Lab](https://chrome.com/cubelab), but it was too complicated for me)
        - A solver option to guide a user through a solution
