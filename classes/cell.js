class Cell{
    static wallThickness = 2;
    static wallNames = ['top', 'right', 'bottom', 'left'];

    constructor(props){
        // TOCHANGE: STYLISTICALLY LOOKS WEIRD
        ({svgContainer: this.svgContainer, 
            width:  this.width = 0, 
            height: this.height = 0,
            i:  this.i = 0,
            j:  this.j = 0,
            id: this.id = '', 
            strokeClass: this.strokeClass = '',
            fillerClass: this.fillerClass = ''} = props);

        this.x = this.j * this.width;
        this.y = this.i * this.height;

        // A cell is an enclosed space with four walls
        this.walls = {top: null, right: null, bottom: null, left: null};
        this.rect = null; 

        this.visited = false;
        
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

    visit(){
        this.visited = true;
        this.rect.setAttribute('class', 'visited');
    }

    isVisited(){
        return this.visited;
    }

    removeWallBetween(other){

        // Find adjacent wall
        const i_delta = other.i - this.i;
        const j_delta = other.j - this.j;

        if(i_delta === 1){ // Remove top wall from other and bottom from this
            this.removeWall(2);
            other.removeWall(0);
        }else if(i_delta === -1){// Remove bottom wall from other and top from this
            this.removeWall(0);
            other.removeWall(2);
        }else if(j_delta === 1){// Remove left wall from other and right from this
            this.removeWall(1);
            other.removeWall(3);
        }else if(j_delta === -1){// Remove right wall from other and left from this
            this.removeWall(3);
            other.removeWall(1);
        }else{
            // THROW SOME KIND OF ERROR
        }
    }



}