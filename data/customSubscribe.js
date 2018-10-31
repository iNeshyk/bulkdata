'use strict';
let customSubscribe = [];
module.exports = {

    getCustomSubscribe: ()=> {

        let s_OwnerTypeEntryType = ["OwnerType","EntryType"];
        customSubscribe.push(s_OwnerTypeEntryType);
        let s_OwnerTypeConsigneeTypePostedActive = ["OwnerType", "ConsigneeType", "Active", "Posted"];
        customSubscribe.push(s_OwnerTypeConsigneeTypePostedActive);

        return customSubscribe;
    }

};
