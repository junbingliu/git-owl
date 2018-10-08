(function ($) {
    var IdCardSelector = function (addressEditor, oc, elem, showTemplate, merchantId) {
        var that = this;
        var defaultPicUrl = "/templates/platform/template_7/styles/color_1/shopping/layout_3/images/id-1.jpg";
        this.oc = oc;
        this.idCardNameMode = "show";
        this.idCardMode = "show";
        this.isCrossDirectMail = oc.isCrossDirectMail;
        this.elem = elem;
        this.showTemplate = "#" + showTemplate;
        this.saveUrl = saveUrl;
        this.selectedAddressId = "";
        this.merchantId = merchantId;
        this.userName = "";
        this.idCard = "";
        this.idCardEncode = "";
        this.idCardFrontPic = "";
        this.idCardBackPic = "";
        this.idCardFrontPicPreviewPath = defaultPicUrl;
        this.idCardBackPicPreviewPath = defaultPicUrl;

        this.setOc = function (oc) {
            this.oc = oc;
        };

        this.setOc(oc);
        this.show = function () {
            $(that.elem).html($(that.showTemplate).render(that));

            if (that.idCardNameMode == "edit" || that.userName == "") {
                $(".idCardNameShowDiv", that.elem).hide();
                $(".idCardNameEditDiv", that.elem).show();
            } else {
                $(".idCardNameShowDiv", that.elem).show();
                $(".idCardNameEditDiv", that.elem).hide();
            }

            if (that.idCardMode == "edit" || that.idCard == "") {
                $(".idCardShowDiv", that.elem).hide();
                $(".idCardEditDiv", that.elem).show();
            } else {
                $(".idCardShowDiv", that.elem).show();
                $(".idCardEditDiv", that.elem).hide();
            }

            $(".editIdCardName", that.elem).click(function () {
                that.idCardNameMode = "edit";
                that.show();
            });
            $(".saveIdCardName", that.elem).click(function () {
                if(!that.selectedAddressId || that.selectedAddressId == ""){
                    alert("请先选择一个配置地址");
                    return;
                }
                var userName = $(".receiveUserName", that.elem).val();
                if(userName == ""){
                    alert("请填写正确的收货人姓名");
                    return;
                }
                $.post("/buyflowApp/server/order/updateAddressUserName.jsx", {addressId: that.selectedAddressId,userName:userName}, function (data) {
                    if (data.state == 'ok') {
                        that.idCardNameMode = "show";
                        addressEditor.fireAddressChange();
                    } else {
                        alert(data.msg);
                    }
                }, "json");
            });

            $(".editIdCard", that.elem).click(function () {
                that.idCardMode = "edit";
                that.show();
            });
            $(".saveIdCard", that.elem).click(function () {
                if(!that.selectedAddressId || that.selectedAddressId == ""){
                    alert("请先选择一个配置地址");
                    return;
                }
                var certificate = $(".certificate", that.elem).val();
                if(certificate == ""){
                    alert("请填写正确的身份证号码");
                    return;
                }
                $.post("/buyflowApi/handler/order/saveCertificate.jsx", {addressId: that.selectedAddressId,certificate:certificate}, function (data) {
                    if (data.state == 'ok') {
                        that.idCardMode = "show";
                        that.doInit()
                    } else {
                        alert(data.msg);
                    }
                }, "json");
            });

            $(".selectIdCardFrontPic", that.elem).click(function () {
                if(!that.selectedAddressId || that.selectedAddressId == ""){
                    alert("请先选择一个配置地址");
                    return;
                }
                return $(".idCardFrontPic_action", that.elem).click();
            });

            $(".selectIdCardBackPic", that.elem).click(function () {
                if(!that.selectedAddressId || that.selectedAddressId == ""){
                    alert("请先选择一个配置地址");
                    return;
                }
                return $(".idCardBackPic_action", that.elem).click();
            });
        };

        this.doInit = function () {
            if (addressEditor && addressEditor.getSelectedAddress()) {
                var addr = addressEditor.getSelectedAddress();
                $.post("/appMarket/appEditor/getSelectedAddressInfo.jsp", {addressId: addr.id,spex: "144X90"}, function (data) {
                    if (data.code === '0') {
                        that.setSelectedAddress(data.address);
                    }
                }, "json");
            } else {
                that.show();
            }
        };

        this.setIdCardFrontPicValue = function (previewPath, fullPath, fileId) {
            that.idCardFrontPicPreviewPath = previewPath;
            that.idCardFrontPicFullPath = fullPath;
            that.idCardFrontPic = fileId;

            that.show();
        };

        this.setIdCardBackPicValue = function (previewPath, fullPath, fileId) {
            that.idCardBackPicPreviewPath = previewPath;
            that.idCardBackPicFullPath = fullPath;
            that.idCardBackPic = fileId;

            that.show();
        };

        this.setSelectedAddress = function (addr) {
            if (!addr) {
                return;
            }

            that.selectedAddressId = addr.id || "";
            that.userName = addr.userName || "";
            that.idCard = addr.certificate || "";
            that.idCardEncode = that.convertIdCard(addr.certificate);

            that.idCardFrontPicPreviewPath = addr.idCardFrontPicPreviewPath || defaultPicUrl;
            that.idCardFrontPicFullPath = addr.idCardFrontPicPreviewFullPath || defaultPicUrl;
            that.idCardFrontPic = addr.idCardFrontPic;

            that.idCardBackPicPreviewPath = addr.idCardBackPicPreviewPath || defaultPicUrl;
            that.idCardBackPicFullPath = addr.idCardBackPicPreviewFullPath || defaultPicUrl;
            that.idCardBackPic = addr.idCardBackPic;

            that.show();

        };

        this.convertIdCard = function (certificate) {
            if (!certificate) {
                return "";
            }
            if (certificate.length <= 8) {
                return certificate;
            }
            var newCertificate = certificate.substr(0, 4);
            newCertificate += "**********";
            newCertificate += certificate.substr(certificate.length - 4, 4);
            return newCertificate;
        };

    };

    $.IdCardSelector = IdCardSelector;
})(jQuery);