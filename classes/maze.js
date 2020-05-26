class Maze{
    constructor(props){
        // TOCHANGE: STYLISTICALLY LOOKS WEIRD
        ({parentSelector: this.parentSelector = 'body', 
        gridSize:  this.gridSize = 1, 
        cellSize: this.cellSize = 1,
        id: this.id = '', 
        class: this.class = ''} = props);

        this.numberOfCells = Math.floor(this.gridSize / this.cellSize);
        this.svgContainer = null;
        this.cells = [...Array(this.numberOfCells)].map(e => Array(this.numberOfCells));

        // Declarations necessary for the maze generator
        this.S = new Stack();
        this.currentCell = null;
        this.unvisitedCellsCounter = this.numberOfCells * this.numberOfCells;

                
        // Initialize maze
        this.initialize();

        // Bind generateMaze to this context
        this.generateMaze = this.generateMaze.bind(this);
    }

    initialize(){
        this.svgContainer = new Svg({parentSelector: this.parentSelector, width: this.gridSize + Cell.wallThickness, height: this.gridSize + Cell.wallThickness, class: this.class, id: this.id});
        for(let i = 0; i < this.numberOfCells; i++){
            for(let j = 0; j < this.numberOfCells; j++){
                this.cells[i][j] = new Cell({svgContainer: this.svgContainer, width: this.cellSize, height: this.cellSize, i: i, j: j, id: '', strokeClass: 'wall', fillerClass: 'area'});
            }
        }

        // Choose the initial cell, mark it as visited and push it to the stack
        this.currentCell = this.cells[0][0];
        this.currentCell.visit();
        this.S.push(this.currentCell);
    }

    /*
    * Implementation as described here:
    * https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
    */
    generateMaze(){
            // Pop a cell from the stack and make it a current cell
            this.currentCell = this.S.pop();

            // If the current cell has any neighbours which have not been visite
            let randomNeighbour = this.getRandomNonVisitedNeighbour(this.currentCell.i, this.currentCell.j);
            if(randomNeighbour){
                
                // Push the current cell to the stack
                this.S.push(this.currentCell);

                // Remove the wall between the current cell and the chosen cell
                this.currentCell.removeWallBetween(randomNeighbour);

                // Mark the chosen cell as visited and push it to the stack
                randomNeighbour.visit();
                this.S.push(randomNeighbour);

                // Keep track of visited cells
                this.unvisitedCellsCounter--;
            }
    }

    render(){
        this.svgContainer.render();
    }

        
    getNonVisitedNeighbours(i,j){
        const in_range = index => index >= 0 && index < this.numberOfCells;

        return [[-1, 0], [0, 1], [1, 0], [0, -1]]
            .map(mask => in_range(i + mask[0]) && in_range(j + mask[1]) ? this.cells[i + mask[0]][j + mask[1]] : undefined)
            .filter(neighbour => neighbour && !neighbour.isVisited());    
    }

    getRandomNonVisitedNeighbour(i,j){
        const _neighbours = this.getNonVisitedNeighbours(i,j);
        return !_neighbours.length ? undefined : _neighbours[Math.floor(Math.random() * _neighbours.length)];
    }

    done(){
        return this.S.isEmpty();
    }
}