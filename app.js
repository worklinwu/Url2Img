var http = require('http');
var urllib = require('url');
var img = require('./server/generateImg');
var zlib = require('zlib');
var Router = require('routes');
var router = new Router();
var port = 5405;

// 设置路由
router.addRoute('/:width', analysisRequest);
router.addRoute('/:width/:height', analysisRequest);
router.addRoute('/:width/:height/:backgroundColor', analysisRequest);
router.addRoute('/:width/:height/:backgroundColor/:fontColor', analysisRequest);
router.addRoute('*', blank);


http.createServer(function (req, res) {
    var path = urllib.parse(req.url).pathname;
    var match = router.match(path);
    match.fn(req, res, match);
}).listen(port, function () {
    console.log('server is listening on port ' + port);
});

/**
 * 生成图片
 * @param req
 * @param res
 * @param match
 * @constructor
 */
function analysisRequest(req, res, match) {
    var width = (match.params.width) ? parseInt(match.params.width) : undefined;
    var height = (match.params.height) ? parseInt(match.params.height) : width;
    var bg_color = (match.params.backgroundColor) ? match.params.backgroundColor : undefined;
    var font_color = (match.params.fontColor) ? "#" + match.params.fontColor : "#fff";
    var font_size;

    if (!typeof width === 'number' || !typeof height === 'number') {
        blank.apply(this, arguments);
    }
    else {
        // 计算背景色
        if (bg_color) {
            if (bg_color == "r") {
                bg_color = "#" + randomColor();
            } else if (bg_color == "t") {
                bg_color = "transparent";
                font_color = "transparent";
            } else if (isNaN(parseInt(bg_color, 16))) {
                bg_color = "#aaa";
            } else {
                bg_color = "#" + bg_color;
            }
        } else {
            bg_color = "#aaa";
        }

        // 计算文字大小
        if (width / height > 3) {
            font_size = parseInt(height / 1.7);
        } else {
            font_size = parseInt(width / 7);
        }
        if (font_size < 10) {
            font_size = 10;
        }

        // 生成图片
        img(width, height, bg_color, font_color, font_size, function (err, svgString) {
            zlib.gzip(svgString, function (err, svgCompressed) {
                var cacheTime = 60 * 60 * 24 * 7; // 7 Days
                var expires = new Date(Date.now() + (cacheTime * 1000)).toUTCString();

                res.writeHead(200, {
                    'Content-Type': 'image/svg+xml',
                    'Content-Encoding': 'gzip',
                    'Cache-Control': 'public, max-age=' + (cacheTime),
                    'Expires': expires
                });

                res.end(svgCompressed);
            });

        });
    }
}

/**
 * 生成空白图片
 * @param req
 * @param res
 * @param match
 */
function blank(req, res, match) {
    img(0, 0, "transparent", "transparent", 0, function (err, svgString) {
        zlib.gzip(svgString, function (err, svgCompressed) {
            var cacheTime = 60 * 60 * 24 * 7; // 7 Days
            var expires = new Date(Date.now() + (cacheTime * 1000)).toUTCString();

            res.writeHead(200, {
                'Content-Type': 'image/svg+xml',
                'Content-Encoding': 'gzip',
                'Cache-Control': 'public, max-age=' + (cacheTime),
                'Expires': expires
            });

            res.end(svgCompressed);
        });

    });
}

/**
 * 取随机颜色, 当然是有限制的(避免图片过亮或者过暗)
 */
function randomColor() {
    var arr_color;
    var result = "";
    var color_num;

    do {
        arr_color = calculateNumArr();
    } while (arr_color == undefined); // 不知道为什么, 有时候arr_color会返回 undefined, 请高人指点

    for (var i = 0; i < arr_color.length; i++) {
        color_num = arr_color[i].toString(16);
        if (color_num.length == 1) {
            color_num = "0" + color_num;
        }
        result += color_num;
    }
    return result;
}

/**
 * 计算随机数组
 * @returns {Array}
 */
function calculateNumArr() {
    var count = 0;
    var arr_color = [];
    for (var i = 0; i < 3; i++) {
        arr_color[i] = Math.floor(Math.random() * 254);
    }

    for (var j = 0; j < 3; j++) {
        count += arr_color[j];
    }

    if (count > 600 || count < 100) {
        calculateNumArr();
    } else {
        return arr_color;
    }
}