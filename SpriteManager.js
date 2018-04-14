var SpriteManager = function () {
    this.items = {};
};

SpriteManager.prototype.add = function (name, sprites, callback) {
    var i;
    var self = this;
    self.items[name] = [];

    for (i = 0; i < sprites.length; i++) {
        var image = new Image();
        image.addEventListener("load", function () {
            if (self.items[name].complete) {
                return;
            }

            var j;
            var allComplete = true;
            for (j = 0; j < self.items[name].length; j++) {
                if (!self.items[name][j] || !self.items[name][j].complete) {
                    allComplete = false;
                    break;
                }
            }

            if (allComplete && callback) {
                self.items[name].complete = true;
                callback(name);
            }
        }, false);
        self.items[name].push(image);
    }

    for (i = 0; i < sprites.length; i++) {
        self.items[name][i].src = sprites[i];
    }
};

SpriteManager.prototype.get = function (name) {
    return this.items[name];
};

SpriteManager.prototype.init = function (callback) {
    var complete = false;
    var data = {
        "PreyToLeft": {
            srcs: [
                "./Fishsprite/pngs/Rest_facing_left/1.png",
                "./Fishsprite/pngs/Rest_facing_left/2.png",
                "./Fishsprite/pngs/Rest_facing_left/3.png",
                "./Fishsprite/pngs/Rest_facing_left/4.png",
                "./Fishsprite/pngs/Rest_facing_left/5.png",
                "./Fishsprite/pngs/Rest_facing_left/6.png"
            ],
            complete: false
        },
        "PreyToRight": {
            srcs: [
                "./Fishsprite/pngs/Rest_facing_right/1.png",
                "./Fishsprite/pngs/Rest_facing_right/2.png",
                "./Fishsprite/pngs/Rest_facing_right/3.png",
                "./Fishsprite/pngs/Rest_facing_right/4.png",
                "./Fishsprite/pngs/Rest_facing_right/5.png",
                "./Fishsprite/pngs/Rest_facing_right/6.png"
            ],
            complete: false
        },
        "background": {
            srcs: [
               "./cute-Fish-tank-backgrounds.jpg"
            ],
            complete: false
        },
        "buble": {
            srcs: [
                "./buble.png"
             ],
             complete: false
        }
    };

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            this.add(key, data[key].srcs, function (name) {
                data[name].complete = true;

                var allComplete = true;
                for (var kkey in data) {
                    if (!data[kkey] || !data[kkey].complete) {
                        allComplete = false;
                        break;
                    }
                }

                if (allComplete && callback) {
                    callback();
                }
            });
        }
    }
};