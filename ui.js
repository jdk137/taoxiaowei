var UIPrototype={
/*
	ctx : undefined,
	fixedx : 0,
	fixedy : 0,
	fixedOrien : 'TOP_LEFT',//CENTER TOP BOTTOM LEFT RIGHT TOP_LEFT TOP_RIGHT LEFT_TOP LEFT_BOTTOM RIGHT_TOP RIGHT_BOTTOM BOTTOM_LEFT BOTTOM_RIGHT
	listDirection : 0,//'hrzn' horizon or 'vtcl' vertical
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	bgColor : '#f00',
	prnt : undefined,
	child : [],//[child1,child2]
*/
/*	init :function(){
			for(var i=0; i<this.child.length; i++){
				this.child[i].init();
			}
			this.selfInit();
	  	},
	selfInit : function(){

			   },*/
	getWidth  : function(){
					if(this.child.length === 0){
						return this.width;
					}else{
						if(this.listDirection === 'hrzn' ){
							var w=0;
							for(var i=0; i<this.child.length; i++){
								w += this.child[i].getWidth();
							}
							this.width=w;
						}else{
							var maxW=0,w;
							for(var i=0; i<this.child.length; i++){
								w = this.child[i].getWidth();
								if(w>maxW){maxW=w;}
							}
							this.width=maxW;
						}
						return this.width;
					}
				},

	getHeight : function(){
					if(this.child.length === 0){
						return this.height;
					}else{
						if(this.listDirection === 'hrzn' ){
							var maxH=0,h;
							for(var i=0; i<this.child.length; i++){
								h=this.child[i].getHeight();
								if(h>maxH){	maxH=h;}
							}
							this.height=maxH;
						}else{
							var h=0;
							for(var i=0; i<this.child.length; i++){
								h+=this.child[i].getHeight();
							}
							this.height=h;
						}
						return this.height;	
					}
				},

	refreshPos : function(){
					this.getWidth();
					this.getHeight();
					switch(this.fixedOrien){
						case 'TOP_LEFT':
							this.x=this.fixedx;
							this.y=this.fixedy;
							break;
						case 'TOP':
							this.x=this.fixedx-this.width/2;
							this.y=this.fixedy;
							break;
						case 'TOP_RIGHT':
							this.x=this.fixedx-this.width;
							this.y=this.fixedy;
							break;
						case 'LEFT':
							this.x=this.fixedx;
							this.y=this.fixedy-this.height*0.5;
							break;
						case 'LEFT_TOP':
							this.x=this.fixedx;
							this.y=this.fixedy-this.height*0.2;
							break;
						case 'LEFT_BOTTOM':
							this.x=this.fixedx;
							this.y=this.fixedy-this.height*0.8;
							break;
						case 'RIGHT':
							this.x=this.fixedx-this.width;
							this.y=this.fixedy-this.height*0.5;
							break;
						case 'RIGHT_TOP':
							this.x=this.fixedx-this.width;
							this.y=this.fixedy-this.height*0.2;
							break;
						case 'RIGHT_BOTTOM':
							this.x=this.fixedx-this.width;
							this.y=this.fixedy-this.height*0.8;
							break;
						case 'BOTTOM_LEFT':
							this.x=this.fixedx;
							this.y=this.fixedy-this.height;
							break;
						case 'BOTTOM':
							this.x=this.fixedx-this.width/2;
							this.y=this.fixedy-this.height;
							break;
						case 'BOTTOM_RIGHT':
							this.x=this.fixedx-this.width;
							this.y=this.fixedy-this.height;
							break;
					}
				 },
	//top be clicked;	
	underMouse : function(mouse){
					if(mouse.x<this.x || mouse.x> this.x + this.width -1
						|| mouse.y < this.y || mouse.y > this.y +this.height -1 ){
						return false;
					}else{
						return true;
					}
				},

// move
	mouseMoveActor : function(mouse){
					//draw child content
					var len=this.child.length;
					if(len !== 0){
						if(this.listDirection === 'hrzn'){
							var x=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x-x,
									y : mouse.y
								};
								//var underOrNot=this.child[i].underMouse(newMouse);
								//if(underOrNot){
									this.child[i].mouseMoveActor(newMouse);
								//	return;
								//}
								x+=this.child[i].width;
							}
						}else{
							var y=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x,
									y : mouse.y-y
								};
								//var underOrNot=this.child[i].underMouse(newMouse);
								//if(underOrNot){
									this.child[i].mouseMoveActor(newMouse);
								//	return;
								//}
								y+=this.child[i].height;
							}
						}	
					}	
					this.selfMouseMoveActor();
				},

	selfMouseMoveActor : function(){
				
					 },	

	clickActor : function(mouse){
					//draw child content
					var len=this.child.length;
					if(len !== 0){
						if(this.listDirection === 'hrzn'){
							var x=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x-x,
									y : mouse.y
								};
								var clickOrNot=this.child[i].underMouse(newMouse);
								if(clickOrNot){
									this.child[i].clickActor(newMouse);
									return;
								}
								x+=this.child[i].width;
							}
						}else{
							var y=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x,
									y : mouse.y-y
								};
								var clickOrNot=this.child[i].underMouse(newMouse);
								if(clickOrNot){
									this.child[i].clickActor(newMouse);
									return;
								}
								y+=this.child[i].height;
							}
						}	
					}	
					this.selfClickActor();
				},

	selfClickActor : function(){
				
					 },

	mouseDownActor : function(mouse){
					//draw child content
					var len=this.child.length;
					if(len !== 0){
						if(this.listDirection === 'hrzn'){
							var x=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x-x,
									y : mouse.y
								};
								var clickOrNot=this.child[i].underMouse(newMouse);
								if(clickOrNot){
									this.child[i].mouseDownActor(newMouse);
									return;
								}
								x+=this.child[i].width;
							}
						}else{
							var y=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x,
									y : mouse.y-y
								};
								var clickOrNot=this.child[i].underMouse(newMouse);
								if(clickOrNot){
									this.child[i].mouseDownActor(newMouse);
									return;
								}
								y+=this.child[i].height;
							}
						}	
					}	
					this.selfMouseDownActor();
				},

	selfMouseDownActor : function(){
				
					 },
	mouseUpActor : function(mouse){
					//draw child content
					var len=this.child.length;
					if(len !== 0){
						if(this.listDirection === 'hrzn'){
							var x=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x-x,
									y : mouse.y
								};
								var clickOrNot=this.child[i].underMouse(newMouse);
								if(clickOrNot){
									this.child[i].mouseUpActor(newMouse);
									return;
								}
								x+=this.child[i].width;
							}
						}else{
							var y=0;
							for(var i=0; i<len; i++){
								var newMouse={
									x : mouse.x,
									y : mouse.y-y
								};
								var clickOrNot=this.child[i].underMouse(newMouse);
								if(clickOrNot){
									this.child[i].mouseUpActor(newMouse);
									return;
								}
								y+=this.child[i].height;
							}
						}	
					}	
					this.selfMouseUpActor();
				},

	selfMouseUpActor : function(){
				
					 },						 

	//translate and draw component
	topDraw      : function(){
					this.ctx.save();
					this.ctx.setTransform(1,0,0,1,0,0);
					this.ctx.translate(this.x, this.y);
					this.draw();
					
					/*
					for(var i=0; i<this.child.length; i++){
						//translate();
						this.child[i].draw();
						//transback;
					}
					*/
					this.ctx.restore();
				},

	draw : function(){
					this.selfDraw();
					//draw child content
					var len=this.child.length;
					if(len !== 0){
						if(this.listDirection === 'hrzn'){
							var x=0;
							for(var i=0; i<len; i++){
								this.ctx.translate(x,0);
								this.child[i].draw();
								this.ctx.translate(-x,0);
								x+=this.child[i].width;
							}
						}else{
							var y=0;
							for(var i=0; i<len; i++){
								this.ctx.translate(0,y);
								this.child[i].draw();
								this.ctx.translate(0,-y);
								y+=this.child[i].height;
							}
						}	
					}
				},
	
	selfDraw  : function(){
					//this.drawBackground();
			   },
	drawBackground : function(){
					var c=this.ctx;
					c.fillStyle = this.bgColor;
					var w=this.width,h=this.height;
					if(this.prnt){//not undefined
						if(this.prnt.listDirection === 'hrzn'){
							h=this.prnt.height;
						}else{
							w=this.prnt.width;
						}
					}
					c.fillRect(0, 0, w, h);
				},
	addChild :  function(child){
					this.child[this.child.length]=child;
					child.prnt=this;
				},
	insertChild :  function(child,idx){
					for(var i=this.child.length-1; i>= idx ; i--){
						this.child[i+1]=this.child[i];
					}
					this.child[idx]=child;
					child.prnt=this;
				},
/*	
	delChild : 	function(idx){
					this.child.prnt= undefined;
					this.child.splice(idx,1);
				},
*/
	cleanChild : function(){
					for(var i=0; i<this.child.length; i++){
						this.child[i].prnt = undefined;
					}
					this.child=[];
				 },
	/*
	topMouseMoveActor: function(mouse){
		if(this.underMouse(mouse)){
			this.mouseMoveActor({
				x: mouse.x-this.x,
				y: mouse.y-this.y
			});
		}
	}
	*/
	getSplitSelector : function(){
			var len=this.child.length;
			for(var i=0; i<len; i++){
				var s=this.child[i].getSplitSelector();
				if(s !== ''){
					return s;//the last result could be undefined or 'split=...'
				}
			}						
			return '';
	   },
	getSelectCondition : function(){
			var len=this.child.length;
			var str='';	
			for(var i=0; i<len; i++){
				var s=this.child[i].getSelectCondition();
				if(s !== ''){
					if(str === ''){
						str=s;
					}else{
						str+=','+s;
					}
				}
			}
			return str;
	},

	setFilter : function(showCondition){
		var len=this.child.length;
		for(var i=0; i<len; i++){
			this.child[i].setFilter(showCondition);
		}
	},

	splitToFilter : function(drip){
			var len=this.child.length;
			for(var i=0; i<len; i++){
				this.child[i].splitToFilter(drip);
			}
	},
}


function TopPannel(config){
	this.ctx=config.ctx;
	this.fixedx=config.fixedx || 0;
	this.fixedy=config.fixedy || 0;
	this.fixedOrien=config.fixedOrien || 'TOP_LEFT';
	this.listDirection=config.listDirection || 'hrzn';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.bgColor=config.bgColor || '#f00';
	this.prnt=config.prnt || undefined;
	this.child=config.child || [];

	//this.stateUnderMouse = false;
	this.pauseCount = 0;
	
	this.topClickActor = function(mouse){
		if(this.underMouse(mouse)){
			this.clickActor({
					x: mouse.x-this.x,
					y: mouse.y-this.y
				});
		}
	};
	this.topMouseMoveActor= function(mouse){
		if(this.underMouse(mouse)){
			this.mouseMoveActor({
				x: mouse.x-this.x,
				y: mouse.y-this.y
			});
			this.pauseCount = 0;
		}else if(this.pauseCount >= 15){
			this.mouseMoveActor({
				x: mouse.x-this.x,
				y: mouse.y-this.y
			});
		}else{
			if(mouse.y-this.y<-50){
				this.pauseCount = 15;
			}else{
				this.pauseCount++;
			}
		}
	};
	this.topMouseUpActor= function(mouse){
		if(this.underMouse(mouse)){
			this.mouseUpActor({
				x: mouse.x-this.x,
				y: mouse.y-this.y
			});
		}
	};
	this.topMouseDownActor= function(mouse){
		if(this.underMouse(mouse)){
			this.mouseDownActor({
				x: mouse.x-this.x,
				y: mouse.y-this.y
			});
		}
	};
	this.filterCondition = function(){
		var sp=this.getSplitSelector();
		var se=this.getSelectCondition();
		var s='';
		if (sp !== ''){
			s=sp;
		}
		if (se !== ''){
			if(s === ''){
				s="\"filter\" : {"+se+'}';
			}else{
				s+=', \"filter\" : {'+se+'}';
			}
		}
		return s;
	};

}

TopPannel.prototype = UIPrototype;

function HorizonPannel(config){
	this.ctx=config.ctx;
	this.listDirection='hrzn';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.bgColor=config.bgColor || '#f00';
	this.prnt=config.prnt || undefined;
	this.child=config.child || [];
}

HorizonPannel.prototype = UIPrototype; 


function VerticalPannel(config){
	this.ctx=config.ctx;
	this.listDirection='vtcl';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.bgColor=config.bgColor || '#f00';
	this.prnt=config.prnt || undefined;
	this.child=config.child || [];
}

VerticalPannel.prototype = UIPrototype;

var FilterSingleLine = (function(){
	var lineNum=0;
	//var lineCount={};
	var pauseCount=0;
	var idxUnderMouse =-1;

	return function(config){
		this.ctx=config.ctx;
		this.listDirection='hrzn';
		this.x=config.x || 0;
		this.y=config.y || 0;
		this.width=config.width;
		this.height=config.height;
		this.bgColor=config.bgColor || '#f00';
		this.child=config.child || [];
		this.childColor=config.childColor ;

		this.idx = lineNum;
		lineNum++;

		this.mouseMoveActor= function(mouse){

			if(pauseCount>0){
				pauseCount--;
			}
			
			//reset folding idx to make sure refresh in a round
			this.setFoldingIdx(this.idx);
			var len=this.child.length;
			if(this.underMouse(mouse) === true){
				if(this.idx !== idxUnderMouse ){
					idxUnderMouse = this.idx;
					pauseCount = 32-this.idx;
					return;
				}
				if(pauseCount === 0){
					for(var i=0; i<len; i++){
						//	this.child[i].setState('unfolding');
						this.child[i].state='unfolding';
					}
				}
			}else{
				if(idxUnderMouse === this.idx){
					idxUnderMouse = -1;
					return;
				}
				if(pauseCount >0){		
					return;
				}
				if(this.getFoldingFlag() === false && len>0 && this.child[0].height !== this.child[0].titleHeight){
					for(var i=0; i<len; i++){
						//	this.child[i].setState('folding');
						this.child[i].state='folding';
					}
					this.setFoldingFlag();
				}else{
					for(var i=0; i<len; i++){
						//	this.child[i].setState('stop');
						this.child[i].state='stop';
					}
				}
			}

			//child mouse move
			var x=0;
			for(var i=0; i<len; i++){
				var newMouse={
						x : mouse.x-x,
						y : mouse.y
				};
				this.child[i].mouseMoveActor(newMouse);
				x+=this.child[i].width;
			}
		};
		this.selfDraw=function(){
			this.drawBackground();
		};
	}
})();

FilterSingleLine.prototype=UIPrototype;

FilterSingleLine.prototype.foldingFlag=false;
FilterSingleLine.prototype.foldingArray=[];
FilterSingleLine.prototype.getFoldingFlag = function(){
	return this.__proto__.foldingFlag;
}
FilterSingleLine.prototype.setFoldingFlag = function(){
	this.__proto__.foldingFlag=true;
}
FilterSingleLine.prototype.setFoldingIdx = function(idx){
	if(this.__proto__.foldingArray[idx] === true){
		//new round
		this.__proto__.foldingArray = [];
		this.__proto__.foldingFlag=false;
	}
	this.__proto__.foldingArray[idx]=true;
}

/*
var FilterSingleLineProto={
	foldingFlag : false,
	foldingArray : [],
	getFoldingFlag : function(){
		return this.__proto__.foldingFlag;
	},
	setFoldingFlag : function(){
		this.__proto__.foldingFlag=true;
	},
	setFoldingIdx : function(idx){
		if(this.__proto__.foldingArray[idx] === true){
			//new round
			this.__proto__.foldingArray = [];
			this.__proto__.foldingFlag=false;
		}
		this.__proto__.foldingArray[idx]=true;
	},
}
FilterSingleLine.prototype=FilterSingleLineProto;
FilterSingleLineProto.prototype = UIPrototype;
*/

var SelectorPrototype={
	/*
	id : undefined,
	ctx : undefined,
	state : 'folded',  // folded, unfolded, folding, unfolding, stop
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	splitWidth : 0,
	maxHeight : 0,
	titleHeight : 0,
	allSelectHeight : 0,
	unfoldingSpeed : 10,
	foldingSpeed : 15,
	bgColor : '#f00',
	prnt : undefined,
	child : [],//[child1,child2]
	selectedIndex : undefined,
	//selected :[], //[0,1,01]
	allSelected : true, //false
	mouseOn : false,
	*/

	SplitSelector : undefined,
	adjustTitleTextHeight : (navigator.userAgent.indexOf('Firefox') >= 0) ? 6 : 0,
	adjustTreeLeftTextHeight : (navigator.userAgent.indexOf('Firefox') >= 0) ? 5 : 0,
	adjustTreeRightTextHeight : (navigator.userAgent.indexOf('Firefox') >= 0) ? 3 : 0,
	adjustSliderTextHeight : (navigator.userAgent.indexOf('Firefox') >= 0) ? 2 : -3,

	getWidth  : function(){
					return this.width;
				},

	getHeight : function(){

					if(this.state === 'unfolding'){
						/*
						if(this.speed < 0){
							this.speed =0;
						}else if(this.speed <1){
							this.speed +=1/10;
						}else{
							this.speed =this.unfoldingSpeed;
						}
						*/
						if(this.height-this.titleHeight<=this.unfoldingSpeed){
							this.height +=Math.floor(this.unfoldingSpeed/1);
						}else{
							this.height +=this.unfoldingSpeed;
						}
						this.height += this.speed;

						if(this.height >= this.maxHeight){
							this.height=this.maxHeight;
							this.state='unfolded';
						}else{
							this.state='stop';
						}
					}else if(this.state === 'folding'){
						/*
						if(this.speed > 0){
							this.speed =0;
						}else if(this.speed >-1){
							this.speed -=1/10;
						}else{
							this.speed = -this.foldingSpeed;
						}
						*/
						
						if(this.maxHeight-this.height<=this.foldingSpeed){
							this.height -=Math.floor(this.foldingSpeed/1);
						}else{
							this.height -=this.foldingSpeed;
						}
						
						this.height += this.speed;
						if(this.height <= this.titleHeight){
							this.height = this.titleHeight;
							this.state='folded';
						}else{
							this.state='stop';
						}
					}
					return this.height;
				},

	underMouse : function(mouse){
					if(mouse.x<this.x || mouse.x> this.x + this.width -1
						|| mouse.y < this.y || mouse.y > this.y +this.height -1 ){
					//	this.mouseOn=false;
					//	this.state='folding';	
						return false;
					}else{
					//	this.mouseOn=true;
					//	this.state='unfolding';	
						return true;
					}
				},

	clickActor : function(mouse){	
				 },

	mouseMoveActor : function(mouse){
						 if(this.underMouse(mouse)){
							this.mouseOn=true;
							this.getUnderMouseIndex(mouse);
							if( this.__proto__.SplitSelector !== this.id && mouse.x<=this.splitWidth && mouse.y >= this.titleHeight ){
								document.body.style.topPannelCursor = 'pointer';
							}
						 }else{
							this.mouseOn=false;
							this.cancelUnderMouseIndex();
						 }
					},
	getUnderMouseIndex : function(mouse){
				    },
	cancelUnderMouseIndex : function(mouse){
				    },
	mouseDownActor : function(mouse){
					},
	mouseUpActor : function(mouse){
				   },

	draw : function(){
					},

	drawBackground : function(){
					var c=this.ctx;
					c.fillStyle = this.bgColor;
					c.fillRect(0, 0, this.width, this.height);
				},
	drawAllSelected : function(rightShift){
		var rShift = rightShift || 0;
		var c=this.ctx;
		if(this.allSelected === true){
			c.fillStyle = this.prnt.childColor.selectedFontColor; 
		}else if(this.underMouseIndex === 'all'){
			c.fillStyle = this.prnt.childColor.highlightColor; 
			document.body.style.topPannelCursor = 'pointer';
		}else{
			c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
		}
		c.font = '12px 微软雅黑';
		c.textBaseline = 'top';
		c.fillText('全选',rShift+this.splitWidth+6,this.maxHeight-this.allSelectHeight+8);
	},

	drawTitle : function(titleContent, rightShift){
					var rShift = rightShift || 0;//slider need shift
					var c=this.ctx;
					if(this.__proto__.SplitSelector === this.id){
						c.fillStyle = this.prnt.childColor.highlightColor; 
					}else if(this.allSelected === true){
						c.fillStyle = this.prnt.childColor.selectedFontColor; 
					}else{
						c.fillStyle = this.prnt.childColor.filterTitleColor;
					}
					if( this.__proto__.SplitSelector === this.id ){
						c.fillRect(this.splitWidth-12+rShift,8,12,12);
					}
					c.font = "14px '微软雅黑'";
					c.textBaseline = 'top';
					c.fillText(titleContent, this.splitWidth+6+rShift, 3+this.adjustTitleTextHeight);
					if(this.height > this.titleHeight && this.__proto__.SplitSelector !== this.id && this.mouseOn === false){
						c.save();
						c.globalAlpha=0.6;
						c.strokeStyle='#f96f61';
						c.lineWidth=1;
						c.beginPath();
						this.dashedLine(c, 0, this.titleHeight, this.width, this.titleHeight);
						c.closePath();
						c.stroke();
						c.globalAlpha=1;
						c.restore();
					}
				},


    //function kindly provided by phrogz at:  
    //http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas  
	dashedLine : function (ctx,x, y, x2, y2, dashArray) {
            if (!dashArray) dashArray = [10, 5];  
            var dashCount = dashArray.length;  
            ctx.moveTo(x, y);  
            var dx = (x2 - x), dy = (y2 - y);  
            var slope = dy / dx;  
            var distRemaining = Math.sqrt(dx * dx + dy * dy);  
            var dashIndex = 0, draw = true;  
            while (distRemaining >= 0.1) {  
                var dashLength = dashArray[dashIndex++ % dashCount];  
                if (dashLength > distRemaining) dashLength = distRemaining;  
                var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));  
       
                var signal = (x2 > x ? 1 : -1);  
       
                x += xStep * signal;  
                y += slope * xStep * signal;  
                ctx[draw ? 'lineTo' : 'moveTo'](x, y);  
                distRemaining -= dashLength;  
                draw = !draw;  
            }  
    },

	drawSplit : function(){
					var c=this.ctx;
					c.save();

					if(this.__proto__.SplitSelector === this.id){
						//splited draw
						c.fillStyle = this.prnt.childColor.highlightColor;

						c.beginPath();
						c.moveTo(0,9+this.titleHeight);
						c.arc(9,9+this.titleHeight,9,Math.PI,1.5*Math.PI,false);
						c.lineTo(this.splitWidth,this.titleHeight);
						c.lineTo(this.splitWidth,200);
						c.lineTo(9,200);
						c.arc(9,200-9,9,Math.PI/2,Math.PI,false);
						c.lineTo(0,9+this.titleHeight);
						c.fill();
						c.closePath();

						if(this.height>this.titleHeight){

							//radio box
							c.beginPath();
							c.arc(9,this.titleHeight+16, 7, 0 ,2 * Math.PI,false);
 
   							c.fillStyle = "#fff";
   							c.fill();
    						c.lineWidth = 2;
    						c.strokeStyle = "black";
    						c.stroke();
							c.closePath();

							c.beginPath();
							c.arc(9,this.titleHeight+16, 3, 0 ,2 * Math.PI,false);
   							c.fillStyle = "black";
   							c.fill();
							c.closePath();



							c.fillStyle= this.prnt.childColor.splitBgColor;
							c.fillRect(this.splitWidth,this.titleHeight,this.width-this.splitWidth,this.height-this.titleHeight);							

							c.beginPath();
							c.moveTo(this.splitWidth,this.height-1);
							c.lineTo(this.splitWidth,this.titleHeight);
							c.lineTo(this.width,this.titleHeight);
							c.lineTo(this.width,this.height-1);
							if(this.height === this.maxHeight){
								c.lineTo(this.splitWidth,this.height-1);
							}
							c.closePath();
							c.lineWidth=1;
							c.strokeStyle=this.prnt.childColor.highlightColor;
							c.stroke();

							c.fillStyle = '#fff';
							c.font = '13px 微软雅黑';
							c.textBaseline = 'top';
							c.fillText('以', 2, this.titleHeight+30);
							c.fillText('此', 2, this.titleHeight+46);
							c.fillText('分', 2, this.titleHeight+62);
							c.fillText('类', 2, this.titleHeight+78);
						}

					}else if(this.mouseOn === true){
						//unsplited draw
						//draw()

						c.fillStyle = this.prnt.childColor.highlightColor;
						c.globalAlpha = 0.6;
						c.beginPath();
						c.moveTo(0,9+this.titleHeight);
						c.arc(9,9+this.titleHeight,9,Math.PI,1.5*Math.PI,false);
						c.lineTo(this.splitWidth,this.titleHeight);
						c.lineTo(this.splitWidth,200);
						c.lineTo(9,200);
						c.arc(9,200-9,9,Math.PI/2,Math.PI,false);
						c.lineTo(0,9+this.titleHeight);
						c.fill();
						c.closePath();

						c.globalAlpha =1;

						if(this.height>this.titleHeight){
							c.fillStyle= this.prnt.childColor.moveOnBgColor;
							c.fillRect(this.splitWidth,this.titleHeight,this.width-this.splitWidth,this.height-this.titleHeight);

							c.globalAlpha =0.6;
							
							c.beginPath();
							c.moveTo(this.splitWidth,this.height-1);
							c.lineTo(this.splitWidth,this.titleHeight);
							c.lineTo(this.width,this.titleHeight);
							c.lineTo(this.width,this.height-1);
							if(this.height === this.maxHeight){
								c.lineTo(this.splitWidth,this.height-1);
							}
							c.closePath();
							c.lineWidth=1;
							c.strokeStyle=this.prnt.childColor.highlightColor;
							c.stroke();
							c.globalAlpha =1;



							//radio box
							c.beginPath();
							c.arc(9,this.titleHeight+16, 7, 0 ,2 * Math.PI,false);
 
   							c.fillStyle = "#fff";
   							c.fill();
    						c.lineWidth = 2;
    						c.strokeStyle = "black";
    						c.stroke();
							c.closePath();


							c.fillStyle = '#fff';
							c.font = '13px 微软雅黑';
							c.textBaseline = 'top';
							c.fillText('以', 2, this.titleHeight+30);
							c.fillText('此', 2, this.titleHeight+46);
							c.fillText('分', 2, this.titleHeight+62);
							c.fillText('类', 2, this.titleHeight+78);
						}
					}else{
						/*
						c.fillStyle = '#4e8';
						c.fillRect(0,1,this.splitWidth,this.height);
						*/
					}
					c.restore();
				},

	getSplitSelector : function(){
				if(typeof(this.SplitSelector) === 'undefined'){
					return '';
				}else if(this.SplitSelector === this.id){
					return "\"split\" : \""+this.SplitSelector+"\"";
				}else{
					return '';
				}
	},
	getSelectCondition : function(){
		if(this.allSelected === true){
			return '';
		}else{
			//return this.id+'='+this.child[this.selectedIndex];
			//return this.id+'='+this.selectedIndex;
			return "\""+this.id+"\":\""+this.selectedIndex+"\"";
		}
	},
	
	splitToFilter : function(drip){
		if(drip.info.split === this.id){
			if(this.SplitSelector !== this.id){
				return ;
			}else{
				this.allSelected = false;
				this.__proto__.SplitSelector = undefined;
			}
			for(var i=0; i<this.child.length; i++){
				if(this.child[i] === drip.info.type){
					this.selectedIndex = i;
					break;
				}
			}
		}
	},

	setFilter : function(showCondition){
		if(typeof(showCondition.split) === 'undefined'){
			this.__proto__.SplitSelector = undefined; 
		}else if(showCondition.split === this.id){
			this.__proto__.SplitSelector = this.id; 
		}
		if(typeof(showCondition.filter) !== 'undefined' && typeof(showCondition.filter[this.id]) !== 'undefined'){
			this.selectedIndex = parseInt(showCondition.filter[this.id],10);
			this.allSelected = false;
		}else{
			this.allSelected = true;
		}
	},
}

function ListSelectorPannel(config){

/*	id : undefined,
	ctx : undefined,
	state : 'folded',  // folded, unfolded, folding, unfolding
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	splitWidth : 0,
	maxHeight : 0,
	titleHeight : 0,
	allSelectHeight : 0,
	unfoldingSpeed : 10,
	foldingSpeed : 15,
	bgColor : '#f00',
	prnt : undefined,
	child : [],//[child1,child2]
	selectedIndex : undefined,
	//selected :[], //[0,1,01]
	allSelected : true, //false
	mouseOn : false,

	underMouseIndex : -1;
	itemHeight : 0,  ListSelectorPannel
*/

	this.id=config.id;
	this.ctx=config.ctx;
	this.state=config.state || 'folded';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.splitWidth=config.splitWidth; 
	this.maxHeight =config.maxHeight;
	this.titleHeight =config.titleHeight;
	this.allSelectHeight =config.allSelectHeight;
	this.unfoldingSpeed =config.unfoldingSpeed || 20;
	this.foldingSpeed =config.foldingSpeed || 20;
	this.speed = 0;
	this.bgColor =config.bgColor || 'f00';
	this.prnt = config.prnt || undefined;
	this.child =config.child || []; //[child1,child2]
	this.selectedIndex =config.selectedIndex || -1;
	//this.selected =config.selected || [];//[0,1,01]
	this.allSelected =config.allSelected || false; //false
	this.mouseOn =config.mouseOn || false;

	this.underMouseIndex = -1;
	//this.itemHeight =config.itemHeight;
	this.itemHeight=(this.maxHeight-this.titleHeight-this.allSelectHeight)/this.child.length;

	this.clickActor = function(mouse){
					if(mouse.x<=this.splitWidth && mouse.y >= this.titleHeight){
						//split
						this.__proto__.SplitSelector=this.id;
					}else{
						if(mouse.y<this.titleHeight){
							//nothing
						}else if(mouse.y>=this.maxHeight-this.allSelectHeight){
							this.allSelected=true;
							this.selectedIndex=-1;
						}else{
							this.allSelected=false;
							this.selectedIndex=this.underMouseIndex;
							if(this.__proto__.SplitSelector === this.id){
								this.__proto__.SplitSelector=undefined;
							}
						}
					}
				};

	this.getUnderMouseIndex = function(mouse){
		if(mouse.x>this.splitWidth && mouse.y>=this.titleHeight && mouse.y<this.maxHeight-this.allSelectHeight){
			this.underMouseIndex = Math.floor((mouse.y-this.titleHeight)/this.itemHeight);
		}else if(mouse.x>this.splitWidth && mouse.y>=this.maxHeight-this.allSelectHeight){
			//all selected
			this.underMouseIndex = 'all';
		}else{
			//no item or allSelect undermouse
			this.underMouseIndex = -1;
		}
	};

	this.cancelUnderMouseIndex = function(){
		this.underMouseIndex = -1;
	};	

	this.draw = function(){
					var c=this.ctx;
					
					this.drawSplit();
					//draw title
					var titleContent =this.id;
					if(this.allSelected === true){
						titleContent+=' (全)';
					}else{
						titleContent += ' ('+this.child[this.selectedIndex]+')';
					}
					this.drawTitle(titleContent);

					//draw items
					var h=this.titleHeight;
					var allSelectH=this.maxHeight-this.allSelectHeight-this.itemHeight/2;
					var i=0;

					while(this.height>h && h<allSelectH){
						if(this.selectedIndex === i ){
							c.fillStyle = this.prnt.childColor.selectedFontColor; 
						}else if(this.underMouseIndex === i){
							c.fillStyle = this.prnt.childColor.highlightColor;
							document.body.style.topPannelCursor = 'pointer';
						}else if(this.allSelected === true){
							c.fillStyle = this.prnt.childColor.selectedFontColor; 
						}else{
							c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
						}

						this.drawItem(this.child[i],this.splitWidth+6,h+this.itemHeight/2);

						i++;
						h+=this.itemHeight;
					}

					if(this.height>=allSelectH){
						//draw all Selected
						this.drawAllSelected();		
					}
				};

	this.drawItem = function(text,x,y){
			var c = this.ctx;
			var fontHeight=14;
			c.font = fontHeight+'px 微软雅黑';
			c.textBaseline = 'top';
			c.fillText(text,x, y-fontHeight/2);	
	};

}
ListSelectorPannel.prototype = SelectorPrototype;



function TableSelectorPannel(config){
/*	id : undefined,
	ctx : undefined,
	state : 'folded',  // folded, unfolded, folding, unfolding
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	splitWidth : 0,
	maxHeight : 0,
	titleHeight : 0,
	allSelectHeight : 0,
	unfoldingSpeed : 10,
	foldingSpeed : 15,
	bgColor : '#f00',
	prnt : undefined,
	child : [],//[child1,child2]
	selectedIndex : undefined,
	//selected :[], //[0,1,01]
	allSelected : true, //false
	mouseOn : false,

	itemHeight : 0, 
	itemWidth :0,
	row :4,
	col :3,
 */

	this.id=config.id;
	this.ctx=config.ctx;
	this.state=config.state || 'folded';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.splitWidth=config.splitWidth; 
	this.maxHeight =config.maxHeight;
	this.titleHeight =config.titleHeight;
	this.allSelectHeight =config.allSelectHeight;
	this.unfoldingSpeed =config.unfoldingSpeed || 20;
	this.foldingSpeed =config.foldingSpeed || 20;
	this.speed = 0;
	this.bgColor =config.bgColor || 'f00';
	this.prnt = config.prnt || undefined;
	this.child =config.child || []; //[child1,child2]
	this.selectedIndex =config.selectedIndex || undefined;
	//this.selected =config.selected || [];//[0,1,01]
	this.allSelected =config.allSelected || false; //false
	this.mouseOn =config.mouseOn || false;

//	this.itemHeight =config.itemHeight;
//	this.itemWidth =config.itemWidth;
	//this.row =config.row;
	this.underMouseIndex = -1;
	this.col =config.col;

	this.itemHeight=(this.maxHeight-this.titleHeight-this.allSelectHeight)/Math.ceil(this.child.length/this.col);
	this.itemWidth=(this.width-this.splitWidth)/this.col;

	this.clickActor = function(mouse){
					if(mouse.x<=this.splitWidth && mouse.y >= this.titleHeight){
						//split
						this.__proto__.SplitSelector=this.id;
					}else{
						if(mouse.y<this.titleHeight){
							//nothing
						}else if(mouse.y>=this.maxHeight-this.allSelectHeight){
							this.allSelected=true;
							this.selectedIndex=-1;
						}else{
							if(this.underMouseIndex !== -1){
								this.allSelected=false;
								this.selectedIndex=this.underMouseIndex;
								if(this.__proto__.SplitSelector === this.id){
									this.__proto__.SplitSelector=undefined;
								}
							}
						}
					}
				};

	this.getUnderMouseIndex = function(mouse){
		if(mouse.x>this.splitWidth && mouse.y>=this.titleHeight && mouse.y<this.maxHeight-this.allSelectHeight){
				var r=Math.floor((mouse.y-this.titleHeight)/this.itemHeight);
				var c=Math.floor((mouse.x-this.splitWidth)/this.itemWidth);
				var idx=r*this.col+c;
				if(idx >= this.child.length){
					this.underMouseIndex = -1;
				}else{
					this.underMouseIndex = idx;
				}
		}else if(mouse.x>this.splitWidth && mouse.y>=this.maxHeight-this.allSelectHeight){
			//all selected
			this.underMouseIndex = 'all';
		}else{
			//no item or allSelect undermouse
			this.underMouseIndex = -1;
		}
	};

	this.cancelUnderMouseIndex = function(){
		this.underMouseIndex = -1;
	};	

	this.draw = function(){
					var c=this.ctx;

					this.drawSplit();

					//draw title
					var titleContent =this.id;
					if(this.allSelected === true){
						titleContent+=' (全)';
					}else{
						titleContent += ' ('+this.child[this.selectedIndex]+')';
					}
					this.drawTitle(titleContent);
				
					//draw items
					var h=this.titleHeight;
					var allSelectH=this.maxHeight-this.allSelectHeight-this.itemHeight/2;
					var i=0;

					while(this.height>h && h<allSelectH){

						for(var j=0; j<this.col; j++){
							if(i+j>=this.child.length){break;}
							if(this.selectedIndex === i+j ){
								c.fillStyle = this.prnt.childColor.selectedFontColor; 
							}else if(this.underMouseIndex === i+j){
								c.fillStyle = this.prnt.childColor.highlightColor;
								document.body.style.topPannelCursor = 'pointer';
							}else if(this.allSelected === true){
								c.fillStyle = this.prnt.childColor.selectedFontColor; 
							}else{
								c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
							}						
							var fontHeight=14;
							c.font = fontHeight+'px 微软雅黑';
							c.textBaseline = 'top';
							c.fillText(this.child[i+j],this.splitWidth+j*this.itemWidth+6,h+this.itemHeight/2-fontHeight/2);		
						}

						i+=this.col;
						h+=this.itemHeight;
					}

					if(this.height>=allSelectH){
						//draw all Selected
						this.drawAllSelected();		
					}

				};
}
TableSelectorPannel.prototype = SelectorPrototype;



function SliderSelectorPannel(config){
/*	id : undefined,
	ctx : undefined,
	state : 'folded',  // folded, unfolded, folding, unfolding
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	splitWidth : 0,
	maxHeight : 0,
	titleHeight : 0,
	allSelectHeight : 0,
	unfoldingSpeed : 10,
	foldingSpeed : 15,
	bgColor : '#f00',
	prnt : undefined,
	child : [],//[child1,child2]
	//selectedIndex : undefined,
	//selected :[], //[0,1,01]
	allSelected : true, //false
	mouseOn : false,

	barWidth :0,
 	itemHeight : 0, 
	top :0,
	bottom : 5,
	barState : 'stop', //'bottomMove', 'topMove'
	movingLevel : -1,
 */

	this.id=config.id;
	this.ctx=config.ctx;
	this.state=config.state || 'folded';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.splitWidth=config.splitWidth; 
	this.maxHeight =config.maxHeight;
	this.titleHeight =config.titleHeight;
	this.allSelectHeight =config.allSelectHeight;
	this.unfoldingSpeed =config.unfoldingSpeed || 20;
	this.foldingSpeed =config.foldingSpeed || 20;
	this.speed = 0;
	this.bgColor =config.bgColor || 'f00';
	this.prnt = config.prnt || undefined;
	this.child =config.child || []; //[child1,child2]
	//this.selectedIndex =config.selectedIndex || undefined;
	//this.selected =config.selected || [];//[0,1,01]
	this.allSelected =config.allSelected || false; //false
	this.mouseOn =config.mouseOn || false;

	this.barWidth=config.barWidth;
// 	this.itemHeight =config.itemHeight; 
	this.top=config.top || 0;
	this.bottom =config.bottom || this.child.length-1;
	this.barState =config.barState || 'stop'; //'bottomMove', 'topMove'
	this.movingLevel =config.movingLevel || -1;
	this.underMouseIndex = -1;
	this.barIsUnderMouse = false;
	
	if(this.allSelected === true){
		this.top=0;
		this.bottom=this.child.length-1;
	}

	this.itemHeight=(this.maxHeight-this.titleHeight-this.allSelectHeight)/this.child.length;

	this.mouseDownActor = function(mouse){
					if(mouse.x>this.splitWidth && mouse.x<this.splitWidth+this.barWidth
							&& mouse.y>this.titleHeight
							&& mouse.y<this.maxHeight - this.allSelectHeight){
						var t=(mouse.y-this.titleHeight)/this.itemHeight;
						if(this.top === this.bottom){
							if(this.top===0){
								this.barState='bottomMove';
							}else if(this.top===this.child.length-1){
								this.barState='topMove';
							}else if(t<this.top+0.5){
								this.barState='topMove';
							}else{
								this.barState='bottomMove';
							}
						}else if(Math.abs(t-(this.top+0.5))<Math.abs(t-(this.bottom+0.5))){
							this.barState='topMove';
						}else{
							this.barState='bottomMove';
						}
					//	this.movingLevel = Math.floor(t);
					}
				};
	this.mouseUpActor = function(mouse){
					if(this.barState === 'stop'){
						//click
						if(mouse.x<=this.splitWidth && mouse.y >= this.titleHeight){
							//split
							this.__proto__.SplitSelector=this.id;
						}else{
							if(mouse.y<this.titleHeight){
								//nothing
							}else if(mouse.y>=this.maxHeight-this.allSelectHeight){
								this.allSelected=true;
								this.top=0;
								this.bottom=this.child.length-1;
							}else if(mouse.x > this.splitWidth + this.barWidth){
								this.allSelected=false;
								if(this.__proto__.SplitSelector === this.id){
									this.__proto__.SplitSelector=undefined;
								}
								this.top=this.underMouseIndex;
								this.bottom=this.underMouseIndex;
							}
						}
					}else{
						//drag
						var t=(mouse.y-this.titleHeight)/this.itemHeight;
						if(this.barState === 'topMove'){
							if(t>this.bottom+0.5){t=this.bottom+0.5;}
							this.top=this.movingLevel;
						}else{
							if(t<this.top+0.5){t=this.top+0.5;}
							this.bottom=this.movingLevel;
						}
						if(this.top === 0 && this.bottom === this.child.length-1){
							this.allSelected = true;
						}else{
							this.allSelected = false;
						}
						this.movingLevel=-1;
						this.barState='stop';
					}
				};

	this.getUnderMouseIndex = function(mouse){
		//get movingLevel
		if(this.barState !== 'stop'){
			//get t
			var t=(mouse.y-this.titleHeight)/this.itemHeight;
			if(t<0.5){t=0.5;}
			if(t>this.child.length-0.5){t=this.child.length-0.5;}
			if(this.barState === 'topMove'){
				if(t>this.bottom+0.5){t=this.bottom+0.5;}
			}else{
				if(t<this.top+0.5){t=this.top+0.5;}
			}
			this.movingLevel = Math.floor(t);
		}

		if(mouse.x>this.splitWidth+this.barWidth && mouse.y>=this.titleHeight && mouse.y<this.maxHeight-this.allSelectHeight){
			this.underMouseIndex = Math.floor((mouse.y-this.titleHeight)/this.itemHeight);
		}else if(mouse.x>this.splitWidth && mouse.y>=this.maxHeight-this.allSelectHeight){
			//all selected
			this.underMouseIndex = 'all';
		}else{
			//no item or allSelect undermouse
			this.underMouseIndex = -1;
		}

		if(this.barState === 'stop' && mouse.x>this.splitWidth  && mouse.x <= this.splitWidth + this.barWidth && mouse.y>=this.titleHeight){
			this.barIsUnderMouse = true;
		}else{
			this.barIsUnderMouse = false;
		}

	};

	this.cancelUnderMouseIndex = function(){
			this.barState='stop';
			this.underMouseIndex=-1;
			this.barIsUnderMouse =false;
	};

	this.clickActor = function(mouse){
		// replaced by mouseUpActor
	};

	this.draw = function(){
					var c=this.ctx;

					this.drawSplit();

					var titleContent =this.id;
					if(this.allSelected === true){
						titleContent+=' (全)';
					}else{
						if(this.top === this.bottom){
							titleContent += ' ('+this.child[this.top]+')';
						}else{
							titleContent += ' ('+this.child[this.top]+'...)';
						}
					}
					this.drawTitle(titleContent, 24);

					//draw items
					var up,down;
					if(this.barState === 'stop'){
						up = this.top;
						down = this.bottom;
					}else{
						if(this.barState === 'topMove'){
							up = this.movingLevel;
							down = this.bottom;
						}else{
							up = this.top;
							down = this.movingLevel;
						}
					}

					var left=this.splitWidth+this.barWidth;
					var allSelectH=this.maxHeight-this.allSelectHeight-this.itemHeight/2;
					var h=this.titleHeight;
					var i=0;

					c.beginPath();
					c.lineWidth = 1;
					c.strokeStyle = this.prnt.childColor.unSelectedFontColor;
					c.moveTo(this.splitWidth+this.barWidth/2,Math.floor(h+this.itemHeight/2));
					c.lineTo(this.splitWidth+this.barWidth/2,Math.ceil(this.maxHeight-this.allSelectHeight-this.itemHeight/2));
					c.closePath();
					c.stroke();

					while(this.height>h && h<allSelectH){
						//draw slider bar in this line
						if(this.barState === 'stop'){
							if(this.barIsUnderMouse === true){
								c.fillStyle =  this.prnt.childColor.highlightColor; 
								c.strokeStyle = this.prnt.childColor.highlightColor;
								document.body.style.topPannelCursor = 'pointer';
							}else{
								c.fillStyle =  this.prnt.childColor.selectedFontColor; 
								c.strokeStyle = this.prnt.childColor.selectedFontColor;
							}
						}else{
							c.fillStyle =  this.prnt.childColor.unSelectedFontColor;
							c.strokeStyle = this.prnt.childColor.unSelectedFontColor; 
						}

						var lineWidth=3;
						if(i < up){
							//nothing
						}else if(i === up){
							//draw up point
							c.beginPath();
							c.arc(this.splitWidth+this.barWidth/2, h+this.itemHeight/2, 5, 0, 2 * Math.PI, false);
							c.fill();
							
							if(i === down){
								//nothing
							}else{
								c.beginPath();
								c.lineWidth = lineWidth;
								c.moveTo(this.splitWidth+this.barWidth/2,Math.floor(h+this.itemHeight/2));
								c.lineTo(this.splitWidth+this.barWidth/2,Math.ceil(h+this.itemHeight));
								c.stroke();
							}

						}else{
							if(i<down){
								c.beginPath();
								c.lineWidth = lineWidth;
								c.moveTo(this.splitWidth+this.barWidth/2,Math.floor(h));
								c.lineTo(this.splitWidth+this.barWidth/2,Math.ceil(h+this.itemHeight));
								c.stroke();
							}else if(i === down){
								//draw down point
								c.beginPath();
								c.arc(this.splitWidth+this.barWidth/2, h+this.itemHeight/2, 5, 0, 2 * Math.PI, false);
								c.fill();
								c.beginPath();
								c.lineWidth = lineWidth;
								c.moveTo(this.splitWidth+this.barWidth/2,Math.floor(h));
								c.lineTo(this.splitWidth+this.barWidth/2,Math.ceil(h+this.itemHeight/2));
								c.stroke();
							}else{
								//nothing
							}
						}

						var left=this.splitWidth+this.barWidth;
					
						if(this.top === i && i=== this.bottom){
							c.fillStyle = this.prnt.childColor.selectedFontColor; 
						}else if(this.underMouseIndex === i){
							c.fillStyle = this.prnt.childColor.highlightColor; 
							document.body.style.topPannelCursor = 'pointer';
						}else if(this.allSelected === true){
							c.fillStyle = this.prnt.childColor.selectedFontColor;
						}else if(this.top <= i && i<= this.bottom){
							c.fillStyle = this.prnt.childColor.selectedFontColor; 
						}else{
							c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
						}


						this.drawItem(this.child[i],left,h);
						
						i++;
						h+=this.itemHeight;
					}

					if(this.height>this.titleHeight){
						//draw all Selected
						this.drawAllSelected(this.barWidth);	
					}
				};

	this.drawItem = function(text,x,y){
			var c = this.ctx;
			var fontHeight=14;
			c.font = fontHeight+'px 微软雅黑';
			c.textBaseline = 'top';
			c.fillText(text,x+6, y+this.itemHeight/2-fontHeight/2+this.adjustSliderTextHeight);	
	}

	this.getSelectCondition = function(){
		if(this.allSelected === true){
			return '';
		}else if(this.top === this.bottom){
			//return this.id+'='+this.child[this.top];
			return "\""+this.id+"\":\""+this.top+"\"";
		}else{
//			return this.id+'='+this.child[this.top]+'___'+this.child[this.bottom];
			return "\""+this.id+"\":\""+this.top+'_'+this.bottom+"\"";
		}
	};

	this.splitToFilter = function(drip){
		if(drip.info.split === this.id){
			if(this.SplitSelector !== this.id){
				return ;
			}else{
				this.allSelected = false;
				this.__proto__.SplitSelector = undefined;
			}
			for(var i=0; i<this.child.length; i++){
				if(this.child[i] === drip.info.type){
					this.top = i;
					this.bottom = i;
					break;
				}
			}
		}
	};

	this.setFilter = function(showCondition){
		if(typeof(showCondition.split) === 'undefined'){
			this.__proto__.SplitSelector = undefined; 
		}else if(showCondition.split === this.id){
			this.__proto__.SplitSelector = this.id; 
		}
		if(typeof(showCondition.filter) !== 'undefined' && typeof(showCondition.filter[this.id]) !== 'undefined'){
			var idxs=showCondition.filter[this.id].split('_');
			this.top = parseInt(idxs[0],10);
			if(idxs.length <2){
				// not a range, a point , without '_'
				this.bottom = this.top;
			}else{
				this.bottom = parseInt(idxs[1],10);
			}
			this.allSelected = false;
		}else{
			this.allSelected = true;
		}
	};


}
SliderSelectorPannel.prototype = SelectorPrototype;

function TreeSelectorPannel(config){
/*	id : undefined,
	ctx : undefined,
	state : 'folded',  // folded, unfolded, folding, unfolding
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	splitWidth : 0,
	maxHeight : 0,
	titleHeight : 0,
	allSelectHeight : 0,
	unfoldingSpeed : 10,
	foldingSpeed : 15,
	bgColor : '#f00',
	prnt : undefined,
	child : [],//[{name: '服装', child: ['女装','男装']},{name: '玩具', child: ['small','big']},{name: '电子产品', child: ['高档','低档']}],//[child1,child2]
	//selectedIndex : undefined,
	//selected :[], //[0,1,01]
	allSelected : true, //false
	mouseOn : false,

	leftWidth :0,
	centerWidth :0,
	leftItemHeight :0,
	rightItemHeight :0,
	rightTop: 0,
	selectedIndex1 : 0,
	selectedIndex2 : 0,
	underMouseIndex1 :-1,
 */

	this.id=config.id;
	this.ctx=config.ctx;
	this.state=config.state || 'folded';
	this.x=config.x || 0;
	this.y=config.y || 0;
	this.width=config.width;
	this.height=config.height;
	this.splitWidth=config.splitWidth; 
	this.maxHeight =config.maxHeight;
	this.titleHeight =config.titleHeight;
	this.allSelectHeight =config.allSelectHeight;
	this.unfoldingSpeed =config.unfoldingSpeed || 20;
	this.foldingSpeed =config.foldingSpeed || 20;
	this.speed =0;
	this.bgColor =config.bgColor || 'f00';
	this.prnt = config.prnt || undefined;
	this.child =config.child || []; //[{name: 'n1', child: ['n2','n3']},...]
	//this.selectedIndex =config.selectedIndex || undefined;
	//this.selected =config.selected || [];//[0,1,01]
	this.allSelected =config.allSelected || false; //false
	this.mouseOn =config.mouseOn || false;

	this.leftWidth=config.leftWidth;
	this.centerWidth=config.centerWidth;
//	this.leftItemHeight=config.leftItemHeight;
//	this.rightItemHeight =config.rightItemHeight; 
	this.rightTop=config.rightTop || this.titleHeight; 
	this.selectedIndex1 =config.selectedIndex1 || -1; 
	this.selectedIndex2 =config.selectedIndex2 || -1; 
	this.underMouseIndex1 =config.underMouseIndex1 || -1; 
	this.underMouseIndex2 = -1;

	this.leftItemHeight=(this.maxHeight-this.titleHeight-this.allSelectHeight)/this.child.length;
	var maxChildLength=0;
	for(var i=0; i<this.child.length; i++){
		var l=this.child[i].child.length;
		if(l>maxChildLength){maxChildLength=l;}
	}
	this.rightItemHeight=(this.maxHeight-this.titleHeight-this.allSelectHeight)/maxChildLength;
	
	if(this.rightItemHeight>this.leftItemHeight){
		this.rightItemHeight=this.leftItemHeight;
	}

	this.drawAllSelected = function(){
						var c=this.ctx;
						if(this.allSelected === true){
							c.fillStyle = this.prnt.childColor.selectedFontColor; 
						}else if(this.underMouseIndex1 === 'all'){
							c.fillStyle = this.prnt.childColor.highlightColor; 
							document.body.style.topPannelCursor = 'pointer';
						}else{
							c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
						}
						c.font = '12px 微软雅黑';
						c.textBaseline = 'top';
						c.fillText('全选',this.splitWidth+6,this.maxHeight-this.allSelectHeight+8);
	}

	this.clickActor = function(mouse){
						if(mouse.x<=this.splitWidth && mouse.y >= this.titleHeight){
							//split
							this.__proto__.SplitSelector=this.id;
						}else{
							if(mouse.y<this.titleHeight){
								//nothing
							}else if(mouse.y>=this.maxHeight-this.allSelectHeight){
								this.allSelected=true;
								this.selectedIndex1= -1;
								this.selectedIndex2= -1;
							}else if(this.underMouseIndex1 !== -1 && this.underMouseIndex1 !== 'all' 
									&& mouse.x > this.splitWidth + this.leftWidth + this.centerWidth
									&& mouse.y>this.rightTop
									&& mouse.y<this.rightTop + this.rightItemHeight * this.child[this.underMouseIndex1].child.length){
								//right items be clicked 
								this.allSelected=false;
								if(this.__proto__.SplitSelector === this.id){
									this.__proto__.SplitSelector=undefined;
								}
								this.selectedIndex1=this.underMouseIndex1;
								this.selectedIndex2=this.underMouseIndex2;
							}
						}
				};

	this.getUnderMouseIndex = function(mouse){
		if(mouse.x>this.splitWidth && mouse.y>=this.titleHeight && mouse.y<this.maxHeight-this.allSelectHeight){
			if( mouse.x<this.splitWidth+this.leftWidth ){
				this.underMouseIndex1 = Math.floor((mouse.y-this.titleHeight)/this.leftItemHeight);
				this.underMouseIndex2 = -1;
			}else if(this.underMouseIndex1 !== -1 && this.underMouseIndex1 !== 'all'
					&& mouse.x > this.splitWidth + this.leftWidth + this.centerWidth
					&& mouse.y>this.rightTop
					&& mouse.y<this.rightTop + this.rightItemHeight * this.child[this.underMouseIndex1].child.length){
				//this.underMouseIndex1=this.underMouseIndex1;
				this.underMouseIndex2=Math.floor((mouse.y-this.rightTop)/this.rightItemHeight);
			}
		}else if(mouse.x>this.splitWidth && mouse.y>=this.maxHeight-this.allSelectHeight){
			//all selected
			this.underMouseIndex1 = 'all';
			this.underMouseIndex2 = -1;
		}else{
			//no item or allSelect undermouse
			this.underMouseIndex1 = -1;
			this.underMouseIndex2 = -1;
		}
	};

	this.cancelUnderMouseIndex = function(){
		this.underMouseIndex1 = -1;
		this.underMouseIndex2 = -1;
	};	

	this.draw = function(){
					var c=this.ctx;

					this.drawSplit();
					//draw title
					var titleContent =this.id;
					if(this.allSelected === true){
						titleContent+=' (全)';
					}else{
						titleContent += ' ('+this.child[this.selectedIndex1].child[this.selectedIndex2]+')';
					}
					this.drawTitle(titleContent);

					//draw left items
					var h=this.titleHeight;
					var allSelectH=this.maxHeight-this.allSelectHeight-this.leftItemHeight/2;
					var i=0;

					while(this.height>h && h<allSelectH){			
						var left=this.splitWidth;

						if(this.allSelected === true){
							c.fillStyle =  this.prnt.childColor.selectedFontColor; 
						}else if(this.selectedIndex1 === i){
							c.fillStyle = this.prnt.childColor.selectedFontColor; 
						}else{
							c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
						}
						c.font = '14px 微软雅黑';
						c.textBaseline = 'top';
						c.fillText(this.child[i].name,left+6,h+this.adjustTreeLeftTextHeight );

						i++;
						h+=this.leftItemHeight;
					}

					if(this.underMouseIndex1 !== -1 && this.underMouseIndex1 !== 'all'){
						//draw center and right
						
						//get rightTop
						var leftLineY=this.titleHeight+(this.underMouseIndex1+0.5)*this.leftItemHeight;
						var rightItemsHeight=this.rightItemHeight*this.child[this.underMouseIndex1].child.length;
						this.rightTop=leftLineY-rightItemsHeight/2;
						if(this.rightTop<this.titleHeight){
							this.rightTop=this.titleHeight;
						}
						if(this.rightTop+rightItemsHeight>this.maxHeight-this.allSelectHeight){
							this.rightTop=this.maxHeight-this.allSelectHeight-rightItemsHeight;
						}

						var rightBottom=this.rightTop+rightItemsHeight;

						var h=this.rightTop;
						var i=0;
						var left=this.splitWidth+this.leftWidth;

						var rightItems=this.child[this.underMouseIndex1].child;
						while(rightBottom>h){

							//draw right line and vertical line
							//vertical line top
							var lineTop=h;
							if(i===0){lineTop+=this.rightItemHeight/2;}
							//vertical line bottom
							var lineBottom=h+this.rightItemHeight;
							if(i===rightItems.length-1){lineBottom=h+this.rightItemHeight/2;}

							c.beginPath();
							c.strokeStyle = '#000';
							c.lineWidth = 2;
							//draw vertical line
							c.moveTo(left+this.centerWidth/2,lineTop);
							c.lineTo(left+this.centerWidth/2,lineBottom);
							//draw horizon line
							c.moveTo(left+this.centerWidth/2,h+this.rightItemHeight/2);
							c.lineTo(left+this.centerWidth,h+this.rightItemHeight/2);
							//draw possible left line
							if(leftLineY>= h && leftLineY < h+this.rightItemHeight){
								c.moveTo(left+this.centerWidth/2,leftLineY);
								c.lineTo(left,leftLineY);
							}
							c.stroke();

							//right items
							if(this.selectedIndex1 === this.underMouseIndex1 && this.selectedIndex2 ===i){
								c.fillStyle = this.prnt.childColor.selectedFontColor; 
							}else if(this.underMouseIndex2 === i){
								c.fillStyle = this.prnt.childColor.highlightColor;
								document.body.style.topPannelCursor = 'pointer';
							}else if(this.allSelected === true){
								c.fillStyle = this.prnt.childColor.selectedFontColor; 
							}else{
								c.fillStyle = this.prnt.childColor.unSelectedFontColor; 
							}

							c.font = '12px 微软雅黑';
							c.textBaseline = 'top';
							c.fillText(rightItems[i],left+this.centerWidth+6,h+this.adjustTreeRightTextHeight );

							i++;
							h+=this.rightItemHeight;
						}
					}
					if(this.height>this.titleHeight){
						//draw all Selected	
						this.drawAllSelected();		
					}
	};

	this.getSelectCondition = function(){
		if(this.allSelected === true){
			return '';
		}else{
		//	return this.id+'='+this.child[this.selectedIndex1].child[this.selectedIndex2];
			//return this.id+'='+this.selectedIndex1+'_'+this.selectedIndex2;
			return "\""+this.id+"\":\""+this.selectedIndex1+'_'+this.selectedIndex2+"\"";
		}
	};

	this.splitToFilter = function(drip){
		if(drip.info.split === this.id){
			if(this.SplitSelector !== this.id){
				return ;
			}else{
				this.allSelected = false;
				this.__proto__.SplitSelector = undefined;
			}
			var category=drip.info.type.split('-');
			for(var i=0; i<this.child.length; i++){
				if(this.child[i].name === category[0]){
					this.selectedIndex1 = i;
					var chd=this.child[i].child;
					for(var j=0; j<chd.length; j++){
						if(chd[j] === category[1]){
							this.selectedIndex2 =j;
						}
					}
					break;
				}
			}
		}
	};

	//	[{name: '服装', child: ['女装','男装']},{name: '玩具', child: ['small','big']},{name: '电子产品', child: ['高档','低档']}],//[child1,child2]		


	this.setFilter = function(showCondition){
		if(typeof(showCondition.split) === 'undefined'){
			this.__proto__.SplitSelector = undefined; 
		}else if(showCondition.split === this.id){
			this.__proto__.SplitSelector = this.id; 
		}
		if(typeof(showCondition.filter) !== 'undefined' && typeof(showCondition.filter[this.id]) !== 'undefined'){
			var idxs=showCondition.filter[this.id].split('_');
			this.selectedIndex1 = parseInt(idxs[0],10);
			this.selectedIndex2 = parseInt(idxs[1],10);
			this.allSelected = false;
		}else{
			this.allSelected = true;
		}
	};

}
TreeSelectorPannel.prototype = SelectorPrototype;





//buttons
var ButtonPrototype ={
	underMouse : function(mouse){
				 },
	mouseOverActor : function(){
				this.mouseOverCallBack();
					 },
	mouseOverCallBack : function(){
						},
	clickActor : function(){
				this.clickCallBack();
				 },
	clickCallBack : function(){

					},
	enabledDraw : function(){
				  },
	unableDraw : function(){
				 },		
	draw : function(){
			   if(this.state === 'enabled'){
					this.enabledDraw();
			   }else{
					this.unableDraw();
			   }
		   },

}

	
function RectangleButton(config){
	this.id=config.id;
	this.canvas=config.canvas;
	this.ctx=this.canvas.getContext("2d");
	this.x=config.x;
	this.y=config.y;
	this.width=config.width;
	this.height=config.height;
	this.state=config.state;
	this.underMouse = function(mouse){
		if(mouse.x<this.x || mouse.x> this.x+this.width-1 
				|| mouse.y <this.y || mouse.y> this.y+this.height -1){
			return false;
		}else{
			return true;
		}
	}
	this.enabledDraw = function(){
		var c=this.ctx;
		c.fillStyle='#faa';
		c.fillRect(this.x,this.y,this.width,this.height);
		c.fillStyle='#aaf';
		c.font = ''+ 10 +'px 微软雅黑';
		c.textBaseline = 'top';
		c.fillText(this.id, this.x,this.y);
	
	}
}
RectangleButton.prototype = ButtonPrototype;

function CircleButton(config){
	this.id=config.id;
	this.canvas=config.canvas;
	this.ctx=this.canvas.getContext("2d");
	this.x=config.x;
	this.y=config.y;
	this.r=config.r;
	this.state=config.state;
	this.underMouse = function(mouse){
		if(Math.pow(mouse.x-this.x,2)+Math.pow(mouse.y-this.y,2)>Math.pow(this.r,2)){
			return false;
		}else{
			return true;
		}
	}
	this.enabledDraw = function(){
		var c=this.ctx;
		c.fillStyle='#afa';
		c.beginPath();
		//c.strokeStyle = "red"; //need list of available colors
		//c.lineWidth = 1;
		c.arc(this.x, this.y, this.r, (Math.PI/180)*0, (Math.PI/180)*360, false);
		c.fill();
		c.fillStyle='#aaf';
		c.font = ''+ 10 +'px 微软雅黑';
		c.textBaseline = 'bottom';
		c.fillText(this.id, this.x,this.y);
		c.closePath();
	}
}
CircleButton.prototype = ButtonPrototype;


