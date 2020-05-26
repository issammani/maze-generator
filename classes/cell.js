class Cell{
    static wallThickness = 2;
    static wallNames = ['top', 'right', 'bottom', 'left'];

    constructor(props){
        // TOCHANGE: STYLISTICALLY LOOKS WEIRD
        ({svgContainer: this.svgContainer, 
            width:  this.width = 0, 
            height: this.height = 0,
            x:  this.x = 0,
            y:  this.y = 0,
            id: this.id = '', 
            strokeClass: this.strokeClass = '',
            fillerClass: this.fillerClass = ''} = props);

        // A cell is an enclosed space with four walls
        this.walls = {top: null, right: null, bottom: null, left: null};
        this.rect = null; 
        
        this.createElement();


    }

    createElement(){
        
        if(!this.svgContainer || !(this.svgContainer instanceof Svg)){
            console.error('Supplied svg container is not of type Svg');
            return;
        }

        this.rect = this.svgContainer.rect(this.x,this.y,this.width, this.height, this.id, this.fillerClass);

        this.walls = {
            top: this.svgContainer.rect(this.x, this.y, this.width, Cell.wallThickness, '', this.strokeClass),
            right:  this.svgContainer.rect(this.width + this.x, this.y, Cell.wallThickness, this.height, '', this.strokeClass),
            bottom:  this.svgContainer.rect(this.x, this.y + this.height, this.width, Cell.wallThickness, '', this.strokeClass),
            left: this.svgContainer.rect(this.x, this.y, Cell.wallThickness, this.height, '', this.strokeClass)
        };

    }

    /**
     * 
     * @param {*} position 
     * 0 for top
     * 1 for right
     * 2 for bottom
     * 3 for left
     */
    removeWall(position){
        let wallName = Cell.wallNames[position];
        if(wallName && this.walls[wallName]){
            // Remove node from the DOM
            this.svgContainer.remove(this.walls[wallName]);
            // Set to null
            this.walls[wallName] = null;
        }
    }

}