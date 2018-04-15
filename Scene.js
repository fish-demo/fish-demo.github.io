var Scene = function () {
    var width;
    var height;
    var canvas;
    var context;
    var sceneObjects = [];
    var spritesToLeft = [];
    var spritesToRight = [];
    var backgroundSprite;
    var sprites;
    var prevAnimationFrameTimeStamp = 0;

    function mapVec(vec) {
        var xLen = (1.0 + vec.x) * 0.5;
        var yLen = (1.0 + vec.y) * 0.5;
        return { x: xLen * width, y: yLen * height };
    }

    function map(val) {
        var min = width < height ? width : height;
        return min * val;
    }

    function renderAnimationFrame(timeStamp) {
        var elapsedTime = timeStamp - prevAnimationFrameTimeStamp;
        prevAnimationFrameTimeStamp = timeStamp;
        
        drawImageProp(context, sprites.get("background")[0], 0, 0, width, height);

        var maxDimension = Math.max(width, height);

        var i;
        var j;

        for (i = 0; i < sceneObjects.length; i++) {
            if(sceneObjects[i].markedForRemove) {
                sceneObjects.splice(i, 1);
                continue;
            }

            sceneObjects[i].nextStep(elapsedTime);

            var pos = mapVec(sceneObjects[i].c.v);

            var spriteItems = sprites.get(sceneObjects[i].spriteName());
            var currentSprite = spriteItems[sceneObjects[i].frame];

            var dx = maxDimension * sceneObjects[i].c.r;
            context.drawImage(currentSprite, pos.x, pos.y, dx, dx);
        }

        window.requestAnimationFrame(renderAnimationFrame);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext('2d');
    }

    this.init = function () {
        canvas = document.getElementById('canvas');
        resize();

        window.addEventListener("resize", resize);

        sprites = new SpriteManager();
        sprites.init(function () {
            var i;

            for (i = 0; i < 20; i++) {
                var fish = new Fish();
                fish.init(sceneObjects);
                sceneObjects.push(fish);
            }

            window.requestAnimationFrame(renderAnimationFrame);
        });
    };

     /**
     * By Ken Fyrstenberg Nilsen
     *
     * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
     *
     * If image and context are only arguments rectangle will equal canvas
    */
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        /// default offset is center
        offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
        offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

        /// keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   /// new prop. width
            nh = ih * r,   /// new prop. height
            cx, cy, cw, ch, ar = 1;

        /// decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (nh < h) ar = h / nh;
        nw *= ar;
        nh *= ar;

        /// calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        /// make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        /// fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }   
};