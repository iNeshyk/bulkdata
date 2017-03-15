'use strict';

const schema = require('../lib/mssql/schema.js');
const config  = require('../config/swagger.json');
const Promise = require('promise');
module.exports = {
  getWaybills: (userID , id, limit) => {
    if (!limit) {
      limit = '100';
    }
    let where = '';
    if (id) {
      where = ` WHERE EntryGUID IN (${id}) `;
    }

    let q = `SELECT TOP ${limit} * FROM t010_Bulkdata AS BD ${where}
    INNER JOIN t005_UserData AS UD
    ON BD.EntryGUID = UD.EntryGUID
    AND UD.UserID = ${userID}
    AND UD.Active = 1`;
    //console.log(q);
    return q;
  },

  addWaybills: (waybills, hashBody) => {

    var set  = [];
    var cols = [];
    var vals = [];
    var required = config.definitions.Waybill.required;

    //create JSON {UserID, EntryGuid, Active}
    let q1 = `declare @json1 nvarchar(max) = N'${JSON.stringify(hashBody)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID as UserID,
      jt.EntryGUID as EntryGUID,
      1 as Active
    FROM OPENJSON(@json1) WITH (EntryGUID char(36), Sha1KeyValue varchar(50)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON jt.Sha1KeyValue = uc.Sha1KeyValue
      AND uc.Active = 1
    GROUP BY
      uc.UserID,
      jt.EntryGUID; `;
    required.forEach(function(field){
      set.push(`A.${field} = B.${field}`);
      cols.push(field);
      vals.push(`B.${field}`);
    });

    schema.t010_Bulkdata_fields().forEach(
      function(field){
        set.push(`A.${field} = B.${field}`);
        cols.push(field)
        vals.push(`B.${field}`);
      }
    );

    let q2=`declare @json2 nvarchar(max) = '${JSON.stringify(waybills)}'
      MERGE INTO t010_Bulkdata AS A
      USING (
         SELECT *
      FROM OPENJSON(@json2) WITH (${schema.t010_Bulkdata()})) B
      ON (A.EntryGUID = B.EntryGUID)
     WHEN MATCHED THEN
         UPDATE SET ${set.join(' , ')}
     WHEN NOT MATCHED THEN
         INSERT (${cols.join(',')}) VALUES (${vals.join(',')});`;
      let q = q1+'\n  \n'+q2;
      //console.log(q);
      return q;

  },
  patchWaybills: (userID, waybills) => {
    let q = `declare @json nvarchar(max) = '${JSON.stringify(waybills)}'
      UPDATE t005_UserData
        SET Active = 0 FROM OPENJSON(@json)
          WITH (EntryGUID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.EntryGUID
          AND t005_UserData.UserID = ${userID}`;
    return q;
  },
  NOTUSED_getUsersEntryGuides: (userID) => {
      let q = `SELECT EntryGUID FROM t005_UserData WHERE UserID = ${userID} AND Active = 1`;
      return q;
  },
  NOTUSED_getUsersConfig: () => {
    let q = `SELECT Sha1KeyValue FROM t003_UserConfig WHERE Active = 1`;
    return q;
  }
}
