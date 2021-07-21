const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500; //
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c" // default 그리기 색상
ctx.lineWidth = 2.5; // default 라인 굵기

let painting = false; //값이 변할 수 있는 painting 선언. default는 false

function stopPainting(){
    painting = false; //painting을 멈춤
}

function startPainting(){
    painting = true; // painting 시작
}

function onMouseMove(event){
    const x = event.offsetX; // canvas 안에서의 x 좌표
    const y = event.offsetY; // canvas 안에서의 y 좌표
    if(!painting){ //painting이 아직 시작되지 않았다면(클릭되지 않았다면)
        ctx.beginPath(); // 경로를 따라다니기 시작
        ctx.moveTo(x,y); // 그리기 시작할 point로 마우스를 옮긴 위치
    } else{ //painting이 시작되었을 때(클릭 됐음)
        ctx.lineTo(x,y); // 여기서 x,y는 계속 움직이며 바뀌는 좌표들, 움직일때마다 좌표가 찍어지고, 
                         // 움직이는 좌표마다 line이 계속해서 그려지는 것. 그게 이어져서 결국 하나의 선으로 보여짐
        ctx.stroke(); // 첫 시작점에서 움직이는 좌표까지 선을 그리기
    }
};

function onMouseDown(event){
    painting = true;
};



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직일 때
    canvas.addEventListener("mousedown", startPainting); //마우스가 클릭되었을 때
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭에서 손 뗐을 때
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스에서 벗어났을 때
};