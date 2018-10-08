var JigsawValidateUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons
);

/**
 * @constructor
 * @type {Object}
 */
var JigsawValidateUtil = {};

/**
 *生成背景图和抠图
 * @param backgroundImageUrl :背景图url
 * @returns {{code: string}}
 */
JigsawValidateUtil.drawImages = function (backgroundImageUrl) {
    var json = JigsawValidateUtilApi.JigsawValidateUtil.drawImages(backgroundImageUrl);
    if (json) {
        return JSON.parse(json.toString());
    }
    return null;
};

/**
 * 检查位移是否正确
 * @param realX     :正确的X坐标
 * @param imageWidth :背景图的实际宽度
 * @param moveX     :用户位移的坐标
 * @param boxWidth  :移动的宽度
 * @returns {*}
 */
JigsawValidateUtil.checkMove = function (realX, imageWidth, moveX, boxWidth) {
    return JigsawValidateUtilApi.JigsawValidateUtil.checkMove(realX, imageWidth, moveX, boxWidth);
};
