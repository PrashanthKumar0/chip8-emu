// screen.js
function Screen(cover){
    this.cover=cover;
    
    this.rows=32;
    this.cols=64;
    //todo:select responsive scale value
    this.scale=10; // scale each block by 10 px
    this.width=this.cols*this.scale;
    this.height=this.rows*this.scale;

    this.pixelColor='orangered';

    this.canvas=document.createElement('canvas');
    this.ctx=this.canvas.getContext('2d');
    this.canvas.width=this.width;
    this.canvas.height=this.height;
    
    this.cover.appendChild(this.canvas);
    

    this.display=new Uint8Array(this.rows*this.cols); //screen buffer 1 for on 0 for off
}

Screen.prototype.clear=function(){
    this.display=new Uint8Array(this.rows*this.cols); //screen buffer 1 for on 0 for off
}

Screen.prototype.setPixel=function(x,y){
    //wrap around edges x axis
    x%=this.cols;
    if(x<0) x+=this.cols;
    //wrap around edges y axis
    y%=this.rows;
    if(y<0) y+=this.rows;

    let i=x+y*(this.cols);
    this.display[i] ^=1;
    return !this.display[i];
}
Screen.prototype.refresh=function(){
    this.ctx.clearRect(0,0,this.width,this.height);
    this.ctx.fillStyle=this.pixelColor;
    for(let y=0;y<this.rows;y++){
        for(let x=0;x<this.cols;x++){
            let datIdx=x+y*this.cols;
            if(this.display[datIdx]){ //if its on
                this.ctx.fillRect(x*this.scale,y*this.scale,this.scale,this.scale);
            }
        }
    }
}