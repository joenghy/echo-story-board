const removeImageBlanks = (imageObject) => {
    const imgWidth = imageObject.width;
    const imgHeight = imageObject.height;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", imgWidth);
    canvas.setAttribute("height", imgHeight);
    const context = canvas.getContext("2d");
    context.drawImage(imageObject, 0, 0);

    const imageData = context.getImageData(0, 0, imgWidth, imgHeight),
        data = imageData.data,
        getRBG = function (x, y) {
            const offset = imgWidth * y + x;
            return {
                red: data[offset * 4],
                green: data[offset * 4 + 1],
                blue: data[offset * 4 + 2],
                opacity: data[offset * 4 + 3]
            };
        },
        isWhite = function (rgb) {
            // many images contain noise, as the white is not a pure #fff white
            return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
        },
        scanY = function (fromTop) {
            const offset = fromTop ? 1 : -1;
            // loop through each row
            for (let y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
                // loop through each column
                for (let x = 0; x < imgWidth; x++) {
                    const rgb = getRBG(x, y);
                    if (!isWhite(rgb)) {
                        if (fromTop) {
                            return y;
                        } else {
                            return Math.min(y + 1, imgHeight);
                        }
                    }
                }
            }
            // all image is white
            return null;
        },
        scanX = function (fromLeft) {
            const offset = fromLeft ? 1 : -1;
            // loop through each column
            for (let x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
                // loop through each row
                for (let y = 0; y < imgHeight; y++) {
                    const rgb = getRBG(x, y);
                    if (!isWhite(rgb)) {
                        if (fromLeft) {
                            return x;
                        } else {
                            return Math.min(x + 1, imgWidth);
                        }
                    }
                }
            }
            // all image is white
            return null;
        };

    const cropTop = scanY(true),
        cropBottom = scanY(false),
        cropLeft = scanX(true),
        cropRight = scanX(false),
        cropWidth = cropRight - cropLeft,
        cropHeight = cropBottom - cropTop;

    canvas.setAttribute("width", cropWidth);
    canvas.setAttribute("height", cropHeight);
    // crop the image
    canvas.getContext("2d").drawImage(imageObject,
        cropLeft, cropTop, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight);

    return canvas.toDataURL();
}

export default removeImageBlanks;