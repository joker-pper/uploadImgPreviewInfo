# uploadImgPreviewInfo
它可以获取上传图片文件的信息，用来显示预览图片。很直接的返回所需要的src及filter信息。理论上支持主流浏览器和老版本ie。

the english introduce： (by baidu translate)
It can get upload image file information, used to display the preview picture. Very direct return of the required SRC and filter information.
Theoretically support mainstream browsers and older versions of IE.

# how to use ?

getUploadImgPreviewInfo
  params: option(object):  {file: object(*), ieUseClarityPic: boolean }  //file 是指上传文件的input对象 ,ieUseClarityPic是决定低版本ie是否使用透明图片
          callback(function): function (result) { //result: [{src: string, filter: string}]
          }
          
 #  传入指定参数后，通过回调函数可以获取到相关的信息，并没有做是否为图片格式的验证，仅仅用来获取所产生的预览路径src,filter是为ie低版本所提供的，当filter不为空时需要进行设置要显示图片对象的style.filter = filter。
 #  该插件使用原生的方式，不需要其他插件也能独立使用。
 #  支持返回多个文件的信息（ie10及以上才支持多文件上传，需要浏览器的支持）
