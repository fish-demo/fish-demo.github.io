var Bubble = function () {
    SceneObjectBase.apply(this, arguments);

    this.i = null;
    this.c = null;
    this.v = null;
    this.s = null;
    this.markedForRemove = false;
    this.frame = 0;
};

Bubble.prototype = Object.create(SceneObjectBase.prototype);
Bubble.prototype.constructor = SceneObjectBase;

Bubble.prototype.init = function (x, y, radius) {
    this.c = new Circle(new Vector(x, y));
    this.c.r = radius;

    this.v = new Vector(0.0, -1.0);
    this.v.normalize();

    this.s = 0.005;

    this.animationCounter = 0;
};

Bubble.prototype.spriteName = function() {
    return "buble";
};

Bubble.prototype.caclVector = function() {
    var angle = Math.random() * 2.0 * Math.PI;
    var rot = new Vector(this.v.x * Math.cos(angle) - this.v.y * Math.sin(angle), this.v.y * Math.cos(angle) + this.v.x * Math.sin(angle));
    rot.smult(0.1);

    this.v.add(rot);

    this.v.normalize();
};

Bubble.prototype.nextStep = function () {
    this.c.v.y += this.v.y * this.s;

    if (this.c.v.y <= -1.0) {
        this.c.v.y = -1.0;
        this.markedForRemove = true;
    }
};

Bubble.prototype.getSortIndex = function() { 
    return 0.0;
};