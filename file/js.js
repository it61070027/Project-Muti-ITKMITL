var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var count = 0;
var bombkill = "off";
var casebomb = "on";//ตั้งค่าจุดระเบิด
var boomset = "off";//ตั้งระเบิดจะระเบิด
var timebomb = 0;//เซตเวลาระเบิด
var key = { //กำหนดตค่าปุ่มเริ่มต้น
    move:undefined
}
var size = 20; //ขนาดบล็อคตัวงู
var key_p = undefined;
var snake = [{x:canvas.width/2-10, y:canvas.height/2-10}]; //สร้างarray snake เก็บค่าพิกัดงู ซึ่งตัวแรกให้อยู่กลางแมพ
var food = { //สุ่มเกิดอาหาร
    x:Math.floor(Math.random()*24+1)*size,
    y:Math.floor(Math.random()*24+1)*size
}
var time = 20; //กำหนดเวลาของเกม
var score = 0;
var long = 0; //ความยาวของตัวงู

function spawn_b(){
    this.bombx = Math.floor(Math.random()*24+1)*size;
    this.bomby = Math.floor(Math.random()*24+1)*size;
    }
var boom = {
    x:undefined,
    y:undefined
}

for (let i = 1; i <= 3; i++){ //สร้างพิกัดจุดงูเริ่มต้นซึ่งมี4จุด เพราะมี4บล็อค
    snake.push({
        x:canvas.width/2-10,
        y:(canvas.height/2-10)+(i*size)
    })
}
window.addEventListener('keydown', function(event){ // รับค่าkeyboard
    key.move= String.fromCharCode(event.keyCode); //ให้ค่าที่รับกลายเป็นstr
})
function draw(){ //ฟังชั่นในการสร้างภาพทั้งหมด
    if ((snake[0].x == this.bombx || snake[0].y == this.bomby) && bombkill == "on"){ //โดนระเบิดตาย
            clearInterval(game); //หยุดการทำงาน
    }
    if (key.move == "W" && key_p != "S") key_p = "W"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
    else if (key.move == "S" && key_p != "W" && key_p != undefined) key_p = "S"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
    else if (key.move == "A" && key_p != "D") key_p = "A"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
    else if (key.move == "D" && key_p != "A") key_p = "D"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++ ){ //สร้างงูที่อยู่ในarray
        ctx.shadowColor = "#F20505"; //สีshadow
        ctx.shadowBlur = 10; //ขนาดshadow
        ctx.fillStyle = "#BF0404"; //สี
        ctx.fillRect(snake[i].x, snake[i].y, size, size);
        ctx.strokeStyle = "#ef648f";
        ctx.strokeRect(snake[i].x, snake[i].y, size, size);
    }
function drawFood(){
    ctx.shadowColor = "red";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "white"; //สร้างอาหาร
    ctx.fillRect(food.x, food.y, size, size);
    ctx.strokeRect(food.x, food.y, size, size);
    }
    let newx = snake[0].x; // ให้พิกัดใหม่มีค่าเท่ากับหัวงู
    let newy = snake[0].y;

    if (this.key_p == "A") newx -= this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d
    if (this.key_p == "S") newy += this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d
    if (this.key_p == "D") newx += this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d
    if (this.key_p == "W") newy -= this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d

    newx = (newx >= canvas.width?0:newx < 0?canvas.width:newx); //ถ้างูชนกำแพงงูจะวาปมากำแพงตรงข้ามในแนวแกน x
    newy = (newy >= canvas.height?0:newy < 0?canvas.height:newy); //ถ้างูชนกำแพงงูจะวาปมากำแพงตรงข้ามในแนวแกน y
    if (newx != snake[0].x || newy != snake[0].y){
        for (let i = 0; i < snake.length; i++){ //เช็คว่างูชนรึยัง
        if((newx == snake[i].x && newy == snake[i].y)|| (newx == this.bombx && newy == this.bomby)){
            ctx.fillStyle = "green";
            ctx.fillRect(snake[i].x, snake[i].y, size, size);
            ctx.strokeRect(snake[i].x, snake[i].y, size, size);
            clearInterval(game); //หยุดการทำงาน
            }
        }

    }

    if(newx == food.x && newy == food.y){ //ถ้างูกินอาหารแล้วอาหารจะถูกสุ่มเกิดใหม่
        food = {
        x:Math.floor(Math.random()*24+1)*size,
        y:Math.floor(Math.random()*24+1)*size
        }}
    else{
        if ((newx != snake[0].x || newy != snake[0].y) && snake.length != 1){
        snake.pop();} //แล้วงูไม่กินอาหารหางจะหาย
    }
    if (newx != snake[0].x || newy != snake[0].y){
    snake.unshift({ //เพิ่มส่วนหัว (ถ้างูกินอาหารส่วนหางจะไม่ถูกตัดทำให้งูยาวขึ้น)
        x:newx,
        y:newy
    })
    }
function drawBomb(){ //ฟังชั้นวาดระเบิด
    ctx.shadowColor = "purple"; //สีshawdow
    ctx.shadowBlur = 10; //ขนาดshadow
    ctx.fillStyle = "purple"; //สี
    ctx.fillRect(this.bombx, this.bomby, size, size); //สร้างรูป
    ctx.strokeRect(this.bombx, this.bomby, size, size); //สร้างขอบ
    }
function drawBoom(){//วาดระเบิด
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, boom.y, canvas.width, size);
    ctx.fillRect(boom.x, 0, size, canvas.height);
    ctx.strokeRect(0, boom.y, canvas.width, size);
    ctx.strokeRect(boom.x, 0, size, canvas.height);
    }
    count = (count*10 + 0.1*10) /10; // นับที่ละ 1 เพราะฟังชั่นdrawทำงานครั้งละ 1 วิ(ที่ต้องคูณ100เพราะ js บวก float มันกาก)
    if (count%6 == 0){ // ไปที่ฟังชั้นspawn_b เพื่อรีเวลาใหม่
        if (casebomb == "on"){
            spawn_b();
            boomset = "on"
            casebomb = "off";
            timebomb = 0;
        }
        else{
            this.bombx = undefined;
            this.bomby = undefined;
            casebomb = "on";
            boomset = "on";
        }
    }
    if (boomset == "on"){
        if(timebomb == 5 || this.bombx == undefined){//นับเวลาระเบิดหรือระเบิดหาย
            boom.x = this.bombx;
            boom.y = this.bomby;
            boomset = "off";
            if (this.bombx != undefined) bombkill = "on";
            else bombkill = "off";

        }
        timebomb = (timebomb*10 + 0.1*10) /10;  //เวลาระเบิด
    }
    if (bombkill == "on"){
        for (let i = 1; i < snake.length; i++){ //เช็คว่างูชนรึยัง
        if(this.bombx == snake[i].x || this.bomby == snake[i].y){
            snake = snake.slice(0, i);
            }
        }

    }

function start(){
    drawFood();//เรียกฟังชั้นวาดอาหาร
    drawBomb();//เรียกฟังชั้นวาดระเบิด
    drawBoom();//เรียกฟังชั้นวาดแรงระเบิด
}
start();
long = snake.length; //หาขนาด Array งู
updateScore();
}
let game = setInterval(draw,75);
countdown();//เรียกฟังก์ชันนับถอยหลัง

function countdown(){
//  ฟังก์ชันนับเวลา
cd = setInterval(
    function(){
        // ถ้ายังไม่หมดเวลา
        if (time > 0) {
            // ลดเวลา
            time--;
            // อัพเดทเวลา
            updateTime();
        }
        // ถ้าหมดเวลา
        else{
            clearInterval(game);
            console.log("END");
        }
    },1000)
}

function updateTime(){
    // แสดงเวลา
    theTime.innerText = time;

    // ถ้าหมดเวลา ให้บอก
    if (time == 0) {
        status.innerHTML = "Game Over!! <a href='#!' onclick='ready()'>play again</a>"; // !!ยังไม่สำเร็จ คาดว่าต้องแก้ฟังก์ชันใหม่
    }
}
function updateScore(){
    // แสดงคะแนนให้คนดู
    theScore.innerText = long-1; //optional: เอาความยาวมา -1 เพราะไม่อยากให้นับรวมส่วนหัวด้วย
}