var AddressApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.appmarket,
    net.xinshi.isone.commons,
    Packages.org.json
);

/**
 * 一个地址
 * @constructor
 */
function Address(){
    /**
     * 地址id，内部的
     * @member
     * @type {string}
     */
    this.id = "";
    /**
     * 手机
     * @member
     * @type {string}
     */
    this.mobile = "";
    /**
     * @member
     * @type {string}
     */
    this.userName = "";
    /**
     * @member
     * @type {string}
     */
    this.address = "";
    /**
     * @member
     * @type {string}
     */
    this.regionId="";
}

/**
 * 与配送地址有关的函数,主要处理用户的地址本
 *  地址本的格式为；<br>
 * @namespace
 * @type {{RootRegion: string, getAllAddresses: getAllAddresses, getDefaultAddress: getDefaultAddress, saveAddress: saveAddress, getAddressById: getAddressById, setSelectedDeliveryRuleId: setSelectedDeliveryRuleId}}
 * @example
 * {
 *         id:"addr_1111",
 *         mobile:'13826163601',
 *         userName:'郑向阳',    //联系人
 *         address:'配送地址',
 *        regionId:'c_10003'   // 配送地区Id
 * }
 */
var AddressService = {
    /**
     * @constant
     */
    RootRegion:"col_region",
    /**
     * 返回一个用户所有地址本，返回一个{@link Address}数组
     * @param userId
     * @return {Array}
     * 返回 {@link Address} 数组
     */
    getAllAddresses : function(userId){
       var jDeliveryAddress =[]
		try{
			jDeliveryAddress= AddressApi.IsoneModulesEngine.deliveryAddressService.getDeliveryAddress(userId);
		}catch(error){
			return jDeliveryAddress;
		}
        if(!jDeliveryAddress){
            return [];
        }
        var oTemp = JSON.parse("" + jDeliveryAddress.toString());
        var addressList = [];
        for( var k in oTemp){
            var  address = oTemp[k];
            if(typeof address !== 'string'){
                for(var i in address){
                    var a = address[i];
                    addressList.push(a);
                }
            }
        }
        addressList.sort(function(addr1,addr2){
            if(addr1.id>addr2.id){ return 1};
            if(addr1.id==addr2.id){return 0};
            if(addr1.id<addr2.id){return -1};
        });
        return addressList;
    },
    /**
     * 返回用户默认的地址本,就是默认的配送地址,{@link Address}
     * @param userId
     * @return {Address}
     */
    getDefaultAddress:function(userId){
        var addr = AddressApi.IsoneModulesEngine.deliveryAddressService.getDefaultAddress(userId);
        if(!addr){
            return null;
        }
        return JSON.parse(addr.toString());
    },

    setDefaultAddress:function(userId,addressId){
        AddressApi.IsoneModulesEngine.deliveryAddressService.setAsDefaultAddress(userId,addressId);
    },

    /**
     * 保存地址本,如果address.id不为空，则修改于address.id对应的地址，否则新增一个新的地址
     * @param userId
     * @param address
     * @return {String}
     * 返回新地址的id
     */
    saveAddress: function(userId,address){
        return "" + AddressApi.IsoneModulesEngine.deliveryAddressService.saveAddress(userId,new AddressApi.JSONObject(JSON.stringify(address)));
    },


    deleteAddress:function(userId,addressId){
        AddressApi.IsoneModulesEngine.deliveryAddressService.deleteAddress(userId,addressId);
    },

    /**
     * 返回用户的其中一个地址
     * @param userId
     * @param addrId
     * @returns {*}
     */
    getAddressById : function(userId,addrId){
        var jaddr = AddressApi.IsoneModulesEngine.deliveryAddressService.getAddress(userId,addrId);
        if(jaddr==null){
            return null;
        }
        return JSON.parse(jaddr.toString());
    },

    /**
     * 设置用户对这个地址选择的配送方式以及自提点
     * @param userId
     * @param addressId
     * @param merchantId
     * @param ruleId
     * @param selectedDeliveryPointId
     */
    setSelectedDeliveryRuleId : function(userId,addressId,merchantId,ruleId,selectedDeliveryPointId){
        var address = AddressService.getAddressById(userId,addressId);
        if(address){
            if(!address.selectedDeliveryRuleIds){
                address.selectedDeliveryRuleIds = {};
            }
            if(!address.selectedDeliveryPointIds){
                address.selectedDeliveryPointIds = {};
            }
            address.selectedDeliveryRuleId = ruleId;
            address.selectedDeliveryRuleIds[merchantId] = ruleId;
            address.selectedDeliveryPointId = selectedDeliveryPointId;
            address.selectedDeliveryPointIds[merchantId] = selectedDeliveryPointId;
            AddressService.saveAddress(userId,address);
        }

    },

    /**
     * 设置用户对这个地址选择的配送时间
     * @param userId
     * @param addressId
     * @param deliveryTimeId
     */
    setSelectedDeliveryTimeId : function(userId,addressId,deliveryTimeId){
        var address = AddressService.getAddressById(userId,addressId);
        if(address && deliveryTimeId){
            address.selectedDeliveryTime = deliveryTimeId;
            AddressService.saveAddress(userId,address);
        }
    }

};

