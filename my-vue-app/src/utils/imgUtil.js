export const loadNetworkImage = (src, timeout = 60000) => {
    return new Promise((resole, reject) => {
        let timeoutEventId;
        let startTime = new Date().getTime();
        let xhr = new XMLHttpRequest();
        xhr.open("get", src, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status === 200) {
                let blob = this.response;
                let a = new FileReader();
                a.onload = function (e) {
                    clearTimeout(timeoutEventId);
                    resole(e.target.result);
                    console.warn(`download img success : ${new Date().getTime() - startTime}ms  url: ${src}`);
                }
                a.readAsDataURL(blob);
            }
        };
        xhr.timeout = timeout;
        xhr.ontimeout = function (e) {
            // XMLHttpRequest timed out. Do something here.
            reject({ type: 'timeout', message: 'have been timeout...' });
        };
        xhr.addEventListener('error', function (e) {
            reject(e);
        });
        xhr.send();
    }).then(dataUrl => {
        return loadImage(dataUrl)
    }).catch(reason => {
        console.error(reason);
        return src;
    })
}

export const getUrlBase64 = (url, mx, mh) => {
    return new Promise((resolve, reject) => {
        var canvas = document.createElement("canvas");   //创建canvas DOM元素
        var ctx = canvas.getContext("2d");
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onerror = (e) => {
            console.error(e)
            reject(`load image ${src} error`);
        };
        img.onload = (e) => {
            canvas.height = mx; //指定画板的高度,自定义
            canvas.width = mh; //指定画板的宽度，自定义
            ctx.drawImage(img, 0, 0, mx, mh); //参数可自定义
            const dataURL = canvas.toDataURL("image/");
            resolve(dataURL)
            canvas = null;
        }
    });
};

export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        let imgObj = new Image();
        imgObj.setAttribute('crossOrigin', 'anonymous');
        imgObj.onerror = (e) => {
            console.error(e)
            reject(`load image ${src} error`);
        };
        imgObj.onload = (e) => {
            resolve(imgObj);
        };
        imgObj.src = src;
    });
};

//不裁剪不压缩图片(以图搜图)
export const imgToBase64 = (imgObj, width, height, left = 0, top = 0) => {
    let src = imgObj.src;
    return new Promise((resolve, reject) => {
        let w = width ? width : imgObj.width,
            h = height ? height : imgObj.height,
            canvas;
        try {
            canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(imgObj, left, top, w, h, 0, 0, canvas.width, canvas.height);
            let base64Image = canvas.toDataURL('image/jpeg');

            resolve(base64Image);
        } catch (e) {
            console.error(e)
            reject(`base64 image ${src} error`);
        }
        canvas = null;
    });
};

//裁剪压缩图片
export const img2Base64 = (imgObj, widthNum, heightNum, left, top, dpr) => {
    let src = imgObj.src;
    return new Promise((resolve, reject) => {
        let width = imgObj.width,
            height = imgObj.height,
            canvas;
        try {
            canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            //canvas.width = canvas.height = 640;

            if (width / height > 1) {
                canvas.width = widthNum;
                canvas.height = height / width * widthNum;
                if (dpr) {
                    canvas.style.width = widthNum + "px"
                    canvas.style.height = (height / width * widthNum) + "px"
                }
            } else {
                canvas.width = width / height * widthNum;
                canvas.height = widthNum;
                if (dpr) {
                    canvas.style.width = (width / height * widthNum) + "px"
                    canvas.style.height = widthNum + "px"
                }
            }

            // canvas清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            /*canvas.width = width;
            canvas.height = height;*/        
            ctx.drawImage(imgObj, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
            /*let suffix = (src.substring(src.lastIndexOf('.') + 1) || "").toLowerCase();
            if (!suffix) {
                reject(`src ${src} suffix =${suffix}`);
            }
            let imgTypeMap = {
                png: 'png',
                jpg: 'jpeg',
            };
            let imgType = 'image/' + (imgTypeMap[suffix] || 'jpeg');*/
            //console.info(`base64 img imgType=${imgType}`);            
            let base64Image = canvas.toDataURL('image/jpeg');
            resolve(base64Image);
        } catch (e) {
            console.error(e)
            reject(`base64 image ${src} error`);
        }
        canvas = null;
    });
};


/**
 * 将base64还原成文件
 */
// export const convertBase64UrlToFile = (urlData) => {
//     const bytes = window.atob(urlData.split(',')[1]); // 去掉url的头，并转换为byte

//     // 处理异常,将ascii码小于0的转换为大于0
//     const ab = new ArrayBuffer(bytes.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < bytes.length; i++) {
//         ia[i] = bytes.charCodeAt(i);
//     }

//     return new Blob([ab], { type: 'image/jpeg' });
// };

/** 
 * @method 将base64转换为file对象
 * @param {String} dataURL base64地址
 * @param {String} fileName 文件名称
 * @param {String} fileType 图片类型 默认image/jpg
 * @return {Object} file对象
*/
export const convertBase64UrlToFile = (dataURL, fileName, fileType) => {
    var arr = dataURL.split(','), bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: fileType || 'image/jpg' });
}

/**
 * 将图片file转换为img对象
 */
export const readImg = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.onload = function (e) {
            img.src = e.target.result
        }
        reader.onerror = function (e) {
            reject(e)
        }
        reader.readAsDataURL(file)
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function (e) {
            reject(e)
        }
    })
}

/**
 * 压缩图片
 * @param img 被压缩的img对象
 * @param mx 触发压缩的图片最大宽度限制
 * @param mh 触发压缩的图片最大高度限制
 */
export const compressImg = (img, mx, mh, fileType, quality = 1) => {
    return new Promise((resolve, reject) => {
        let canvas
        try {
            canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const { width: originWidth, height: originHeight } = img
            let dataURL = ''
            // 最大尺寸限制
            const maxWidth = mx
            const maxHeight = mh
            // 目标尺寸
            let targetWidth = originWidth
            let targetHeight = originHeight
            if (mx && mh) {
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > 1) {
                        // 宽图片
                        targetWidth = maxWidth
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                    } else {
                        // 高图片
                        targetHeight = maxHeight
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                    }
                }
            }
            canvas.width = targetWidth
            canvas.height = targetHeight
            context.clearRect(0, 0, targetWidth, targetHeight)
            // 图片绘制
            context.drawImage(img, 0, 0, targetWidth, targetHeight)
            dataURL = canvas.toDataURL(fileType || 'image/jpeg', quality) // 转换图片为dataURL
            resolve({
                base64: dataURL,
                width: targetWidth,
                height: targetHeight,
            })

            // 转换为bolb对象
            // canvas.toBlob(function(blob) {
            //   resolve(blob)
            // }, type || 'image/png')
        } catch (e) {
            console.error(e)
            reject(`base64 image ${src} error`);
        }
        canvas = null;
    })
}

export const loadImage = (src, width, height, left = 0, top = 0, dpr = 1) => {
    if (!src) return Promise.reject('loadImage lost argument src');

    /*if (src.indexOf('data:image') > -1) {
        return Promise.resolve(src);
    }*/
    /*let md5Value = key || MD5(src);
    let cacheKey = `IMG_${md5Value}`;*/

    return preloadImage(src, width, height, left, top, dpr).then(img => {
        return img2Base64(img, width, height, left, top, dpr)
    })
    /*.then(base64Img => {
            indexedDb.save({
                id: cacheKey,
                ver: md5Value,
                text: base64Img
            });
            return base64Img;
        })*/
};

export const loadOrgImage = (src, width, height, left = 0, top = 0) => {
    if (!src) return Promise.reject('loadOrgImage lost argument src');

    return preloadImage(src, width, height, left, top).then(img => {
        return imgToBase64(img, width, height, left, top)
    })

};

export function getPicBase64 (picId) {
    let img = document.getElementById(picId)
    if (!img) {
        return
    }
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    let base64 = canvas.toDataURL('image/jpeg', 0.5)
    canvas = null
    return base64.slice(base64.lastIndexOf('base64,') + 'base64,'.length)
}

export function getPicBase64ByUrl (url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = url
        img.setAttribute('crossOrigin', 'Anonymous')
        img.onload = function () {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height
            canvas.width = width
            canvas.height = height
            canvas.getContext('2d').drawImage(img, 0, 0, width, height)
            let base64 = canvas.toDataURL('image/jpeg', 0.5)
            canvas = null
            resolve(base64.slice(base64.lastIndexOf('base64,') + 'base64,'.length))
        }
        img.onerror = function (e) {
            reject(e)
        }
    })
}

export const handleImageSize = (img, coord) => {
    const iWidth = parseFloat(img.width)
    const iHeight = parseFloat(img.height)


    let left = parseFloat(coord.left)
    let top = parseFloat(coord.top)

    let width = parseFloat(coord.width)
    let height = parseFloat(coord.height)

    if (width > height) {
        if (width >= iHeight) {
            height = iHeight
            top = top - (iHeight - coord.height) / 2
        } else {
            height = width
            top = top - (height - coord.height) / 2
        }
    } else {
        if (height >= iWidth) {
            width = iWidth
            left = left - (iWidth - coord.width) / 2
        } else {
            width = height
            left = left - (width - coord.width) / 2
        }
    }

    const right = iWidth - left - width
    const bottom = iHeight - top - height

    const lRatio = (width + 2 * left) / width
    const rRatio = (width + 2 * right) / width
    const tRatio = (height + 2 * top) / height
    const bRatio = (height + 2 * bottom) / height

    const minRatio = Math.min(...[lRatio, rRatio, tRatio, bRatio])
    const scale = parseInt((minRatio > 1.5 ? 1.5 : minRatio) * 100) / 100
    const hRatio = (scale - 1) / 2

    return {
        'width': parseInt(width * scale),
        'height': parseInt(height * scale),
        'left': parseInt(left - width * hRatio),
        'top': parseInt(top - height * hRatio),
    }
}
