var Fish = function () {
    SceneObjectBase.apply(this, arguments);

    this.i = null;
    this.c = null;
    this.v = null;
    this.s = null;
    this.sceneObjects = null;
    this.circleDegree = 0;
    this.circleDegreeStep = 0.1;
    this.frame = 0;
    this.time = 0;
    this.frameTime = 100;
};

Fish.prototype = Object.create(SceneObjectBase.prototype);
Fish.prototype.constructor = SceneObjectBase;

Fish.prototype.init = function (sceneObjects) {
    this.c = new Circle(new Vector((Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0), 0.0);

    this.circleDegree = Math.random() *  360.0;
    this.c.r = this.calcRadius();

    this.v = new Vector((Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0);
    this.v.normalize();

    this.s = 0.005;

    this.animationCounter = 0;
    this.sceneObjects = sceneObjects;
};

Fish.prototype.spriteName = function() {
    return this.v.x <= 0.0 ? "PreyToLeft" : "PreyToRight";
};

Fish.prototype.caclVector = function() {
    var angle = Math.random() * 2.0 * Math.PI;
    var rot = new Vector(this.v.x * Math.cos(angle) - this.v.y * Math.sin(angle), this.v.y * Math.cos(angle) + this.v.x * Math.sin(angle));
    rot.smult(0.1);

    this.v.add(rot);

    this.v.normalize();
};

Fish.prototype.nextStep = function (elapsedTime) {
    this.time += elapsedTime;

    this.frame = Math.floor(this.time / this.frameTime) % 6;

    if(this.time > this.frameTime * 6){
        this.time = (this.time) - (this.frameTime * 6);
    }

    this.caclVector();
    this.calcRadius();

    this.c.v.x += this.v.x * this.s;
    this.c.v.y += this.v.y * this.s;

    if (this.c.v.x >= 1.0 || this.c.v.x <= -1.0) {
        this.v.x = -this.v.x;
    }

    if (this.c.v.y >= 1.0 || this.c.v.y <= -1.0) {
        this.v.y = -this.v.y;
    }

    this.processBubbles();
};

Fish.prototype.calcRadius = function() {
    this.circleDegree = (this.circleDegree + this.circleDegreeStep) % 360.0;
    var radians = this.circleDegree * (Math.PI / 180.0);
    var sinus = Math.sin(radians);
    var multiplier = (sinus + 1.0) / 2.0;

    this.c.r = (multiplier * 0.15) + 0.02;
};

Fish.prototype.processBubbles = function() {
    if(Math.random() > 0.05) return;

    var bubble = new Bubble();
    var x = this.v.x <= 0.0 ?  this.c.v.x : this.c.v.x + this.c.r * 2.0;
    var y =  this.c.v.y + this.c.r * 2.0;
    bubble.init(x, y, this.c.r * 0.1);
    this.sceneObjects.push(bubble);
};

Fish.prototype.getSortIndex = function() {
    return 1.0 - ((this.c.r - 0.02) / 0.15);
};