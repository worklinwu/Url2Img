# Url2Img

`Url2Img` 是一个图片服务，通过URL请求返回一张`SVG`图片，你可以通过参数来设置图片的背景色和文字色。

### Params:

* `/` : 参数为空的话生成一个0像素的 `空白图片`
* `/{width}` : 生成 `等宽高` 的图片。  （默认的背景色是`#aaa`，文字色是`#fff`）
* `/{width}/{height}` : 生成 `指定宽高` 的图片。 
* `/{width}/{height}/t` : 生成 背景为`透明色` 的图片 
* `/{width}/{height}/r` : 生成 背景色为`随机色` 的图片
* `/{width}/{height}/bgColor` : 生成 `指定背景色` 的图片
* `/{width}/{height}/bgColor/fontColor` : 生成 `指定背景色` 和 `指定文字色` 的图片
    
### Example:
```
$ npm install
```
```
$ node app
```
在浏览器中输入
* http://127.0.0.1:5405
* http://127.0.0.1:5405/300
* http://127.0.0.1:5405/300/150/r
* http://127.0.0.1:5405/300/150/t
* http://127.0.0.1:5405/300/150/f55
* http://127.0.0.1:5405/300/150/f55
* http://127.0.0.1:5405/300/150/f55/ccc