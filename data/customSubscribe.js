'use strict';
let customSubscribe = [];
module.exports = {

    getCustomSubscribe: ()=> {

        let s_OwnerTypeEntryType = ["OwnerType","EntryType"];
        customSubscribe.push(s_OwnerTypeEntryType);
        let s_OwnerTypeConsigneeTypePostedActive = ["OwnerType", "ConsigneeType", "Posted", "Active"];
        customSubscribe.push(s_OwnerTypeConsigneeTypePostedActive);

        return customSubscribe;
    }

};
