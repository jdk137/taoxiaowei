function Drip(config){
	//this.theCanvas=config.theCanvas;
	//this.ctx=config.ctx;
	this.r=config.r;
	this.x=config.x;
	this.y=config.y;
	//this.name=config.name;
	this.info=config.info;
	//this.id=config.id;
	this.color=config.color || this.getNewColor();
	this.vx=config.vx || Math.random()*this.r/40-this.r/80;
	this.vy=config.vy || Math.random()*this.r/40-this.r/80;
	this.numP=config.numP || 36;
	this.theta=config.theta || 2*Math.PI/this.numP;
	this.repulsionParam=config.repulsionParam || Math.pow(this.r,10)*Math.pow(this.theta,2)*2*Math.cos((Math.PI-this.theta)/2);
	this.forceParam=config.forceParam || 0.008;
	this.pXInitRatio=config.pXInitRatio || 1;
	this.pYInitRatio=config.pYInitRatio || 1;
	
	this.child= config.child || [];
	this.element = config.element || [];

	this.points=[];
	this.stage=config.stage; // 1,2,3,4

	this.setPoints();
}	

Drip.prototype ={
	theCanvas : undefined,
	ctx : undefined,
	backgroundCanvas : undefined,
	backgroundCtx : undefined,
	friction_factor : 0.98,
	childDripUnderMouse : undefined,

	colorList : [],
	color2Drip :{},
	ALPHA : 0.9,

	elementR : undefined,
	elementUnderMouse : undefined,
	elementSelected : undefined,

	setCanvas : function(theCanvas){
			this.__proto__.theCanvas=theCanvas;
			this.__proto__.ctx=theCanvas.getContext("2d");
			this.__proto__.backgroundCanvas=document.createElement("canvas");
			this.__proto__.backgroundCtx=this.__proto__.backgroundCanvas.getContext("2d");
			this.__proto__.backgroundCanvas.width=theCanvas.width;
			this.__proto__.backgroundCanvas.height=theCanvas.height;
		},
	changeCanvas : function(tempCanvas){
			this.__proto__.theCanvas=tempCanvas;
			this.__proto__.ctx=tempCanvas.getContext("2d");
		},
	setElementR : function(r){
			this.__proto__.elementR=r;
		},

	/*
	setCtx: function(ctx){
			this.__proto__.ctx=ctx;
		},
	*/

	setElements : function(els, blink){
		if(this.child.length !== 0){
			return;
		}
		var angles=[];
		var rs=[];
		var xs=[];
		var ys=[];
		for(var i=0; i<els.length; i++){
			var r,angle,x,y,mostCount=20,count=0;
			var dis=3*this.elementR;
			do{
				r=Math.random()*(this.r-2*this.elementR);
				angle=2*Math.PI*Math.random();
				x=r*Math.cos(angle);
				y=r*Math.sin(angle);
				count++;
				if(count > mostCount){
					dis-=this.elementR;
					count=0;
				}
			}while(elementCollide(x,y,dis) );
			this.element[this.element.length]=new Element({
					prnt : this,
					theta : angle,
					ratio : r/this.r,
					r : r,
					x : x,
					y : y,
					group : els,
					idx : i,
					//info : els[i],
					stage : this.stage,
					blink : blink,
			});
			xs[xs.length]=x;
			ys[ys.length]=y;
		}

		function elementCollide(x,y,dis){
			for(var i=0; i<xs.length;i++){
				if(Math.pow(x-xs[i],2)+Math.pow(y-ys[i],2) < Math.pow(dis,2)){
					return true;
				}
			}
			return false;
		}

	},

	setPoints : function(){
		this.points=[];
		for(var j=0; j<this.numP; j++){
			var angle=j*this.theta;
			this.points[j]={
			x : this.x+this.r*this.pXInitRatio*Math.cos(angle),
			y : this.y+this.r*this.pYInitRatio*Math.sin(angle),
			vx : 0,
			vy : 0
			};
		}
	},
	refreshShape : function(){
		this.repulsionParam=Math.pow(this.r,10)*Math.pow(this.theta,2)*2*Math.cos((Math.PI-this.theta)/2);
		this.setPoints();
	},
	d2pRepulsion : function(){
		var drip=this;
		for(var i=0; i<drip.numP; i++){
			var p=drip.points[i];
			var f=this.forceParam*drip.repulsionParam*1/Math.pow((Math.pow(drip.x-p.x,2)+Math.pow(drip.y-p.y,2)),4); // r pow 8
			var angle=Math.atan2(p.y-drip.y, p.x-drip.x);
			var ax=f*Math.cos(angle);
			var ay=f*Math.sin(angle);

			p.vx+=ax;
			p.vy+=ay;
			drip.vx-=ax/drip.numP;
			drip.vy-=ay/drip.numP;
			//p.x+=p.vx;
			//p.y+=p.vy;
		}
	},

	p2pGravitation : function(){
		var drip=this;
		var len=drip.numP;
		for(var i=0; i<len; i++){
			var p=drip.points[i];
			var pb;
			if(i==len-1){
				pb=drip.points[0];
			}else{
				pb=drip.points[i+1];
			}
			var f=this.forceParam*(Math.pow(pb.x-p.x,2)+Math.pow(pb.y-p.y,2));
			var angle=Math.atan2(pb.y-p.y,pb.x-p.x);
			var ax=f*Math.cos(angle);
			var bx=f*Math.sin(angle);
			p.vx+=f*Math.cos(angle);
			p.vy+=f*Math.sin(angle);		
			pb.vx-=f*Math.cos(angle);
			pb.vy-=f*Math.sin(angle);
		}
	},

	shake : function(){
		var drip=this;
		var len=drip.numP;
		for(var i=0; i<len; i++){
			var p=drip.points[i];
			var pb;
			p.x=0.95*(p.x-drip.x)+drip.x;
			p.y=0.95*(p.y-drip.y)+drip.y;
			p.vx*=0.6;
			p.vy*=0.6;
		}
	},
	pLoc : function(){
		var drip = this;
		for(var i=0; i<drip.numP; i++){
			var p=drip.points[i];
			
			//adjust v
			var v=Math.sqrt(Math.pow(p.vx,2)+Math.pow(p.vy,2));
			if(v>drip.r/4){
				p.vx=drip.r/4/v*p.vx;
				p.vy=drip.r/4/v*p.vy;
			}
			
			//adjust loc
			var deltapx=p.x+p.vx-drip.x;
			var deltapy=p.y+p.vy-drip.y;
			var dis=Math.sqrt(Math.pow(deltapx,2)+Math.pow(deltapy,2));
			if(dis<drip.r/2){
				deltapx=dis/(drip.r/2)*deltapx;
				deltapy=dis/(drip.r/2)*deltapy;
			}else if(dis>drip.r*2){
				deltapx=drip.r/2/dis*deltapx;
				deltapy=drip.r/2/dis*deltapy;
			}
			p.x=drip.x+deltapx;
			p.y=drip.y+deltapy;


			//bounds
			/*
			if(p.x<0){p.x=0;p.vx=0;}
			if(p.x>drip.theCanvas.width){p.x=drip.theCanvas.width;p.vx=0;}
			if(p.y<0){p.y=0;p.vy=0;}
			if(p.y>drip.theCanvas.height){p.y=drip.theCanvas.height;p.vy=0;}
			*/
			p.vx*=drip.friction_factor;
			p.vy*=drip.friction_factor;
			
		}
	},


	bigDripCollide : function(drip){
		// test collide
		// if collide find adjust line
		// adjust drip
		// adjust bigDripCollide
		var d1=this;
		var d2=drip;
		
		if((d1.r-Math.sqrt(Math.pow(d1.x-d2.x,2)+Math.pow(d1.y-d2.y,2)))>d2.r*1.5){
			//not collide
			return;
		}
		var testP1={};
		var maxRat1=0;
		var testP2s=[];
		var maxRat2=0;

		var A=Math.atan2(d2.y-d1.y,d2.x-d1.x);
		if(A<0){A+=Math.PI*2;}

		var center1=Math.floor(A/(Math.PI*2/d1.numP));		
		var center2=Math.floor(A/(Math.PI*2/d2.numP));		
		
		// the most possible closed points are close enough, so test all points on the half circle;
		for(var i=center1-Math.floor(d1.numP/2); i<center1+Math.floor(d1.numP/2); i++){
			var j=i;
			if(j<0){j+=d1.numP;}
			if(j>=d1.numP){j-=d1.numP;}
			var px=d1.points[j].x;
			var py=d1.points[j].y;	

			var rat=d1.getRatio(d1,d2,d1.points[j]);
			if(rat<0 || typeof(rat)=='undefined') {continue;}

			if(rat>maxRat1){
				maxRat1=rat;
				testP1={
					index : j,
					x : px,
					y : py,
					ratio : rat
				}
			}
		}

		for(var i=center2-Math.floor(d2.numP/2); i<center2+Math.floor(d2.numP/2); i++){
			var j=i;
			if(j<0){j+=d2.numP;}
			if(j>=d2.numP){j-=d2.numP;}
			var px=d2.points[j].x;
			var py=d2.points[j].y;
			
			var rat=d1.getRatio(d1,d2,d2.points[j]);
			if(rat<0 || typeof(rat)=='undefined') {continue;}

			if(rat>maxRat2){maxRat2=rat;}
			testP2s[testP2s.length]={
				index : j,
				x : px,
				y : py,
				ratio : rat 
			}
		}
		
		if(maxRat1>=maxRat2){
			return;
		}

		//two drip get together, depart them to make them not be inside each other
		var centerRatio=maxRat1+(d2.r/(d2.r+d1.r))*(maxRat2-maxRat1);
		//var centerRatio=maxRat1;
		var p=testP1;
		var centerIndex=p.index;
		var amplitude=Math.floor(Math.PI/2*d2.r/d1.r/d1.theta); 		
		var deltaRatio=centerRatio-p.ratio;
 		var deltax=deltaRatio*(d2.x-d1.x);
 		var deltay=deltaRatio*(d2.y-d1.y);

		for(var i=-amplitude; i<amplitude; i++){
			var j=i+centerIndex;
			if(j<0){j+=d1.numP;}
			if(j>=d1.numP){j-=d1.numP;}
			var d1p=d1.points[j];
			d1p.x+=deltax/2*Math.sqrt((amplitude-Math.abs(i))/amplitude);
			d1p.y+=deltay/2*Math.sqrt((amplitude-Math.abs(i))/amplitude);
			d1p.vx*=1-Math.sqrt((amplitude-Math.abs(i))/amplitude);
			d1p.vy*=1-Math.sqrt((amplitude-Math.abs(i))/amplitude);
		}
 	/*	
 		var p=testP1;
 		var deltaRatio=centerRatio-p.ratio;
 		var deltax=deltaRatio*(d2.x-d1.x);
 		var deltay=deltaRatio*(d2.y-d1.y);
 		var d1p= d1.points[p.index];
 		d1p.x+=deltax/2;
 		d1p.y+=deltay/2;
 		//d2.vx-=d1p.vx/d1.numP;
 		//d1.vy-=d1p.vy/d1.numP;
 		d1p.vx=0;
 		d1p.vy=0;		
 		
 		//front point
 		var indexf=p.index-1;
 		if(indexf<0){indexf+=d1.numP;}
		d1pf=d1.points[indexf];
		d1pf.x+=deltax/4;
		d1pf.y+=deltay/4;
		d1pf.vx=0;
		d1pf.vy=0;

		//back point
		var indexb=p.index+1;
		if(indexb>d1.numP-1){indexb-=d1.numP;}
		d1pb=d1.points[indexb];
		d1pb.x+=deltax/4;
		d1pb.y+=deltay/4;
		d1pb.vx=0;
		d1pb.vy=0;
*/

		//small drip
		
	//	if(d2.info.percentage > 0.5){
			for(var i=0; i<testP2s.length; i++){
				var p=testP2s[i];
				if(p.ratio<=centerRatio){
					continue;
				}else{
					var deltaRatio=p.ratio-centerRatio;
					var deltax=deltaRatio*(d2.x-d1.x);
					var deltay=deltaRatio*(d2.y-d1.y);
					var d2p= d2.points[p.index];
					d2p.x-=deltax;
					d2p.y-=deltay;
					//d2.vx-=d2p.vx/d2.numP;
					//d2.vy-=d2p.vy/d2.numP;
					d2p.vx=0;
					d2p.vy=0;
				}
			}
	//	}else{
			
	//	}
	},

	getRatio : function(p1,p2,p3){				
		//p1's foot p4 on p2-p3, reutrn p1->p4/p1->p2 
		var x1=p1.x,
			y1=p1.y,
			x2=p2.x,
			y2=p2.y,
			x3=p3.x,
			y3=p3.y;
		if(x1 == x2 &&  y1==y2){
			return undefined;
		}
		if(Math.abs(x1-x2)>Math.abs(y1-y2)){
			var x4=(-1*(y1-y2)*(y1-y3)*(x1-x2)+x3*(x1-x2)*(x1-x2)+x1*(y1-y2)*(y1-y2))/((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
			var rat=(x4-x1)/(x2-x1);
		}else{
			var y4=(-1*(x1-x2)*(x1-x3)*(y1-y2)+y3*(y1-y2)*(y1-y2)+y1*(x1-x2)*(x1-x2))/((y1-y2)*(y1-y2)+(x1-x2)*(x1-x2));
			var rat=(y4-y1)/(y2-y1);
		}
		return rat;
	},


	dripCollide :function(d2){
		d1=this;
		if(Math.pow(d1.x-d2.x,2)+Math.pow(d1.y-d2.y,2)>Math.pow(d1.r+d2.r,2)*1.5){
			//not collide
			return;
		}
		var testP1s=[];
		var maxRat1=0;
		var testP2s=[];
		var minRat2=1;

		var A1=Math.atan2(d2.y-d1.y,d2.x-d1.x);
		var A2=Math.PI+A1;
		if(A1<0){A1+=Math.PI*2;}

		var center1=Math.floor(A1/(Math.PI*2/d1.numP));
		var center2=Math.floor(A2/(Math.PI*2/d2.numP));
		
		
		// the most possible closed points are close enough, so test all points on the half circle;
		for(var i=center1-Math.floor(d1.numP/2); i<center1+Math.floor(d1.numP/2); i++){
			var j=i;
			if(j<0){j+=d1.numP;}
			if(j>=d1.numP){j-=d1.numP;}
			var px=d1.points[j].x;
			var py=d1.points[j].y;	

		//	d1.x=2,d1.y=0,d2.x=3,d2.y=1,px=1,py=1;
/*
			var l1=Math.sqrt(Math.pow(px-d1.x,2)+Math.pow(py-d1.y,2));
			var l2=Math.sqrt(Math.pow(px-d2.x,2)+Math.pow(py-d2.y,2));
			var temprat=l1/(l1+l2);
*/			
			var rat=d1.getRatio(d1,d2,d1.points[j]);
			if(rat<0 || typeof(rat)=='undefined') {continue;}
			if(rat>maxRat1){maxRat1=rat;}
			testP1s[testP1s.length]={
				index : j,
				x : px,
				y : py,
				ratio : rat 
			}
		}

		for(var i=center2-Math.floor(d2.numP/2); i<center2+Math.floor(d2.numP/2); i++){
			var j=i;
			if(j<0){j+=d2.numP;}
			if(j>=d2.numP){j-=d2.numP;}
			var px=d2.points[j].x;
			var py=d2.points[j].y;
			
			var rat= d1.getRatio(d1,d2,d2.points[j]);
			if(rat<0 || typeof(rat)==='undefined') {continue;}
			if(rat<minRat2){minRat2=rat;}
			testP2s[testP2s.length]={
				index : j,
				x : px,
				y : py,
				ratio : rat 
			}
		}
		
		if(maxRat1<=minRat2){
			return;
		}

		//two drip get together, depart them to make them not be inside each other
		var centerRatio=minRat2+(d2.r/(d2.r+d1.r))*(maxRat1-minRat2);

		for(var i=0; i<testP1s.length; i++){
			var p=testP1s[i];
			if(p.ratio<centerRatio){
				continue;
			}else{
				var deltaRatio=p.ratio-centerRatio;
				var deltax=deltaRatio*(d1.x-d2.x);
				var deltay=deltaRatio*(d1.y-d2.y);
				var d1p= d1.points[p.index];
				d1p.x+=deltax;
				d1p.y+=deltay;
				//d2.vx-=d1p.vx/d1.numP;
				//d1.vy-=d1p.vy/d1.numP;
				d1p.vx=0;
				d1p.vy=0;
			}
		}

		for(var i=0; i<testP2s.length; i++){
			var p=testP2s[i];
			if(p.ratio>centerRatio){
				continue;
			}else{
				var deltaRatio=centerRatio-p.ratio;
				var deltax=deltaRatio*(d2.x-d1.x);
				var deltay=deltaRatio*(d2.y-d1.y);
				var d2p= d2.points[p.index];
				d2p.x+=deltax;
				d2p.y+=deltay;
				//d2.vx-=d2p.vx/d2.numP;
				//d2.vy-=d2p.vy/d2.numP;
				d2p.vx=0;
				d2p.vy=0;
			}
		}

	},			   
/*	
	mouse2pRepulsion : function(mouse){
		var drip=this;
		if(Math.pow(drip.x-mouse.x,2)+Math.pow(drip.y-mouse.y,2)>Math.pow(drip.r+mouse.R,2)*1.5){
			//not collide
			return;
		}
		var testP1s=[];
		var maxRat1=0;
		var minRat2=0;
		
		var a=Math.atan2(mouse.y-drip.y,mouse.x-drip.x);
		var A1=a;
		if(A1<0){A1+=Math.PI*2;}

		var center1=Math.floor(A1/(Math.PI*2/drip.numP));
		var mouseP={x:mouse.x,y:mouse.y};
		
		// the most possible closed points are close enough, so test all points on the half circle;
		for(var i=center1-Math.floor(drip.numP/2); i<center1+Math.floor(drip.numP/2); i++){
			var j=i;
			if(j<0){j+=drip.numP;}
			if(j>=drip.numP){j-=drip.numP;}
			var px=drip.points[j].x;
			var py=drip.points[j].y;
			
			var rat= drip.getRatio(drip,mouseP,drip.points[j]);
			if(rat<0 || typeof(rat)==='undefined') {continue;}

			if(rat>maxRat1){maxRat1=rat;}
			testP1s[testP1s.length]={
				index : j,
				x : px,
				y : py,
				ratio : rat 
			}
		}
		var dis=Math.sqrt(Math.pow(drip.x-mouse.x,2)+Math.pow(drip.y-mouse.y,2));
		var minRat2=(dis-mouse.R)/dis;
		
		if(minRat2>maxRat1){
			return;
		}

		//two drip get together, depart them to make them not be inside each other
		var centerRatio=minRat2+(mouse.R/(mouse.R+drip.r))*(maxRat1-minRat2);

		for(var i=0; i<testP1s.length; i++){
			var p=testP1s[i];
			if(p.ratio<centerRatio){
				continue;
			}else{
				var deltaRatio=p.ratio-centerRatio;
				var deltax=deltaRatio*(drip.x-mouse.x);
				var deltay=deltaRatio*(drip.y-mouse.y);
				var d1p= drip.points[p.index];
				d1p.x+=deltax;
				d1p.y+=deltay;
				drip.vx-=d1p.vx/drip.numP;
				drip.vy-=d1p.vy/drip.numP;
				d1p.vx=0;
				d1p.vy=0;
			}
		}
	},
*/
	mouseMoveActor : function(mouse){
		this.detectDripShake(mouse);
		var data=this.backgroundCtx.getImageData(mouse.x, mouse.y, 1, 1).data;
		var alpha=data[3];
		var dripColor=data[0]*65025+data[1]*255+data[2];
	
		if(typeof(this.elementUnderMouse) !== 'undefined'){
			this.cancelElementUnderMouse();	
		}

		this.searchElementUnderMouse(mouse);

		if(Math.abs(alpha - 255*(1-(1-this.ALPHA)*(1-this.ALPHA)))<1){	
			//chrome floor, FireFox ceil
			var d=this.color2Drip[dripColor];
			if(typeof(d) !== 'undefined'){
				d.searchElementUnderMouse(mouse);
			}
		}
	},

	searchElementUnderMouse : function(mouse){
			var eLen=this.element.length;
			for(var i=0;  i<eLen; i++){
				var el=this.element[i];
				if(Math.sqrt(Math.pow(el.x-mouse.x,2)+Math.pow(el.y-mouse.y,2))<this.elementR*2){
					this.setElementUnderMouse(el);
					//document.body.style.dripCursor = 'pointer';
					break;
				}
			}
	},
	
	setElementUnderMouse : function(el){
		/*
		if(typeof(this.elementUnderMouse) !== 'undefined'){
			this.__proto__.elementUnderMouse.isUnderMouse = false;
		}
		*/
		this.__proto__.elementUnderMouse = el;
		el.isUnderMouse=true;
	},

	cancelElementUnderMouse : function(){
		this.__proto__.elementUnderMouse.isUnderMouse = false;
		this.__proto__.elementUnderMouse = undefined;
	},

	mouseClickActor : function(mouse){

		//click a weibo or person;
		if(typeof(this.elementUnderMouse) !== 'undefined'){
			this.setElementSelected(this.elementUnderMouse);
			return undefined;
		}

		//amplify
		var data=this.backgroundCtx.getImageData(mouse.x, mouse.y, 1, 1).data;
		var alpha=data[3];
		var dripColor=data[0]*65025+data[1]*255+data[2];
		if(Math.abs(alpha - 255*(1-(1-this.ALPHA)*(1-this.ALPHA)))<1){			
			//chrome floor, FireFox ceil
			var d=this.color2Drip[dripColor];
			if(typeof(d) !== 'undefined'){
				if(typeof(this.elementUnderMouse) !== 'undefined'){
					this.cancelElementUnderMouse();
				}
				if(typeof(this.elementSelected) !== 'undefined'){
					this.cancelElementSelected();
				}
				return d;
			}
		}
		return undefined;
	},

	cancelElementSelected : function(){
		this.__proto__.elementSelected.isSelected = false;
		this.__proto__.elementSelected = undefined;
	},

	setElementSelected : function(el){
			if(el.isSelected === true){
				this.__proto__.elementSelected.isSelected = false;
				var floatBox =document.getElementById('floatBox');
				floatBox.style.visibility='hidden';
				return;
			}
			if(typeof(this.__proto__.elementSelected) !== 'undefined'){
				this.__proto__.elementSelected.isSelected = false; 
			}
			this.__proto__.elementSelected=el;
			el.isSelected = true;
			this.selectedElementDisplay(el);
		},
	
	selectedElementDisplay : function(el){
			var floatBox =document.getElementById('floatBox');
			//var words='重温这句话，感触深，这个山寨手机帅呆了。';
			//var words=el.info.content;
			var words=el.group[el.idx].content;
			
			var floatWord =document.getElementById('floatWord');
			floatWord.innerHTML=words;
			//get topDrip
			//17 pixels every line;
			var innerWords=words.split('>')[1];
			if(typeof(innerWords) !== 'undefined'){
				innerWords=innerWords.split('<')[0];
			}else{
				innerWords=words.split('>')[0];
			}
			var h=Math.floor(this.getStringLength(innerWords)/2/19)*17+15;
			//var h=Math.floor(words.length/19)*17+15;
			floatBox.style.height=h+"px";
			var acient=this;
			while(typeof(acient.prnt) !== 'undefined'){
				acient=acient.prnt;
			}
			floatBox.style.visibility='visible';
			if(this.stage === 1){
				if(el.y<acient.y-100){
					floatBox.className="triangle-isosceles top";
					floatBox.style.left=el.x+window.screen.width/2-this.theCanvas.width/2-215+"px";
					floatBox.style.top=el.y+35-h+40+'px';
				}else{
					floatBox.className="triangle-isosceles";
					floatBox.style.left=el.x+window.screen.width/2-this.theCanvas.width/2-116+'px';
					floatBox.style.top=el.y-126+'px';
				}
			}else{
				if(el.y<acient.y-100){
					floatBox.className="triangle-isosceles2 top";
					floatBox.style.left=el.x+window.screen.width/2-this.theCanvas.width/2-215+"px";
					floatBox.style.top=el.y+35-h+40+'px';
				}else{
					floatBox.className="triangle-isosceles2";
					floatBox.style.left=el.x+window.screen.width/2-this.theCanvas.width/2-116+'px';
					floatBox.style.top=el.y-126+'px';
				}
			}
	},

	detectDripShake : function(){
		var oldDripColor = undefined;
		return function(mouse){
			var data=this.backgroundCtx.getImageData(mouse.x, mouse.y, 1, 1).data;
			var alpha=data[3];
			var dripColor=data[0]*65025+data[1]*255+data[2];
			var d=this.color2Drip[dripColor];
			if(Math.abs(alpha - 255*(1-(1-this.ALPHA)*(1-this.ALPHA)))<1){
				if(typeof(d) !== 'undefined'){
					d.setChildDripUnderMouse();
				}
			}else{
				this.cancelChildDripUnderMouse();
			}
			if (oldDripColor !== dripColor){
				oldDripColor=dripColor;
				if(Math.abs(alpha - 255*(1-(1-this.ALPHA)*(1-this.ALPHA)))<1){
					//chrome floor, FireFox ceil
					if(typeof(d) !== 'undefined'){
						d.shake();
					}
				}			
			}
		}
	}(),

	setChildDripUnderMouse : function(){
		this.__proto__.childDripUnderMouse = this;
		//document.body.style.dripCursor = 'pointer';
	},

	cancelChildDripUnderMouse : function(){
		this.__proto__.childDripUnderMouse = undefined;
	},
	
	isChildDripUnderMouse : function(){
		if(typeof(this.__proto__.childDripUnderMouse) === 'undefined'){
			return false;
		}else if(this.__proto__.childDripUnderMouse.info.type === this.info.type){
			return true;
		}else{
			return false;
		}
	},

	getNewColor : function(){
		var num = 100;
		var ind=Math.floor(Math.random()*num);
		while( typeof(this.colorList[ind]) !== 'undefined' ){
			ind+=17;
			if(ind>num-1){ind-=num;}
		}
		var hue = 360/num*ind;
		var saturation=90;
		var light = Math.floor(35*(1-Math.random())+20);
		
		var s="hsla("+hue+", "+saturation+"%, "+light+"%,"+this.ALPHA+")";//!! ALPHA is important to detect background!!
		this.colorList[ind]=s;
		return s;	
	},

	deleteColorList : function(){
		this.__proto__.colorList=[];
		delete this.__proto__.color2Drip;
		this.__proto__.color2Drip={};
	},
	
	cleanColorList : function(color){
		for(var i in this.__proto__.colorList){
			if(this.__proto__.colorList[i] !== color){
				delete this.__proto__.colorList[i];
			}
		}
	},

	draw : function(){
			this.drawDrip();
			var cLen=this.child.length;
			for(var i=0; i<cLen; i++){
				this.child[i].draw();
			}
			if(this.info.type === 'TOPDRIP'){
				this.drawText();
			}
		},	
	amplifyDraw : function(drip,percentageLast,ampProgress){
		/*
		var tempCanvas=document.createElement("canvas");
		var originCanvas = this.theCanvas;
		var h=originCanvas.height;
		var w=originCanvas.width;
		tempCanvas.width=w;
		tempCanvas.height=h;
		this.changeCanvas(tempCanvas);

		var tempc=this.ctx;

		this.amplifyDrawDrips();
		drip.amplifyDrawDrip();
		drip.drawText();
		
		this.changeCanvas(originCanvas);
		var ampRatio=1+(this.r*percentageLast/drip.r-1)*ampProgress;
		var dx=((drip.x-this.x)*ampProgress+this.x)-w/2/ampRatio;
		var dy=((drip.y-this.y)*ampProgress+this.y)-h/2/ampRatio;

		var c = this.ctx;
		c.globalAlpha=this.ALPHA*(1-ampProgress);		
		c.drawImage(tempCanvas,dx,dy,w/ampRatio,h/ampRatio,0,0,w,h);
		c.globalAlpha=this.ALPHA;
		*/

		
		var c=this.ctx;
		var ampRatio=1+(this.r*percentageLast/drip.r-1)*ampProgress;
		/*
		var dx=-1*(((drip.x-this.x)*ampProgress+this.x)*ampRatio-this.x);
		var dy=-1*(((drip.y-this.y)*ampProgress+this.y)*ampRatio-this.y);  
		*/
		var w=this.theCanvas.width;
		var h=this.theCanvas.height;
		var dx=((drip.x-this.x)*ampProgress+this.x)-w/2/ampRatio;
		var dy=((drip.y-this.y)*ampProgress+this.y)-h/2/ampRatio;
		dx*=-ampRatio;
		dy*=-ampRatio;

		c.save();
		c.setTransform(ampRatio,0,0,ampRatio,dx,dy);

		c.globalAlpha=this.ALPHA*(1-ampProgress);

		this.amplifyDrawDrips();

		c.globalAlpha=this.ALPHA;
		drip.amplifyDrawDrip();
		drip.drawText();
		c.restore();
		
	},
/*	
	safeDrawImage : function(dCanvas,source,sx,sy,sw,sh,dx,dy,dw,dh){
		var w = source.width;
		var h = source.height;
		
	},
*/
	amplifyDrawDrips : function(){
		this.amplifyDrawDrip();
		var cLen=this.child.length;
		for(var i=0; i<cLen; i++){
		//	if(this.child[i].info.type !== drip.info.type){
				this.child[i].amplifyDrawDrips();
		//	}
		}
		if(this.info.type === 'TOPDRIP'){
			this.drawText();
		}		
	},

	amplifyDrawDrip : function(){
		this.drawCircle();
		//this.drawText();
	},
	
	backgroundDrawDrip : function(){
		var drip = this;
		var c=this.backgroundCtx;
		if(this.info.type === 'TOPDRIP'){
			c.clearRect(0,0,this.backgroundCanvas.width,this.backgroundCanvas.height);
		}

		c.beginPath();
		c.moveTo((drip.points[0].x+drip.points[1].x)/2,(drip.points[0].y+drip.points[1].y)/2);
		var len=drip.numP;
		for(var i=0; i<len; i++){
			var j=i+1;
			var k=i+2;
			if(i==len-1){
				j=0;
				k=1;
			}else if(i === len-2){
				k=0;
			}
			var x1=drip.points[i].x,
				y1=drip.points[i].y,
				x2=drip.points[j].x,
				y2=drip.points[j].y,
				x3=drip.points[k].x,
				y3=drip.points[k].y;
			x1=(x1+x2)/2;
			y1=(y1+y2)/2;
			x3=(x3+x2)/2;
			y3=(y3+y2)/2;
			c.quadraticCurveTo(x2,y2,x3,y3);		
		}

		c.closePath();
		c.lineWidth = 1;
		c.fillStyle = drip.color;//"#1ED6FF";
		c.fill();

		//record color
		var cx=Math.round(this.x);
		var cy=Math.round(this.y);
		var data=c.getImageData(cx, cy, 1, 1).data;
		var alpha=data[3];
		var dripColor=data[0]*65025+data[1]*255+data[2];
		if(alpha !== Math.round(255*this.ALPHA)){
			//alpha !=0.9;
			this.color2Drip[dripColor]=this;
		}
	},
	
	drawDrip : function(){
		this.backgroundDrawDrip();
		this.drawCircle();
		//this.drawBound();
		this.drawElement();
	//	this.drawText();
		//document.getElementById("info").innerHTML=alpha+' '+dripColor;	
	},

	drawBgCircle : function(){
		var drip=this;
		var c=this.ctx;
		c.beginPath();
		c.moveTo((drip.points[0].x+drip.points[1].x)/2,(drip.points[0].y+drip.points[1].y)/2);
		var len=drip.numP;
		for(var i=0; i<len; i++){
			var j=i+1;
			var k=i+2;
			if(i==len-1){
				j=0;
				k=1;
			}else if(i === len-2){
				k=0;
			}
			var x1=drip.points[i].x,
				y1=drip.points[i].y,
				x2=drip.points[j].x,
				y2=drip.points[j].y,
				x3=drip.points[k].x,
				y3=drip.points[k].y;
			x1=(x1+x2)/2;
			y1=(y1+y2)/2;
			x3=(x3+x2)/2;
			y3=(y3+y2)/2;
			c.quadraticCurveTo(x2,y2,x3,y3);		
		}

		c.closePath();
		c.lineWidth = 1;
		c.fillStyle = drip.color;//"#1ED6FF";
		c.fill();
		//c.strokeStyle = "#0077FF";
		//c.stroke();
	},

	drawCircle : function(){
		var drip=this;
		var c=this.ctx;
		c.beginPath();
		c.moveTo((drip.points[0].x+drip.points[1].x)/2,(drip.points[0].y+drip.points[1].y)/2);
		var len=drip.numP;
		for(var i=0; i<len; i++){
			var j=i+1;
			var k=i+2;
			if(i==len-1){
				j=0;
				k=1;
			}else if(i === len-2){
				k=0;
			}
			var x1=drip.points[i].x,
				y1=drip.points[i].y,
				x2=drip.points[j].x,
				y2=drip.points[j].y,
				x3=drip.points[k].x,
				y3=drip.points[k].y;
			x1=(x1+x2)/2;
			y1=(y1+y2)/2;
			x3=(x3+x2)/2;
			y3=(y3+y2)/2;
			c.quadraticCurveTo(x2,y2,x3,y3);		
		}

		c.closePath();
		c.lineWidth = 1;
		if(this.stage === 1){
			if(this.info.type === 'TOPDRIP' ){
				c.fillStyle = '#f3ecf4';
			}else{
				c.fillStyle = '#cbdef4';
			}
		}else{
			if(this.info.type === 'TOPDRIP' ){
				c.fillStyle = '#aadce0';
			}else{
				c.fillStyle = '#c5f9f8';
			}
		}
		//c.fillStyle = "#aae6e2";
		c.fill();
	//	c.strokeStyle = "#ffffff";
	//	c.stroke();
	},

	drawBound : function(){
		var c=this.ctx;
		c.beginPath();
		c.strokeStyle = "blue"; //need list of available colors
		c.lineWidth = 1;
		c.arc(this.x, this.y, this.r, (Math.PI/180)*0, (Math.PI/180)*360, false);
		c.stroke();
		c.closePath();
	},

	drawElement : function(){
		if(typeof(this.element) !== 'undefined'){
			for(var i=0; i<this.element.length; i++){
				this.element[i].draw();
			}
		}
	},

	getStringLength : function(str) {
			///<summary>获得字符串实际长度，中文2，英文1</summary>
			///<param name="str">要获得长度的字符串</param>
			var realLength = 0, len = str.length, charCode = -1;
			for (var i = 0; i < len; i++) {
				charCode = str.charCodeAt(i);
				if (charCode >= 0 && charCode <= 128) realLength += 1;
				else realLength += 2;
			}
			return realLength;
	},


	drawText : function(){
		var c=this.ctx;
		var fontHeight=Math.floor(this.r/5);
		if(fontHeight<10){
			fontHeight=10;
		}
	// 1e7faf 786787 544b66	
		c.textAlign = 'center';
		if(this.info.type === 'TOPDRIP' ){
			if( this.child.length === 0 ){
				c.fillStyle = '#786787';
				c.font = ''+ fontHeight +'px 微软雅黑';
				c.textBaseline = 'bottom';
				var fontLeftAdjust=Math.floor(fontHeight*this.getStringLength(this.info.type)/4);
				var info=this.info.count;
				if(this.stage === 1){
					info+='条微博';
				}else{
					info+='人';
				}
				c.fillText(info, this.x,this.y);
			}
		}else{
			if(this.info.percentage>0.005 || this.isChildDripUnderMouse()){
				c.fillStyle = '#1e7faf';
				c.font = ''+ fontHeight +'px 微软雅黑';
				c.textBaseline = 'bottom';
				var fontLeftAdjust=Math.floor(fontHeight*this.getStringLength(this.info.type)/4);
				c.fillText(this.info.type, this.x, this.y-fontHeight);

				var p=Math.round(this.info.percentage*1000);
				if(p<1){p=1;}
				var stringP=p/10+'%';
				c.fillStyle = '#544b66';
				c.font = ''+ 2*fontHeight +'px 微软雅黑';
				c.fillText(stringP, this.x, this.y+fontHeight);

				var info=this.info.count;
				if(this.stage === 1){
					info+='条微博';
				}else{
					info+='人';
				}
				c.fillStyle = '#786787';
				c.font = ''+ fontHeight +'px 微软雅黑';
				c.fillText(info, this.x,this.y+2*fontHeight);

			}
		}
		c.textAlign='left';


		//draw child's text
		var cLen=this.child.length;
		for(var i=0; i<cLen; i++){
			this.child[i].drawText();
		}


	},


	childToParent : function(drip,percentageLast){
			this.color=drip.color;
			this.info.count=drip.info.count;
			this.vx=0;
			this.vy=0;
			this.pXInitRatio=percentageLast;
			this.pYInitRatio=percentageLast;
			this.refreshShape();
			delete this.child;
			this.child=[];
			this.element =drip.element;
			this.cleanColorList(this.color);
			for(var i=0; i<this.element.length; i++){
				this.element[i].prnt=this;
			}
			//keep and save	
			//clean color
			//copy Drip();
			},

	createChild : function(config){				
				//config.r config.name
				//create drips in big drip
				var temp=config;
				do{
					var angle=2*Math.PI*Math.random(),
						dis=Math.random()*(this.r-temp.r);
					temp.x=Math.floor(dis*Math.cos(angle)+this.x);
					temp.y=Math.floor(dis*Math.sin(angle)+this.y);
				}while(this.collide(temp));
				//var r=temp.r;
				//temp.vx=Math.random()*r/40-r/80;
				//temp.vy=Math.random()*r/40-r/80;
				temp.numP=36;
				//temp.forceParam=forceParam;
				temp.pXInitRatio=0.9;
				temp.pYInitRatio=0.9;
				var child=new Drip(temp);
				this.child[this.child.length]=child;
			   },

	collide : function(temp){
			var drip=temp;
			for(var i=0; i<this.child.length;i++){
				if(this.testBallCollide(drip,this.child[i])){
					return true;
				}
			}
			return false;
		},

	testBallCollide : function(b1,b2){
			if(Math.pow(b1.x-b2.x,2)+Math.pow(b1.y-b2.y,2)>=Math.pow(b1.r+b2.r,2)){//warning -10
				return false;
			}else{
				return true;
			}
		},

	addChild : function(drip){
			this.child[this.child.length]=drip;
			},

	update : function(){
			this.d2pRepulsion();
			this.p2pGravitation();
			this.pLoc();

			//points' velocity	
			var cLen=this.child.length;
			for(var i=0; i<cLen; i++){
				var drip=this.child[i];
				//drip.mouse2pRepulsion(mouse);
				drip.update();
				for(var j=0; j<i; j++){
					drip.dripCollide(this.child[j]);
				}
				this.bigDripCollide(drip);
			}
			
			//drip's velocity and location
			for(var i=0; i<cLen; i++){
				drip=this.child[i];
				drip.vx+=(Math.random()-0.5)*drip.r/1000;
				drip.vy+=(Math.random()-0.5)*drip.r/1000;
				drip.x+=drip.vx;
				drip.y+=drip.vy;
			}
		},

	refresh : function(){
		this.deleteColorList();
		delete this;
		},

}
		
function Element(config){
	this.prnt=config.prnt;
	this.theta=config.theta;
	this.x = config.x;
	this.y = config.y;
	this.r = config.r;
	this.ratio=config.ratio;
	//this.info=config.info;
	this.group=config.group;
	this.idx=config.idx;

	this.stage=config.stage;
	this.isUnderMouse = false;
	this.isSelected = false;
	this.blink = config.blink;
	this.alpha = 1;
	if(config.blink){
		this.alphaV = -(Math.random()*0.02+0.01); 
	}else{
		this.alphaV = 0;
	}
}

Element.prototype ={
	draw : function(){
			   	this.refreshPosition();
				this.refreshAlpha();
				var r=this.prnt.elementR;
				if(this.isUnderMouse){
					this.alpha=1;
					r*=2;
				}
				if(this.isSelected){
					this.alpha=1;
				}
			  	var c=this.prnt.ctx;
				c.save();
				c.globalAlpha=this.alpha;
			  	c.beginPath();
				c.arc(this.x, this.y, r, (Math.PI/180)*0, (Math.PI/180)*360, false);
				c.closePath();
				if(this.stage === 1){
					c.fillStyle = "#90c5dd";
				}else{
					c.fillStyle = "#ffcccc";
				}
				if(this.isSelected){
					c.fillStyle ='red';
				}
				c.fill();
				c.restore();
		   },
	refreshAlpha: function(){
				this.alpha += this.alphaV;
				if(this.alpha<0){
					this.alpha=0;
					this.alphaV *= -1;
					this.idx=Math.floor(Math.random() * this.group.length);
				}else if(this.alpha>1){
					this.alpha=1;
					this.alphaV *= -1;
				}
			},
	refreshPosition : function(){
			   	var prntP=this.prnt.points[Math.floor(this.theta/(Math.PI*2/this.prnt.numP))];
			   	this.r=this.getPointsDis(prntP,this.prnt)*this.ratio;
				this.x=this.prnt.x+this.r*Math.cos(this.theta);
				this.y=this.prnt.y+this.r*Math.sin(this.theta);
			},
	getPointsDis : function(p1, p2){
				return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
			},
	
}


