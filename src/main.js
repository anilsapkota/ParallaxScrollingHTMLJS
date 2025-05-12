import { loadSprite,makeSprite,makeLayer,makeInfiniteScroll } from "./utils.js";

const container = document.querySelector('.container');

new ResizeObserver(()=>{
    document.documentElement.style.setProperty(
        "--scale",
        Math.min(
            container.parentElement.offsetWidth / container.offsetWidth,
            container.parentElement.offsetHeight / container.offsetHeight
        )
    )

}).observe(container.parentElement);

async function main(){
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    const [layer1,layer2,layer3,layer4] = await Promise.all([
        loadSprite('./assets/1.png'),
        loadSprite('./assets/2.png'),
        loadSprite('./assets/3.png'),
        loadSprite('./assets/4.png')
    ]);

    const layer1GameObj = makeSprite(ctx,layer1,{x:0,y:-100},4);
    const layer2GameObj = makeLayer(ctx,layer2,{x:0,y:-100},4);
    const layer3GameObj = makeLayer(ctx,layer3,{x:0,y:-100},4);
    const layer4GameObj = makeLayer(ctx,layer4,{x:0,y:-100},4);



    let deltaTime; 
    let oldTimeStamp = 0;
    let fps;
    const debugMode = false;

    function gameLoop(timeStamp){
        deltaTime = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        fps = Math.round(1/deltaTime);

        ctx.clearRect(0,0,canvas.width,canvas.height);

        layer1GameObj.draw();
        makeInfiniteScroll(deltaTime,layer2GameObj,-50);
        makeInfiniteScroll(deltaTime,layer3GameObj,-400);
        makeInfiniteScroll(deltaTime,layer4GameObj,-800);

        if(debugMode){
            ctx.font = "128px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(fps,25,120);


        }





        requestAnimationFrame(gameLoop);

    }


    requestAnimationFrame(gameLoop);

}

main();