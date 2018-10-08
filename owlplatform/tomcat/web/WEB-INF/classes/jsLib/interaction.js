var InteractionApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.interaction.service
);
/**
 * @constructor
 * @type {Object}
 */
var InteractionService = {};

InteractionService.checkOrderLedger = function (jOrder) {
    if (!jOrder) {
        return null;
    }
    jOrder = $.toJavaJSONObject(jOrder);
    return InfoscapeUtil.java2Javascript(InteractionApi.IsoneInteractionEngine.interactionService.checkOrderLedger(jOrder));
};