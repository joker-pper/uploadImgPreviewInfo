/**
 * callback can get about the img's info, you can to do something in it.
 * @param option  --- {file: object, ieUseClarityPic: ieUseClarityPic}
 * @param callback --- function(result){}  //result [{src: string, filter: string}]
 */
function getUploadImgPreviewInfo(option, callback) {
   var file = option.file;  //the input type is file's object

    if(file == null) {
        throw new Error(" the file object is null");
    }
   var ieUseClarityPic = option.ieUseClarityPic; //filter use clarity picture

    function trigger(result) {
        if(callback && typeof callback == "function") {
            callback(result);
        }
    }
    var files = file.files;
    var result = [];
    var src, filter;
    if(window.FileReader){
        var readerLength = 0;
        for(var index = 0 ; index < files.length; index ++) {
            var reader = new FileReader();
            reader.readAsDataURL(files[index]);
            reader.onload = function (event) {
                readerLength ++;
                src = event.target.result;  //base64
                result.push({src: src, filter: filter});
                if(readerLength == files.length) {
                    trigger(result);
                }
            }
        }
    } else {
        if (files) {
            for(var index = 0 ; index < files.length; index ++) {
                var currentFile = files.item(index);
                if (currentFile) {
                    if(window.URL.createObjectURL) {  //use createObjectURL
                        src = window.URL.createObjectURL(currentFile);
                    } else if (currentFile.getAsDataURL) { //use getAsDataURL
                        src = currentFile.getAsDataURL();
                    }
                    result.push({src: src, filter: filter});
                }
            }

        } else if (document.all) {
            if (document.selection && typeof document.selection.createRange != "undefined") {
                var imgId = "img.pp.preview";
                var img = document.getElementById(imgId);
                if(img == null) {
                    var img = document.createElement("img");
                    img.id = imgId;
                    img.style.display = "none";
                    document.body.appendChild(img);
                }
                file.select();
                var reallocalpath = document.selection.createRange().text;
                if (img.currentStyle["filter"] != "none") {  //when it is none, it seems that not support filter

                    if(ieUseClarityPic) {
                        src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
                        filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")";
                    } else {
                        src = reallocalpath;
                        filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    }
                } else {
                    src = reallocalpath;
                }
            } else {
                src = file.value;
            }
            result.push({src: src, filter: filter});
        }
        setTimeout(function() {
            trigger(result);
        }, 50);
    }
}


/**
 * to setting the img element value
 * @param img  --- img element
 * @param src  --- the src result
 * @param filter --- the filter result
 */
function handleImgValue(img, src, filter) {
    if(img) {
        img.src = src;
        filter ? img.style.filter = filter :"";
    }
}

/**
 * when this img load success and it's clientHeight or clientWidth gt 0, will to execute the callback
 * @param img
 * @param callback  --- function(event, img){}
 */
function imgLoaded(img, callback) {
    if(img) {
        try {
            img.onload = function(event) {
                if(img.clientWidth > 0 || img.clientHeight > 0) {
                    if(callback && typeof callback == "function") {
                        callback(event, img);
                    }
                }
            }
        } catch (e) {
        }
    }
}
