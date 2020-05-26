class Maze{
    static padding =  50;
    constructor(props){
        // TOCHANGE: STYLISTICALLY LOOKS WEIRD
        ({parentSelector: this.parentSelector = 'body', 
        gridSize:  this.gridSize = 1, 
        cellSize: this.cellSize = 1,
        id: this.id = '', 
        class: this.class = ''} = props);

        this.cellNumber = Math.floor(this.gridSize / this.cellSize);
        
        // Initialize maze
        this.svgContainer = null;
        this.cells = Array(this.cellNumber).fill([]);
        this.maze = this.initialize();
    }

    initialize(){
        this.svgContainer = new Svg({parentSelector: this.parentSelector, width: this.gridSize + Cell.wallThickness, height: this.gridSize + Cell.wallThickness, class: this.class, id: this.id});

        for(let i = 0; i < this.cellNumber; i++){
            for(let j = 0; j < this.cellNumber; j++){
                this.cells[i][j] = new Cell({svgContainer: this.svgContainer, x: this.cellSize * j, y: this.cellSize * i, width: this.cellSize, height: this.cellSize, strokeClass: 'wall', fillerClass: 'area'});
            }
        }
    }

    render(){
        this.svgContainer.render();
    }
}