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
        
        context.clearRect(0, 0, width, height);

        context.drawImage(sprites.get("background")[0], 0, 0, width, height);
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

            for (i = 0; i < 30; i++) {
                var fish = new Fish();
                fish.init(sceneObjects);
                sceneObjects.push(fish);
            }

            window.requestAnimationFrame(renderAnimationFrame);
        });
    };
};