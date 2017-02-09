function Wave(config){
	this.canvas=config.canvas;
	this.ctx=this.canvas.getContext("2d");
	this.x=config.x;
	this.y=config.y;
	this.r=config.r || 1;
	this.v=config.v;
	this.lineWidth=config.lineWidth;
	this.maxFrame=config.maxFrame || 0;

	this.frameCount=0;
}

Wave.prototype ={
	draw : function(){
		var c= this.ctx;
		var alpha=this.frameCount/this.maxFrame;
		if(alpha >1) {alpha=1;}
		c.strokeStyle="rgba(255,255,255,"+(1-alpha)+")";
		c.lineWidth=this.lineWidth;
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		c.stroke();
		c.closePath();
		c.fillStyle="#f00";
		//c.fillRect(this.x,this.y,this.r,this.r);
		
		this.r+=this.v;
		this.frameCount++;
	},
	
	isAlive : function(){
		return this.frameCount<this.maxFrame ;
	}

}
	

function getRandomWave(config){
	//config is a top drip  need r,x,y,canvas
	var r=Math.random()*0.8*config.r;
	var theta=Math.random()*2*Math.PI;
	var x=config.x+(config.r-r)*Math.cos(theta);
	var y=config.y+(config.r-r)*Math.sin(theta);
	var maxFrame=40*Math.random()+15;
	var v=r/maxFrame;
	return new Wave({
			canvas: config.canvas,
			x : x,
			y : y,
			r : 1,
			v : v,
			lineWidth : Math.floor(Math.random()*5)+1,
			maxFrame : maxFrame,
			});
}

function WaveQueue(){
	var queue = [];
	var offset = 0;
  //this.queue  = queue;
  //this.offset = offset;
  this.getLength = function(){
    return (queue.length - offset);
  }
  this.isEmpty = function(){
    return (queue.length == 0);
  }
  this.enqueue = function(config){
    queue.push(getRandomWave(config));
  }
  this.dequeue = function(){
    if (queue.length == 0) return undefined;
    var item = queue[offset];
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }
	return item;
  }
  this.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }

	this.draw = function(){
		for(var i=offset; i<queue.length; i++){
			queue[i].draw();
		}
	}

	this.clean = function(){
		var i=offset;
		while((! this.isEmpty()) && (! queue[i].isAlive())){
			this.dequeue();
			i=offset;
		}
	}


}


