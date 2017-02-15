'use strict';

const shchema = require('../lib/mssql/schema.js');
const config = require('../config/swagger.json');

module.exports = {
  getWaybills: (id, limit) => {
    if (!limit) {
      limit = '100';
    }
    let where = '';
    if (id) {
      where = ` WHERE EntryGUID IN (${id}) `;
    }

    let q = `SELECT TOP ${limit} * FROM t010_Bulkdata ${where} `;
    console.log(q);
    return q;
  },

  addWaybills: (waybills) => {

    let set  = [];
    let cols = [];
    let vals = [];
    let required = config.definitions.Waybill.required;
    required.forEach(function(field){
      set.push(`A.${field} = B.${field}`);
      cols.push(field)
      vals.push(`B.${field}`);
    });

    let q=`declare @json nvarchar(max) = '${JSON.stringify(waybills)}'
      MERGE INTO t010_Bulkdata AS A
      USING (
         SELECT *
      FROM OPENJSON(@json) WITH (${shchema.t010_Bulkdata()})) B
      ON (A.EntryGUID = B.EntryGUID)
     WHEN MATCHED THEN
         UPDATE SET ${set.join(' , ')}
     WHEN NOT MATCHED THEN
         INSERT (${cols.join(',')}) VALUES (${vals.join(',')});`;
      console.log(q);
      return q;

  }
}
