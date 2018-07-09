'use strict';

const schema = require('../lib/mssql/schema.js');

//_TODO: change to most effective function
function replacer(key, value){
  if(typeof value === "string"){
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
  waybill_subscribe:(userID,waybills)=>{

    let q = `declare @json nvarchar(max) = '${JSON.stringify(waybills,replacer)}'
      UPDATE t005_UserData
        SET Active = 1, Locked = 0 FROM OPENJSON(@json)
          WITH (EntryGUID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.EntryGUID
          AND t005_UserData.RecordType = 'W'
          AND t005_UserData.UserID = '${userID}'`

    return q;

  },
  labAnalys_subscribe:(userID,labAnalysis)=>{

    let q = `declare @json nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
      UPDATE t005_UserData
        SET Active = 0, Locked = 1 FROM OPENJSON(@json)
          WITH (FormID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.FormID
          AND t005_UserData.RecordType = 'L'
          AND t005_UserData.UserID = '${userID}'`;

    return q;

  },
  discard:(userID)=>{
      let q_discard = `UPDATE t005_UserData
               SET Active = 0
               WHERE UserID = '${userID}'; `;

      return q_discard;
  },
  getWaybills: (userID , id, limit) => {
    if (!limit) {
      limit = '1000';
    }
    let where = '';
    if (id) {
      where = ` WHERE BD.EntryGUID IN (${id}) `;
    }

    let q_getWaybills = `SELECT DISTINCT TOP ${limit} BD.* FROM t010_Bulkdata AS BD
    INNER JOIN t005_UserData AS UD
    ON BD.EntryGUID = UD.EntryGUID
    AND UD.UserID = '${userID}'
    AND UD.Active = 1
    AND UD.RecordType = 'W'
    ${where} ORDER By BD.EntryInsertDate;`;

    let q_setLockedUserData = `UPDATE t005_UserData SET Locked = 1
    WHERE UserID = '${userID}'
          AND Active = 1
          AND RecordType = 'W' AND EntryGUID IN (SELECT TOP ${limit} BD.EntryGUID FROM t010_Bulkdata AS BD
          INNER JOIN t005_UserData AS UD
          ON BD.EntryGUID = UD.EntryGUID
          AND UD.UserID = '${userID}'
          AND UD.Active = 1
          AND UD.RecordType = 'W'
          ${where} ORDER BY BD.EntryInsertDate);`
    // console.log(q_setLockedUserData);
    return q_setLockedUserData+'\n  \n'+q_getWaybills;
    // return q_setLockedUserData
  },
  addWaybills: (UserID, waybills, hashBody) => {

    let set  = [];
    let cols = [];
    let vals = [];


    //create JSON {UserID, EntryGuid, Active}
    let q1_addWaybills = `declare @json1 nvarchar(max) = N'${JSON.stringify(hashBody, replacer)}'
     INSERT INTO t005_UserData
     SELECT
       uc.UserID AS UserID,
       jt.EntryGUID AS EntryGUID,
       1 AS Active,
       'W' AS RecordType,
       jt.Sha1Hash AS Sha1Hash,
       0 AS Locked
     FROM OPENJSON(@json1) WITH (EntryGUID char(36), Sha1KeyValue varchar(50), Sha1Hash nvarchar(256)) AS jt
       INNER JOIN t003_UserConfig AS uc
       ON jt.Sha1KeyValue = uc.Sha1KeyValue
       AND uc.Active = 1
       AND uc.RecordType = 'W'
     WHERE uc.UserID <> '${UserID}'
     GROUP BY
       uc.UserID,
       jt.EntryGUID,
       jt.Sha1Hash; `;

    schema.t010_Bulkdata_fields().forEach(
      function(field){
        set.push(`A.${field} = B.${field}`);
        cols.push(field);
        vals.push(`B.${field}`);
      }
    );

    let q2_addWaybills =`declare @json2 nvarchar(max) = '${JSON.stringify(waybills, replacer)}'
      MERGE INTO t010_Bulkdata AS A
      USING (
         SELECT *
      FROM OPENJSON(@json2) WITH (${schema.t010_Bulkdata()})) B
      ON (A.EntryGUID = B.EntryGUID)
     WHEN MATCHED THEN
         UPDATE SET ${set.join(' , ')}
     WHEN NOT MATCHED THEN
         INSERT (${cols.join(',')}) VALUES (${vals.join(',')});`;
      let q_addWaybills = q1_addWaybills+'\n  \n'+q2_addWaybills;
      // console.log(q_addWaybills);
      return q_addWaybills;

  },
  patchWaybills: (userID, waybills) => {
    let q_patchWaybills = `declare @json nvarchar(max) = '${JSON.stringify(waybills,replacer)}'
      UPDATE t005_UserData
        SET Active = 0 FROM OPENJSON(@json)
          WITH (EntryGUID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.EntryGUID
          AND t005_UserData.RecordType = 'W'
          AND t005_UserData.UserID = '${userID}'
          AND t005_UserData.Locked = 1`;
    return q_patchWaybills;
  },
  delWaybills: (waybills) => {
    let q1_delWaybills = `declare @json1 nvarchar(max) = N'${JSON.stringify(waybills)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID AS UserID,
      jt.EntryGUID AS EntryGUID,
      1 AS Active,
      'W' AS RecordType,
      '0' AS Sha1Hash,
      0 AS Locked
    FROM OPENJSON(@json1) WITH (EntryGUID char(36)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON uc.Active = 1
      AND uc.RecordType = 'W'
    GROUP BY
      uc.UserID,
      jt.EntryGUID; `;
    let q2_delWaybills = `declare @json2 nvarchar(max) = '${JSON.stringify(waybills)}'
      UPDATE t010_Bulkdata
        SET Active = 0 FROM OPENJSON(@json2)
          WITH (EntryGUID char(36)) AS jt
        WHERE
          t010_Bulkdata.EntryGUID = jt.EntryGUID`;

    let q_delWaybills = q1_delWaybills+'\n  \n'+q2_delWaybills;
    return q_delWaybills;
  },
  getLabAnalysis: (userID , id, limit) => {
    if (!limit) {
      limit = '200';
    }
    let where = '';
    if (id) {
      where = ` WHERE BD.FormID IN (${id}) `;
    }
    let q_tempquery = `
    SELECT DISTINCT TOP ${limit} BD.*
    INTO #tempLA_${userID}
    FROM t015_LabAnalysis AS BD
    INNER JOIN t005_UserData AS UD
      ON BD.FormID = UD.EntryGUID
      AND UD.UserID = '${userID}'
      AND UD.Active = 1
      AND UD.RecordType = 'L'
      ${where} ORDER BY BD.EntryInsertDate;`;

    let q_setLockedUserData_LabAnalysis = `
    UPDATE t005_UserData SET Locked = 1
    WHERE UserID = '${userID}'
          AND Active = 1
          AND RecordType = 'L' AND EntryGUID IN (SELECT T.FormID FROM #tempLA_${userID} AS T);`;

    let q_getLabAnalysis = `SELECT * FROM #tempLA_${userID};`;

    let q_destroy = `DROP TABLE #tempLA_${userID};`;

    return q_tempquery+'\n  \n'+q_setLockedUserData_LabAnalysis+'\n  \n'+q_getLabAnalysis+'\n  \n'+q_destroy;
  },
  getLabAnalysisLines:(FormID) =>{
    let where = ` WHERE BD.FormID IN (${FormID}) `;
    let q_getLabAnalysisLines = `SELECT BD.* FROM t020_LabAnalysisLines AS BD
            ${where}`;

    return q_getLabAnalysisLines;
  },
  addLabAnalysis: (sourceID, labAnalysis, hashBody) => {

    let set  = [];
    let cols = [];
    let vals = [];

    let setLines  = [];
    let colsLines = [];
    let valsLines = [];

    //create JSON {UserID, EntryGuid, Active}
    let q1_addLabAnalysis = `declare @json1 nvarchar(max) = N'${JSON.stringify(hashBody)}'
    INSERT INTO t005_UserData
    SELECT DISTINCT
      uc.UserID AS UserID,
      jt.EntryGUID AS EntryGUID,
      1 AS Active,
      'L' AS RecordType,
      jt.Sha1Hash AS Sha1Hash,
      0 AS Locked
    FROM OPENJSON(@json1) WITH (EntryGUID char(36), Sha1KeyValue varchar(50),Sha1Hash nvarchar(256)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON jt.Sha1KeyValue = uc.Sha1KeyValue
      AND uc.Active = 1
      AND uc.RecordType = 'L'
    WHERE uc.UserID<>'${sourceID}'
    GROUP BY
      uc.UserID,
      jt.EntryGUID,
      jt.Sha1Hash; `;

    schema.t015_LabAnalysis_fields().forEach(
      function(field){
        set.push(`A.${field} = B.${field}`);
        cols.push(field);
        vals.push(`B.${field}`);
      }
    );

    let q2_addLabAnalysis =`declare @json2 nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
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
             colsLines.push(field);
             valsLines.push(`B.${field}`);
           }
         );

    let q3_addLabAnalysis =`  MERGE INTO t020_LabAnalysisLines AS A
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
                  LabAnalysisLines.ContractorValue,
                  LabAnalysisLines.ParentAnalisysCode,
                  LabAnalysisLines.Inclusion,
                  LabAnalysisLines.ShowinLabes) B
           ON (A.FormID = B.FormID AND A.AnalisysCode = B.AnalisysCode)

          WHEN MATCHED THEN
              UPDATE SET ${setLines.join(' , ')}
          WHEN NOT MATCHED THEN
              INSERT (${colsLines.join(',')}) VALUES (${valsLines.join(',')});`;

    let q_addLabAnalysis = q1_addLabAnalysis+'\n  \n'+q2_addLabAnalysis+'\n  \n'+q3_addLabAnalysis;
    //let q_addLabAnalysis = q1_addLabAnalysis+'\n  \n'+q2_addLabAnalysis;
    // console.log(q_addLabAnalysis);
    return q_addLabAnalysis;

  },
  patchLabAnalysis: (userID, labAnalysis) => {
    let q_patchLabAnalysis = `declare @json nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
      UPDATE t005_UserData
        SET Active = 0 FROM OPENJSON(@json)
          WITH (FormID char(36)) AS jt
        WHERE
          t005_UserData.EntryGUID = jt.FormID
          AND t005_UserData.RecordType = 'L'
          AND t005_UserData.UserID = '${userID}'
          AND t005_UserData.Locked = 1`;
    // let q_patchLabAnalysis2 = `declare @json nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
    //         UPDATE t005_UserData
    //           SET Active = 0 FROM OPENJSON(@json)
    //             WITH (FormID char(36)) AS jt
    //           WHERE
    //             t005_UserData.EntryGUID = jt.FormID
    //             AND t005_UserData.RecordType = 'L'
    //             AND t005_UserData.UserID = '${userID}'
    //             AND t005_UserData.Locked = 1`;

    // let q_UsersRequestLog = `declare @json2 nvarchar(max) = '${JSON.stringify(labAnalysis,replacer)}'
    // INSERT INTO t903_UsersRequestLog (UserID, InsertDate, QueryBody)
    // VALUES('${userID}',
    // GETDATE(),
    // @json2)`;

    // console.log(q_UsersRequestLog);
    return q_patchLabAnalysis;

  },
  delLabAnalysis: (labAnalysis) => {
    let q1_delLabAnalysis = `declare @json1 nvarchar(max) = N'${JSON.stringify(labAnalysis)}'
    INSERT INTO t005_UserData
    SELECT
      uc.UserID AS UserID,
      jt.FormID AS EntryGUID,
      1 AS Active,
      'L' AS RecordType,
      '0' AS Sha1Hash,
      0 AS Locked
    FROM OPENJSON(@json1) WITH (FormID char(36)) AS jt
      INNER JOIN t003_UserConfig AS uc
      ON uc.Active = 1
      AND uc.RecordType = 'L'
    GROUP BY
      uc.UserID,
      jt.FormID; `;
    let q2_delLabAnalysis = `UPDATE t015_LabAnalysis
        SET Active = 0 FROM OPENJSON(@json1)
          WITH (FormID char(36)) AS jt
        WHERE
          t015_LabAnalysis.FormID = jt.FormID`;

    let q_delLabAnalysis = q1_delLabAnalysis+'\n  \n'+q2_delLabAnalysis;

    return q_delLabAnalysis;
  },
  addTrackEvents: (truckEvents) => {

    let set  = [];
    let cols = [];
    let vals = [];

    schema.t025_TrackEvents_fields().forEach(
      function(field){
        set.push(`A.${field} = B.${field}`);
        cols.push(field);
        vals.push(`B.${field}`);
      }
    );
    //subscrition trigger v 1.0
    //create JSON {UserID, EntryGuid, Active}
    let q1_addTrackEvents=`declare @json2 nvarchar(max) = '${JSON.stringify(truckEvents, replacer)}'
      MERGE INTO t025_TrackEvents AS A
      USING (
         SELECT *
      FROM OPENJSON(@json2) WITH (${schema.t025_TrackEvents()})) B
      ON (A.EventID = B.EventID AND A.EntryGUID = B.EntryGUID AND A.Date = B.Date)
     WHEN MATCHED THEN
         UPDATE SET ${set.join(' , ')}
     WHEN NOT MATCHED THEN
         INSERT (${cols.join(',')}) VALUES (${vals.join(',')});`;

     return q1_addTrackEvents;
  },
  getTrackEvents:(EntryGUID) =>{
    let where = '';
    if (EntryGUID){
      where = ` WHERE BD.EntryGUID IN (${EntryGUID}) `;
    } else {
      where = ` WHERE BD.EntryGUID = '0000-0000000-0000000' `;
    }
    let q_getTrackEvents = `SELECT BD.* FROM t025_TrackEvents AS BD
            ${where}`;
    return q_getTrackEvents;
  },
};
