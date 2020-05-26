# maze generator
A simple maze generator using a backtracker.

## Install
clone this repo !

## Usage

```js
// Instantiate a new maze
const maze = new Maze({parentSelector: '.container', gridSize: 500, cellSize: 20, id: 'maze'});

// Perform this on each tick
const animationCallback = () => {
     if(!m.done()){
        m.generateMaze();
    }else{
        a.stop();
    } 
};

// Render maze to screen
maze.render();

// Get a new Animator instance
const anim = new Animator(10, animationCallback);

// Start animation
anim.start();

```

## Useful links
- [Controlling fps with requestanimationframe](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe)
- [Maze generation algorithm using a recursive backtracker](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker)
