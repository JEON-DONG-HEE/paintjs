const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const input = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const btnSave = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";     // 배경색을 초기화 해서 투명한 이미지가 되지 않도록 해준다. 이 부분이 없으면 투명한 png 로 저장됨
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);   // 여기까지가 배경색 초기화 한 세트

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleBrushSize(event) {
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();     // 마우스 우클릭 제거    
}

function handleSaveFile() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);  
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);    // 마우스가 캔버스 밖으로 나갈 때 실행
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);   // 마우스 우클릭 제거
}

Array.from(colors).forEach( 
    color => color.addEventListener("click", handleColorClick)
)

if (input) {
    input.addEventListener("input", handleBrushSize);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);  
}

if (btnSave) {
    btnSave.addEventListener("click", handleSaveFile);    
}