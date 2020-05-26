class Svg{
    static SVG_NS = 'http://www.w3.org/2000/svg';

    constructor(props){
        // TOCHANGE: STYLISTICALLY LOOKS WEIRD
        ({parentSelector: this.parentSelector, 
            width:  this.width = 0, 
            height: this.height = 0,
            viewBox: this.viewBox = '',
            id: this.id = '', 
            class: this.class = ''} = props);
        
        this.DOMELement = this.createElement();
        
    }

    createElement(){
        const _svg = document.createElementNS(Svg.SVG_NS, 'svg');
        
        _svg.setAttributeNS(null,'width', this.width);
        _svg.setAttributeNS(null,'height', this.height);
        _svg.setAttributeNS(Svg.SVG_NS, 'viewBox', this.viewBox);
        _svg.setAttributeNS(null,'id', this.id);
        _svg.setAttribute(null,'class', this.class);

        return _svg;
    }

    render(){
        document.querySelector(this.parentSelector).appendChild(this.DOMELement);
    }

    // Appends and returns an svg line element
    line(x1,y1,x2,y2,id,className){
        // Create line element
        let _line = document.createElementNS(Svg.SVG_NS, 'line');
        _line.setAttribute('x1', x1);
        _line.setAttribute('y1', y1);
        _line.setAttribute('x2', x2);
        _line.setAttribute('y2', y2);
        _line.setAttribute('id',id);
        _line.setAttribute('class',className);

        // Append it to the DOM
        _line = this.DOMELement.appendChild(_line);
        return _line;
    }

    // Appends and returns an svg rect element
    rect(x,y,width,height,id,className){
        // Create line element
        let _rect = document.createElementNS(Svg.SVG_NS, 'rect');
        _rect.setAttribute('x', x);
        _rect.setAttribute('y', y);
        _rect.setAttribute('width', width);
        _rect.setAttribute('height', height);
        _rect.setAttribute('id',id);
        _rect.setAttribute('class',className);

        // Append it to the DOM
        _rect = this.DOMELement.appendChild(_rect);
        return _rect;
    }
}