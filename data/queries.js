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

    let q = `SELECT DISTINCT TOP ${limit} * FROM t010_Bulkdata AS BD ${where}
    INNER JOIN t005_UserData AS UD
    ON BD.EntryGUID = UD.EntryGUID
    AND UD.UserID = '${userID}'
    AND UD.Active = 1
    AND UD.RecordType = 'W'`;
    //console.log(q);
    return q;
  },

  addWaybills: (waybills, hashBody) => {

    var set  = [];
    var cols = [];
    var vals = [];

    //create JSON {UserID, EntryGuid, Active}
    let q1 = `declare @json1 nvarchar(max) = N'${JSON.stringify(hashBody)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID AS UserID,
      jt.EntryGUID AS EntryGUID,
      1 AS Active,
      'W' AS RecordType
    FROM OPENJSON(@json1) WITH (EntryGUID char(36), Sha1KeyValue varchar(50)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON jt.Sha1KeyValue = uc.Sha1KeyValue
      AND uc.Active = 1
      AND uc.RecordType = 'W'
    GROUP BY
      uc.UserID,
      jt.EntryGUID; `;

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
          AND t005_UserData.RecordType = 'W'
          AND t005_UserData.UserID = '${userID}'`;
    return q;
  },
  getLabAnalysis: (userID , id, limit) => {
    if (!limit) {
      limit = '100';
    }
    let where = '';
    if (id) {
      where = ` WHERE FormID IN (${id}) `;
    }

    let q = `SELECT TOP ${limit} * FROM t015_LabAnalysis AS BD ${where}
    INNER JOIN t005_UserData AS UD
    ON BD.FormID = UD.EntryGUID
    AND UD.UserID = '${userID}'
    AND UD.Active = 1
    AND UD.RecordType = 'L'`;
    //console.log(q);
    return q;
  },
  delWaybills: (waybills) => {
    let q1 = `declare @json1 nvarchar(max) = N'${JSON.stringify(waybills)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID AS UserID,
      jt.EntryGUID AS EntryGUID,
      1 AS Active,
      'W' AS RecordType
    FROM OPENJSON(@json1) WITH (EntryGUID char(36)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON uc.Active = 1
      AND uc.RecordType = 'W'
    GROUP BY
      uc.UserID,
      jt.EntryGUID; `;
    let q2 = `declare @json2 nvarchar(max) = '${JSON.stringify(waybills)}'
      UPDATE t010_Bulkdata
        SET Active = 0 FROM OPENJSON(@json2)
          WITH (EntryGUID char(36)) AS jt
        WHERE
          t010_Bulkdata.EntryGUID = jt.EntryGUID`;

    let q = q1+'\n  \n'+q2;
    //console.log(q);
    return q;
  },
  addLabAnalysis: (labAnalysis, hashBody) => {

    var set  = [];
    var cols = [];
    var vals = [];

    var setLines  = [];
    var colsLines = [];
    var valsLines = [];

    //create JSON {UserID, EntryGuid, Active}
    let q1 = `declare @json1 nvarchar(max) = N'${JSON.stringify(hashBody)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID AS UserID,
      jt.EntryGUID AS EntryGUID,
      1 AS Active,
      'L' AS RecordType
    FROM OPENJSON(@json1) WITH (EntryGUID char(36), Sha1KeyValue varchar(50)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON jt.Sha1KeyValue = uc.Sha1KeyValue
      AND uc.Active = 1
      AND uc.RecordType = 'L'
    GROUP BY
      uc.UserID,
      jt.EntryGUID; `;

    schema.t015_LabAnalysis_fields().forEach(
      function(field){
        set.push(`A.${field} = B.${field}`);
        cols.push(field)
        vals.push(`B.${field}`);
      }
    );

    let q2=`declare @json2 nvarchar(max) = '${JSON.stringify(labAnalysis)}'
      MERGE INTO t015_LabAnalysis AS A
      USING (
         SELECT *
      FROM OPENJSON(@json2) WITH (${schema.t015_LabAnalysis()})) B
      ON (A.FormID = B.FormID)
     WHEN MATCHED THEN
         UPDATE SET ${set.join(' , ')}
     WHEN NOT MATCHED THEN
         INSERT (${cols.join(',')}) VALUES (${vals.join(',')});`;

    schema.t020_LabAnalysisLines_fields().forEach(
           function(field){
             setLines.push(`A.${field} = B.${field}`);
             colsLines.push(field)
             valsLines.push(`B.${field}`);
           }
         );

    let q3=`  MERGE INTO t020_LabAnalysisLines AS A
           USING (
              SELECT LabAnalysisLines.*
           FROM OPENJSON(@json2) WITH (FormID nchar(36), Qualities nvarchar(max) AS JSON) AS LabAnalysis
            CROSS APPLY OPENJSON(Qualities) WITH(${schema.t020_LabAnalysisLines()}) AS LabAnalysisLines) B
           ON (A.FormID = B.FormID AND A.AnalisysCode = B.AnalisysCode)
          WHEN MATCHED THEN
              UPDATE SET ${setLines.join(' , ')}
          WHEN NOT MATCHED THEN
              INSERT (${colsLines.join(',')}) VALUES (${valsLines.join(',')});`;

    let q = q1+'\n  \n'+q2+'\n  \n'+q3 ;

    //console.log(q);
    return q;

  },
  patchLabAnalysis: (userID, labAnalysis) => {
    let q = `declare @json nvarchar(max) = '${JSON.stringify(labAnalysis)}'
      UPDATE t005_UserData
        SET Active = 0 FROM OPENJSON(@json)
          WITH (FormID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.FormID
          AND t005_UserData.RecordType = 'L'
          AND t005_UserData.UserID = '${userID}'`;
    return q;
  },
  delLabAnalysis: (labAnalysis) => {
    let q1 = `declare @json1 nvarchar(max) = N'${JSON.stringify(labAnalysis)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID AS UserID,
      jt.FormID AS EntryGUID,
      1 AS Active,
      'L' AS RecordType
    FROM OPENJSON(@json1) WITH (FormID char(36)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON uc.Active = 1
      AND uc.RecordType = 'L'
    GROUP BY
      uc.UserID,
      jt.FormID; `;
    let q2 = `UPDATE t015_LabAnalysis
        SET Active = 0 FROM OPENJSON(@json1)
          WITH (FormID char(36)) AS jt
        WHERE
          t015_LabAnalysis.FormID = jt.FormID`;

    let q = q1+'\n  \n'+q2;
    //console.log(q);
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
