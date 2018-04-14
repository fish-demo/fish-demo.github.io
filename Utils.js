var Vector = function (xx, yy) {
    this.x = xx;
    this.y = yy;

    this.add = function (v) {
        this.x += v.x;
        this.y += v.y;
    };

    this.deduct = function (v) {
        this.x -= v.x;
        this.y -= v.y;
    };

    this.smult = function (x) {
        this.x *= x;
        this.y *= x;
    };

    this.length = function () {
        return Math.sqrt(Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0));
    };

    this.normalize = function () {
        var len = this.length();
        this.x = this.x / len;
        this.y = this.y / len;
    };
};

var Circle = function (vv, rr) {
    this.v = vv;
    this.r = rr;

    this.collision = function (c) {
        return Math.sqrt(c.v.x - this.v.x) + Math.sqrt(c.v.y - this.v.x) <= Math.sqrt(c.r + this.r);
    };
};