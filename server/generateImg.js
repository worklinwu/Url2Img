/*
 * file name : 生成SVG图片, 文件参考 [nosrc](https://github.com/fooey/nosrc)
 * author : linwu
 * datetime : 2015-2-13
 */

"use strict";

module.exports = function (width, height, bg_color, font_color, font_size, callback) {
    var util = require('util');
    var svgData;

    svgData = [
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
        util.format('<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewport="0 0 %d %d">', width, height, width, height),
        '<desc>Powered by http://www.linwu.name</desc>',
        util.format('<rect fill="%s" stroke-width="none" width="%d" height="%d" />', bg_color, width, height),
        util.format('<text x="50%" y="50%" dy=".4em" font-size="%d" text-anchor="middle" fill="%s" style="font-family: Arial, sans-serif">%d×%d</text>', font_size, font_color, width, height),
        '</svg>'
    ];

    callback(null, svgData.join(''));
};
