var canvas,ctxt;
var Snake=new Array();
var count=20;
var W=H=500;
var bianchang;
var food;
var curDir;
var fps=200;
var gameover=0;
var press=0;
var dx=[0,-1,1,0,0];
var dy=[0,0,0,-1,1];
var kaishi;
window.onload=function(){
	canvas=document.getElementById("canvas");
	ctxt=canvas.getContext('2d');
	canvas.width=500;
	canvas.height=500;
	squareWidth=canvas.height/20;
	bianchang=W/count;
	init();
	window.addEventListener("keydown",function(e){
		var keyID=e.which||e.keyCode;
		if(press==0) return ;
		if(keyID==65||keyID==37){//zuo   1
			if(curDir==2||curDir==1) return ;
			haha(1);
			curDir=1;
		}
		else if(keyID==68||keyID==39){//you  2
			if(curDir==1||curDir==2) return ;
			haha(2);
			curDir=2;
		}
		else if(keyID==87||keyID==38){//shang  3
			if(curDir==3||curDir==4) return ;
			haha(3);
			curDir=3;
		}
		else if(keyID==83||keyID==40){//xia   4
			if(curDir==3||curDir==4) return ;
			haha(4);
			curDir=4;
		}
		press=0;
	},false);
	kaishi=setInterval("donghua();",fps)
}
function haha(dir){
	var head=Snake[0];
	if(head.x+dx[dir]>=0&&head.x+dx[dir]<count&&head.y+dy[dir]>=0&&head.y+dy[dir]<count){
		if(findSnakeBody(head.x+dx[dir],head.y+dy[dir])){
			gameover=1;//挂了
			console.log("吃自己")
			return ;
		}
		else{
			Snake.unshift(new snake(head.x+dx[dir],head.y+dy[dir]));
		}
	}else{
		gameover=1;//挂了
		console.log(dir,head.x+dx[dir],head.y+dy[dir],"出边界")
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
	this.x=x;
	this.y=y;
	this.dir=dir;
}
function randNewFood(){
	var x,y;
	do{
		x=rand(0,count);
		y=rand(0,count);
	}while(findSnakeBody(x,y)&&x>=0&&y>=0&&x<count&&y<count);
	return {
		x:x,
		y:y
	}
}
function init(){
	var x=rand(3,count-3);
	var y=rand(3,count-3);
	var dir=rand(1,4);
	Snake.push(new snake(x,y,dir));
	curDir=dir;
	
	food=randNewFood();
	
}
function donghua(){
	if(press==1) change();
	Draw();
	if(gameover) window.clearInterval(kaishi);
}
function change(){
	haha(curDir);
}
function geta(x){
	return Math.max(1-x*0.1,0.3);
}
function Draw(){
	ctxt.clearRect(0,0,canvas.width,canvas.height);
	ctxt.lineWidth=squareWidth/15;
	for(var i=0;i<Snake.length;i++){
		ctxt.fillStyle="rgba(250,235,215,"+geta(i)+")";
		ctxt.fillRect(Snake[i].x*bianchang,Snake[i].y*bianchang,bianchang,bianchang);
	}
	press=1;
	
	ctxt.fillStyle="aquamarine";
	ctxt.fillRect(food.x*bianchang,food.y*bianchang,bianchang,bianchang);
}
