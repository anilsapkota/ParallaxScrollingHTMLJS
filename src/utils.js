export function loadSprite(src){
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.src = src + "?t" + new Date().getTime();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);

    });

}

export function makeSprite(ctx,sprite,pos,scale =1){
    return {
        width:sprite.width,
        height:sprite.height,
        pos,
        scale,
        draw(){
            ctx.drawImage(
                sprite,
                this.pos.x,
                this.pos.y,
                this.width * scale,
                this.height * scale
            );
        },
    };
}

export function makeLayer(ctx,sprite,pos,scale =1){
    return {
        head:makeSprite(ctx,sprite,pos,scale),
        tail:makeSprite(ctx,sprite,{x:pos.x +sprite.width * scale, y:pos.y},scale),
    };

}

export function makeInfiniteScroll(deltaTime,layer,speed){
    if(layer.head.pos.x + layer.head.width * layer.head.scale <0){
        layer.head.pos.x = layer.tail.pos.x + layer.tail.width * layer.tail.scale;
    }

    if(layer.tail.pos.x + layer.tail.width * layer.tail.scale <0){
        layer.tail.pos.x = layer.head.pos.x + layer.head.width * layer.tail.scale;
    }

    layer.head.pos.x += speed * deltaTime;
    layer.head.draw();

    layer.tail.pos.x += speed * deltaTime;
    layer.tail.draw();
}