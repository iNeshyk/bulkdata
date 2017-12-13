'use strict';

const schema = require('../lib/mssql/schema.js');
const config  = require('../config/swagger.json');
const Promise = require('promise');

//_TODO: change to most effective function
function replacer(key, value){
  if(typeof value == "string"){
    value = value.replace("'","");
    value = value.replace("'","");
    value = value.replace("'","");
    value = value.replace("`","");
    value = value.replace("`","");
  }
  return value;
}
//END_TODO: change to most effective function

// function getSubscriptionTrigger(triggerType){
//   //subscrition trigger v 2.0
//   `MERGE INTO t005_UserData AS A
//   USING(
//   SELECT
//     uc.UserID AS UserID,
//     jt.EntryGUID AS EntryGUID,
//     1 AS Active,
//     '${triggerType}' AS RecordType
//   FROM OPENJSON(@json1) WITH (EntryGUID char(36), Sha1KeyValue varchar(50)) AS jt
//     INNER JOIN t003_UserConfig AS uc
//     ON jt.Sha1KeyValue = uc.Sha1KeyValue
//     AND uc.Active = 1
//     AND uc.RecordType = '${triggerType}'
//   GROUP BY
//     uc.UserID,
//     jt.EntryGUID) B
//     ON (A.EntryGUID = B.EntryGUID AND A.UserID = B.UserID AND B.RecordType = '${triggerType}')
//   WHEN MATCHED THEN
//     UPDATE SET (????)
//   WHEN NOT MATCHED THEN
//     INSERT (????)
//      `;
// }

module.exports = {
  getWaybills: (userID , id, limit) => {
    if (!limit) {
      limit = '1000';
    }
    let where = '';
    if (id) {
      where = ` WHERE BD.EntryGUID IN (${id}) `;
    }

    let q = `SELECT DISTINCT TOP ${limit} * FROM t010_Bulkdata AS BD
    INNER JOIN t005_UserData AS UD
    ON BD.EntryGUID = UD.EntryGUID
    AND UD.UserID = '${userID}'
    AND UD.Active = 1
    AND UD.RecordType = 'W'
    ${where}`;
    //console.log(q);
    return q;
  },

  addWaybills: (waybills, hashBody) => {

    var set  = [];
    var cols = [];
    var vals = [];

    //subscrition trigger v 1.0
    //create JSON {UserID, EntryGuid, Active}
    let q1 = `declare @json1 nvarchar(max) = N'${JSON.stringify(hashBody, replacer)}'
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

    let q2=`declare @json2 nvarchar(max) = '${JSON.stringify(waybills, replacer)}'
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
    let q = `declare @json nvarchar(max) = '${JSON.stringify(waybills,replacer)}'
      UPDATE t005_UserData
        SET Active = 0 FROM OPENJSON(@json)
          WITH (EntryGUID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.EntryGUID
          AND t005_UserData.RecordType = 'W'
          AND t005_UserData.UserID = '${userID}'`;
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
  getLabAnalysis: (userID , id, limit) => {
    if (!limit) {
      limit = '100';
    }
    let where = '';
    if (id) {
      where = ` WHERE BD.FormID IN (${id}) `;
    }

    let q = `SELECT DISTINCT TOP ${limit} BD.* FROM t015_LabAnalysis AS BD
    INNER JOIN t005_UserData AS UD
      ON BD.FormID = UD.EntryGUID
      AND UD.UserID = '${userID}'
      AND UD.Active = 1
      AND UD.RecordType = 'L'
      ${where}`;
    //console.log(q);
    return q;
  },
  getLabAnalysisLines:(FormID) =>{
    let where = ` WHERE BD.FormID IN (${FormID}) `;
    let q = `SELECT BD.* FROM t020_LabAnalysisLines AS BD
            ${where}`;
    console.log(q);
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
    SELECT DISTINCT
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

    let q2=`declare @json2 nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
      MERGE INTO t015_LabAnalysis AS A
      USING (
         SELECT DISTINCT *
      FROM OPENJSON(@json2) WITH (${schema.t015_LabAnalysis()})) B
      ON (A.FormID = B.FormID AND A.TransportShipmentID = B.TransportShipmentID)
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
            CROSS APPLY OPENJSON(Qualities) WITH(${schema.t020_LabAnalysisLines()}) AS LabAnalysisLines
            GROUP BY
                  LabAnalysis.FormID,
                  LabAnalysisLines.FormID,
                  LabAnalysisLines.AnalisysCode,
                  LabAnalysisLines.AnalisysName,
                  LabAnalysisLines.ValueType,
                  LabAnalysisLines.UOM,
                  LabAnalysisLines.Value,
                  LabAnalysisLines.Value2,
                  LabAnalysisLines.ParentAnalisysCode,
                  LabAnalysisLines.Inclusion,
                  LabAnalysisLines.ShowinLabes) B
           ON (A.FormID = B.FormID AND A.AnalisysCode = B.AnalisysCode)

          WHEN MATCHED THEN
              UPDATE SET ${setLines.join(' , ')}
          WHEN NOT MATCHED THEN
              INSERT (${colsLines.join(',')}) VALUES (${valsLines.join(',')});`;

    let q = q1+'\n  \n'+q2+'\n  \n'+q3 ;
    //let q = q1+'\n  \n'+q2;
    //console.log(q3);
    return q;

  },
  patchLabAnalysis: (userID, labAnalysis) => {
    let q = `declare @json nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
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
  addTrackEvents: (truckEvents) => {

    var set  = [];
    var cols = [];
    var vals = [];

    schema.t025_TrackEvents_fields().forEach(
      function(field){
        set.push(`A.${field} = B.${field}`);
        cols.push(field)
        vals.push(`B.${field}`);
      }
    );
    //subscrition trigger v 1.0
    //create JSON {UserID, EntryGuid, Active}
    let q1=`declare @json2 nvarchar(max) = '${JSON.stringify(truckEvents, replacer)}'
      MERGE INTO t025_TrackEvents AS A
      USING (
         SELECT *
      FROM OPENJSON(@json2) WITH (${schema.t025_TrackEvents()})) B
      ON (A.EventID = B.EventID AND A.EntryGUID = B.EntryGUID AND A.Date = B.Date)
     WHEN MATCHED THEN
         UPDATE SET ${set.join(' , ')}
     WHEN NOT MATCHED THEN
         INSERT (${cols.join(',')}) VALUES (${vals.join(',')});`;
      //console.log(q1);
      return q1;
  },
  getTrackEvents:(EntryGUID) =>{
    let where = ` WHERE BD.EntryGUID IN (${EntryGUID}) `;
    let q = `SELECT BD.* FROM t025_TrackEvents AS BD
            ${where}`;
    return q;
  },
}
