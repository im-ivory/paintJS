const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const deleteBtn = document.getElementById("jsDelete");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 500;
const DEFAULT_COLOR = "#2c2c2c"; // black

canvas.width = CANVAS_SIZE; //
canvas.height = CANVAS_SIZE;

fillWhite(); //배경 투명화를 막기 위해 처음에 흰색배경 설정
ctx.strokeStyle = DEFAULT_COLOR; // default 그리기 색상
ctx.fillStyle = DEFAULT_COLOR; 
ctx.lineWidth = 2.5; // default 라인 굵기

let painting = false; //값이 변할 수 있는 painting 선언. default는 false
let filling = false; // 💛 default는 Paint(그리기) 상태, 현재 fill은 false


function fillWhite(){
    ctx.fillStyle = "white"; //흰색으로
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE); //흰사각형으로 fill하기
}

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
    painting = true; // 캔버스 클릭하면 그리기 시작
};

function handleColorClick(event){
    const newColor = event.target.style.backgroundColor;
    ctx.strokeStyle = newColor;
    ctx.fillStyle = newColor; 
}

function handleRangeClick(event){
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleModeClick(event){ // 💛
    if(filling==true){ // fill 기능인 상태
        filling = false; // 버튼을 누르면 paint 기능으로 바뀜
        event.target.innerText = "Fill"; // 버튼 내용은 Fill로 바뀜
        canvas.classList.remove("fill-mode");
    }else{ //default 상태. filling이 false인 상태(=Paint 기능인 상태)
        filling = true; // 버튼을 누르면 fill 기능으로 바뀜
        event.target.innerText = "Paint"; // 버튼 내용은 Paint로 바뀜
        canvas.classList.add("fill-mode");
    }
}

function handleFillCanvas(){
    if(filling){ // filling= true인 상태에서만 실행하기!
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault(); // 우클릭시 contextmenu 나오는 기본동작 막기
}

function handleSaveClick(){
    const image = canvas.toDataURL(); // 그려진 캔버스를 이미지 형식의 URL로 전환해줌(Default는 png파일)
    const link = document.createElement("a"); //버튼에 연결한 link 생성
    link.href = image; // <a href="URL"></a> a의 href값은 위의 image URL
    link.download = "PaintJS"; // link를 여는 대신 "PaintJS"라는 이름으로 다운로드 되게 하기
    link.click(); // Save 버튼을 누르면 이 다운로드 링크를 누르는것과 같게 함.
}

//Array.from() -> array 형태로 바꿔줌. color는 요소 이름이라서 아무 단어로 해도 됨
Array.from(color).forEach(color => color.addEventListener("click", handleColorClick));


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직일 때
    canvas.addEventListener("mousedown", startPainting); //마우스가 클릭되었을 때
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭에서 손 뗐을 때
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스에서 벗어났을 때
    canvas.addEventListener("click", handleFillCanvas); //클릭하면 채워지게
    canvas.addEventListener("contextmenu", handleCM); // contextmenu = 마우스 오른쪽 누르면 나오는 메뉴
};

if(range){
    range.addEventListener("input", handleRangeClick);
};

if(mode){
    mode.addEventListener("click", handleModeClick);
};

if(deleteBtn){
    deleteBtn.addEventListener("click", fillWhite);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}