'use strict';
let customSubscribe = [];
module.exports = {

    getCustomSubscribe: ()=> {

        let s_OwnerTypeEntryType = ["OwnerType","EntryType"];
        customSubscribe.push(s_OwnerTypeEntryType);
        return customSubscribe;
    }

};

