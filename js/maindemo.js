var Snake=new Array();
var canvas,ctxt,count=20,W,H,bianchang,food,curDir,fps=150,gameover=0,press=0,kaishi;
var dx=[0,-1,1,0,0];
var dy=[0,0,0,-1,1];
window.onload=function(){
	canvas=document.getElementById("canvas");
	ctxt=canvas.getContext('2d');
	W=canvas.width=window.innerHeight-20;
	H=canvas.height=window.innerHeight-20;
	bianchang=H/count;
	init();
	window.addEventListener("keydown",function(e){
		var keyID=e.which||e.keyCode;
		if(press==0) return ;
		if(keyID==65||keyID==37){//left   1
			if(curDir==2||curDir==1) return ;
			haha(1);
			curDir=1;
		}
		else if(keyID==68||keyID==39){//right  2
			if(curDir==1||curDir==2) return ;
			haha(2);
			curDir=2;
		}
		else if(keyID==87||keyID==38){//up  3
			if(curDir==3||curDir==4) return ;
			haha(3);
			curDir=3;
		}
		else if(keyID==83||keyID==40){//down   4
			if(curDir==3||curDir==4) return ;
			haha(4);
			curDir=4;
		}
		press=0;
	},false);
	kaishi=setInterval("donghua();",fps);
}
function haha(dir){
	var head=Snake[0];
	if(head.x+dx[dir]>=0&&head.x+dx[dir]<count&&head.y+dy[dir]>=0&&head.y+dy[dir]<count){
		if(findSnakeBody(head.x+dx[dir],head.y+dy[dir])){
			gameover=1;
			alert("Game over！You get "+Snake.length+" sorce!");
			return ;
		}
		else{
			Snake.unshift(new snake(head.x+dx[dir],head.y+dy[dir]));
		}
	}else{
		gameover=1;
		alert("Game over！You get "+Snake.length+" sorce!");
		return ;
	}
	if(!(head.x+dx[dir]==food.x&&head.y+dy[dir]==food.y)){
		Snake.pop();
	}else{
		food=randNewFood();
	}
}
function findSnakeBody(x,y){
	for(var i=0;i<Snake.length;i++){
		if(Snake[i].x==x&&Snake[i].y==y) return 1;
	}
	return 0;
}
function rand(n,m){
	return Math.round(Math.random()*(m-n)+n);
}
function snake(x,y,dir){
	this.x=x;this.y=y;this.dir=dir;
}
function randNewFood(){
	var x,y;
	do{
		x=rand(0,count-1);
		y=rand(0,count-1);
	}while(findSnakeBody(x,y));
	return {x:x,y:y}
}
function init(){
	var x=rand(3,count-3),y=rand(3,count-3),dir=rand(1,4);
	Snake.push(new snake(x,y,dir));
	curDir=dir;
	food=randNewFood();
}
function donghua(){
	if(press==1) haha(curDir);
	ctxt.clearRect(0,0,canvas.width,canvas.height);
	for(var i=0;i<Snake.length;i++){
		ctxt.fillStyle="rgba(142,203,120,"+Math.max(1-i*0.1,0.4)+")";
		ctxt.fillRect(Snake[i].x*bianchang,Snake[i].y*bianchang,bianchang,bianchang);
	}
	ctxt.fillStyle="aquamarine";
	ctxt.fillRect(food.x*bianchang,food.y*bianchang,bianchang,bianchang);
	press=1;
	if(gameover) window.clearInterval(kaishi);
}