enchant();

window.onload = function() {
    var game = new Game(1024, 768);
    //game.fps = 60;
    game.preload('image/droid.dae');
    game.preload('image/hitmsg.png');

    game.onload = function() {
        var scene = new Scene3D();

        var droid = new Sprite3D();
        droid.set(game.assets['image/droid.dae']);
        droid.x = 0;
        droid.y = -1;
        droid.z = -20;

        droid.on('enterframe', function() {
            //// 左右で回転
            //if (game.input.left)    { this.rotateYaw(-0.5); }
            //if (game.input.right)   { this.rotateYaw(0.5); }
            //// 上下で前進後退
            //if (game.input.up)      { this.forward(0.5); }
            //if (game.input.down)    { this.forward(-0.5); }

            // 左右移動
            if (game.input.left)    { this.sidestep(-0.5); }
            if (game.input.right)   { this.sidestep(0.5); }
            // 上下移動
            if (game.input.up)      { this.altitude(0.5); }
            if (game.input.down)    { this.altitude(-0.5); }
        });

        game.rootScene.on('touchstart', function(e) {
            tmpEv = e;

            for (i = 0; i < 200; i++) {
                var ball = new Sphere();
                ball.scale(0.1, 0.1, 0.1)
                ball.z = -Math.random()*200 - 100;
                ball.x = Math.random()*10 - 5;
                ball.y = Math.random()*10 - 5;
                ball.on('enterframe', function() {
                    this.z += 1;
                    if (this.z >= 0) scene.removeChild(this);

                    if (this.intersect(droid)) {
                        var msg = new PlaneXY();
                        msg.mesh.texture.src = game.assets['image/hitmsg.png'];
                        msg.x = droid.x;
                        msg.y = droid.y;
                        msg.z = droid.z;
                        msg.scale(1,0.5,0);
                        msg.on('enterframe', function() {
                            this.y += 0.05;
                            if (this.age == 50) scene.removeChild(this);
                        });
                        scene.addChild(msg);
                    }
                });
                scene.addChild(ball);
            }

        });

        game.rootScene.on('touchmove', function(e) {
            tmpEv = e;
        });

        scene.addChild(droid);

    };
    game.start();
};

