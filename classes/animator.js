/*
* Modified from :
* https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
*/
class Animator{

    constructor(fps, callback){
        this.fps = fps;
        this.callback = callback;
        this.interval = 1000/ this.fps;
        this.then = 0;
        this.rafid = null;

        this.wrapper = this.wrapper.bind(this);
    }

    start(){
        console.log('Animation started.');
        this.then = performance.now();
        this.wrapper();
    }

    wrapper(){
        // request another frame
        this.rafid = requestAnimationFrame(this.wrapper);

        let now = performance.now();
        let elapsed = now - this.then;
        if(elapsed >= this.interval){
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = now - (elapsed % this.interval);

            // Call supplied callback
            this.callback();
        }
    }

    stop(){
        cancelAnimationFrame(this.rafid);
        console.log('Animation stopped.');
    }
}
