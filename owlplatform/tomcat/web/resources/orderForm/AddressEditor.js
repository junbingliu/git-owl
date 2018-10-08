function clone(obj) {
    if(obj==null){
        return {};
    }
    var s = JSON.stringify(obj);
    return JSON.parse(s);
}

(function ($) {
    var AddressEditor = function (addresses, elem, initMode, editTemplate, showTemplate, listTemplate, saveUrl,deleteUrl) {
        this.addresses = addresses;
        this.elem = elem;
        this.mode = initMode;
        this.editTemplate = editTemplate;
        this.showTemplate = showTemplate;
        this.addressSelector = null;
        this.saveUrl = saveUrl;
        this.deleteUrl = deleteUrl;
        this.addressChangeListeners = [];


        for (var i = 0; i < this.addresses.length; i++) {
            var addr = this.addresses[i];
            if (addr.isDefault) {
                this.addr = addr;
            }
        }
        if (this.addr == null) {
            if(this.addresses.length>0){
                this.addr = this.addresses[0];
            }
        }
        if(this.addr==null){
            this.mode = "edit";
            this.cloneAddr = {};
        }

        this.addAddressChangeListener = function(listener){
            this.addressChangeListeners.push(listener);
        }

        this.fireAddressChange=function(){
            for(var i=0; i<this.addressChangeListeners.length; i++){
                this.addressChangeListeners[i](this.addr);
            }
        }

        this.show = function () {
            var that = this;
            if (this.mode === 'edit') {
                $(this.elem).html($(this.editTemplate).render(this.cloneAddr));
                $(".addressList", this.elem).html($(listTemplate).render(this.addresses, {currentId:this.cloneAddr.id}));
                $(".addressList input", this.elem).bind("change", function () {
                    var selectedAddressId = $(".addressList input:checked", that.elem).val();
                    for (var i = 0; i < that.addresses.length; i++) {
                        var address = that.addresses[i];
                        if (address.id === selectedAddressId) {
                            that.addr = address;
                            that.cloneAddr = clone(that.addr);
                            break;
                        }
                    }
                    that.show();

                });

                var e = $(".region", this.elem);
                this.addressSelector = new $.TreeSelector(e, "/tools/selectColumnEx.jsp", "c_region_1602", this.cloneAddr.regionIds);

                this.addressSelector.addChangeListener(function (selector) {
                    that.cloneAddr.regionName = selector.getSelectedRegionFullName();
                    //that.mode = "show";
                    //that.show();
                    $(".regionName",that.elem).html(that.cloneAddr.regionName);
                });

                this.addressSelector.loadValues();
                $(".cancelEdit", this.elem).click(function () {
                        if(that.addr != undefined && that.addr != null){
                            that.mode = "show";
                            that.cloneAddr = clone(that.addr);
                            that.show();
                        }
                    }
                );
                $(".save", this.elem).click(function () {
                    that.saveAddress();
                });
                $(".saveNew", this.elem).click(function () {
                    that.saveNewAddress();
                });

                $("a.delete",this.elem).click(function(){
                    var addrId = $(this).attr("addrid");
                    that.remove(addrId);
                });

            }
            else {
                $(this.elem).html($(this.showTemplate).render(this.addr));
                $(".edit", this.elem).click(function () {
                        that.cloneAddr = clone(that.addr);
                        that.mode = "edit";
                        that.show();
                    }
                );
            }
        }

        this.remove = function(addrId){
            var that = this;
            for(var i=0; i<this.addresses.length;i++){
                var addr = this.addresses[i];
                if(addr.id===addrId){
                    this.addresses.splice(i,1);
                    break;
                }
            }
            $.post(this.deleteUrl,{addrId:addrId,mode:'of'},function(data){
                if(data.state==='ok'){
                    that.show();
                }
                else{
                    alert("服务器出现异常,返回了错误：" + data.msg);
                }
            },"json")
            this.show();

        }
        this.saveAddress = function () {
            var that = this;
            var e = that.elem;
            var userName = $(".userName", e).val();
            var detailAddress = $(".detailAddress",e).val();
            var mobile = $(".mobile", e).val();
            var phone = $(".phone", e).val();
            var postalCode = $(".postalCode", e).val();
            var regionId = that.addressSelector.getSelectedRegion();

            var focusObj = null;
            if(userName == ""){
                var obj = $(".userName", e);
                obj.next(".subtips").css("color","red").html("&nbsp;请填写收货人姓名！");
                if(focusObj == null){
                    focusObj = obj;
                }
                return false;
            }

            if(!that.addressSelector.isLast()){
                var obj = $(".region", e);
                obj.next(".subtips").css("color","red").html("&nbsp;请正确选择地区！");
                return false;
            }

            if(detailAddress == ""){
                var obj = $(".detailAddress", e);
                obj.next(".subtips").css("color","red").html("&nbsp;请填写收货地址！");
                if(focusObj == null){
                    focusObj = obj;
                }
                return false;
            }

            if(postalCode != "" && (isNaN(postalCode) || postalCode.length != 6)){
                var obj = $(".postalCode", e);
                obj.next(".subtips").css("color","red").html("&nbsp;邮政编码应该是6位数字！");
                return false;
            }

            var mobileObj = $(".mobile", e);
            var phoneObj = $(".phone", e);
            if(mobile == "" && phone == ""){
                $(".phone", e).next(".subtips").css("color","red").html("&nbsp;固话与手机至少填写一项！");
                return false;
            }
            if(phone != ""){
                if(!/^(\d{3,4}-)?\d{7,8}$/.exec(phone)){
                    $(".phone", e).next(".subtips").css("color","red").html("&nbsp;请输入正确格式的电话号码，如：123-12346578");
                    return false;

                }
            }
            if(mobile!=""){
                if(!/^([0-9]{11})$/.exec(mobile)){
                    $(".mobile", e).next(".subtips").css("color","red").html("&nbsp;请正确输入11位的手机号码 ！");
                    return false;
                }
            }
            that.cloneAddr.userName = userName;
            that.cloneAddr.address = detailAddress;
            that.cloneAddr.mobile = mobile;
            that.cloneAddr.phone = phone;
            that.cloneAddr.postalCode = postalCode;
            that.cloneAddr.regionName = that.addressSelector.getSelectedRegionFullName();
            that.cloneAddr.regionId = regionId;
            //that.addr = clone(that.cloneAddr);
            $.post(this.saveUrl, {"addr":JSON.stringify(this.cloneAddr),mode:'of'}, function (data) {
                if (data.state === 'ok') {
                    var found = false;

                    that.cloneAddr["id"] = data.newId;
                    that.addr = that.cloneAddr;
                    if(data["regionIds"]){
                        that.addr["regionIds"] = data["regionIds"];
                    }
                    for (var i = 0; i < that.addresses.length; i++) {
                        var address = that.addresses[i];
                        if (address.id === that.addr.id) {
                            that.addresses[i] = that.addr;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        that.addresses.push(that.addr);
                    }
                    that.cloneAddr = clone(that.addr);
                    that.mode = "show";
                    that.show();
                    that.fireAddressChange();
                }
                else {
                    alert("服务器出现异常，返回的错误信息：" + data.msg);
                }
            }, 'json');
        }
        this.saveNewAddress = function () {
            this.cloneAddr["id"] = "";
            this.saveAddress();
        }
    }
    $.AddressEditor = AddressEditor;
})(jQuery);
