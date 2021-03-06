'use strict';
module.exports = {

  t010_Bulkdata: ()=>{

    return ` EntryGUID nvarchar(36)
           ,OwnerEntryGUID nvarchar(36)
           ,EntryType bit
           ,Complex bit
           ,ComplexID nvarchar(36)
           ,Source nvarchar(20)
           ,BarCode nvarchar(13)
           ,NFC nvarchar(12)
           ,RFID nvarchar(100)
           ,VehicleType bit
           ,VehicleTypeID nvarchar(50)
           ,VehicleTypeName nvarchar(100)
           ,VehicleSubTypeID nvarchar(50)
           ,VehicleSubTypeName nvarchar(100)
           ,VehicleID nvarchar(50)
           ,VehicleStateNo nvarchar(20)
           ,TrailerTypeID nvarchar(50)
           ,TrailerTypeName nvarchar(100)
           ,TrailerSubTypeID nvarchar(50)
           ,TrailerSubTypeName nvarchar(100)
           ,TrailerID nvarchar(50)
           ,TrailerStateNo nvarchar(25)
           ,DocumentNumber nvarchar(30)
           ,DocumentDate datetime
           ,WaybillNo nvarchar(15)
           ,WaybillDate datetime
           ,PostingDate datetime
           ,ShipmentDate datetime
           ,OwnerStateName nvarchar(200)
           ,OwnerStateRegCode nvarchar(8)
           ,OwnerType int
           ,ShippingAgentStateName nvarchar(200)
           ,ShippingAgentStateRegCode nvarchar(8)
           ,OrderAgentStateName nvarchar(200)
           ,OrderAgentStateRegCode nvarchar(8)
           ,ConsignorName nvarchar(200)
           ,ConsignorRegCode nvarchar(8)
           ,ConsignorType int
           ,ConsigneeName nvarchar(200)
           ,ConsigneeRegCode nvarchar(8)
           ,ConsigneeType int
           ,ShipmentLocationName nvarchar(200)
           ,ShipmentNAVLocationCode nvarchar(100)
           ,ShipmentLocationAdress nvarchar(400)
           ,DestinationLocationName nvarchar(200)
           ,DestinationNAVLocationCode nvarchar(100)
           ,DestinationLocationAdress nvarchar(400)
           ,ShipmentRWStationCode nvarchar(15)
           ,ShipmentRWStationName nvarchar(200)
           ,DestinationRWStationCode nvarchar(15)
           ,DestinationRWStationName nvarchar(200)
           ,ItemGroupID nvarchar(100)
           ,ItemGroupName nvarchar(100)
           ,ItemID nvarchar(100)
           ,ItemGUID nvarchar(56)
           ,ItemName nvarchar(100)
           ,ItemNavCode nvarchar(100)
           ,GrossWeight int
           ,VehicleWeight int
           ,NetWeight int
           ,ShipmentMethod nvarchar(15)
           ,StandardWeightElevator int
           ,ConsignorGrossWeight int
           ,ConsignorVehicleWeight int
           ,ConsignorWeight int
           ,DriverID	nvarchar(50)
           ,DriverSerial	nvarchar(20)
           ,DriverPhone	nvarchar(13)
           ,DriverName	nvarchar(200)
           ,TruckModel	nvarchar(50)
           ,TruckModelType	nvarchar(50)
           ,TruckVechicleType	nvarchar(50)
           ,Seals	nvarchar(200)
           ,Field1Name	nvarchar(100)
           ,Field1Type	int
           ,Field1Adress	nvarchar(200)
           ,Field1Percent	int
           ,Field1Mositure	nvarchar(10)
           ,Field2Name	nvarchar(100)
           ,Field2Type	int
           ,Field2Adress	nvarchar(200)
           ,Field2Percent	int
           ,Field2Mositure	nvarchar(10)
           ,EntryInsertDate datetime
           ,EntryInsertUserID nvarchar(50)
           ,Posted bit
           ,LastTrackEventID nvarchar(50)
           ,LastTrackEventName nvarchar(100)
           ,LastLon nvarchar(20)
           ,LastLat nvarchar(20)
           ,Departure bit
           ,DepartureDate datetime
           ,Active bit
           ,LocalityInID nvarchar(100)
           ,LocalityInName nvarchar(400)
           ,LocalitySubGroupInID nvarchar(100)
           ,LocalitySubGroupInName nvarchar(400)
           ,LocalityGroupInID nvarchar(100)
           ,LocalityGroupInName nvarchar(400)
           ,LocalityOutID nvarchar(100)
           ,LocalityOutName nvarchar(400)
           ,LocalitySubGroupOutID nvarchar(100)
           ,LocalitySubGroupOutName nvarchar(400)
           ,LocalityGroupOutID nvarchar(100)
           ,LocalityGroupOutName nvarchar(400)
           ,RequestID nvarchar(56)
           ,RequestNumber nvarchar(20)
           ,LastTrackEventDate datetime
           ,Ballance int
           ,Sha1Hash nvarchar(256)
           ,LoadPointName nvarchar(200)
           ,HarvestYear datetime
           ,isContainer bit
           ,ContainerID nvarchar(100)
           ,StorageOrderID nvarchar(50)`;
         },

  t010_Bulkdata_fields: () =>{
          let res = [];
          res.push('EntryGUID');
          res.push('OwnerEntryGUID');
          res.push('EntryType');
          res.push('Complex');
          res.push('ComplexID');
          res.push('Source');
          res.push('NFC');
          res.push('BarCode');
          res.push('RFID');
          res.push('VehicleTypeID');
          res.push('VehicleTypeName');
          res.push('VehicleSubTypeID');
          res.push('VehicleSubTypeName');
          res.push('VehicleType');
          res.push('VehicleID');
          res.push('VehicleStateNo');
          res.push('TrailerTypeID');
          res.push('TrailerTypeName');
          res.push('TrailerSubTypeID');
          res.push('TrailerSubTypeName');
          res.push('TrailerID');
          res.push('TrailerStateNo');
          res.push('DocumentNumber');
          res.push('DocumentDate');
          res.push('WaybillNo');
          res.push('WaybillDate');
          res.push('PostingDate');
          res.push('ShipmentDate');
          res.push('OwnerStateName');
          res.push('OwnerStateRegCode');
          res.push('OwnerType');
          res.push('ShippingAgentStateName');
          res.push('ShippingAgentStateRegCode');
          res.push('OrderAgentStateName');
          res.push('OrderAgentStateRegCode');
          res.push('ConsignorName');
          res.push('ConsignorRegCode');
          res.push('ConsignorType');
          res.push('ConsigneeName');
          res.push('ConsigneeRegCode');
          res.push('ConsigneeType');
          res.push('ShipmentLocationName');
          res.push('ShipmentNAVLocationCode');
          res.push('ShipmentLocationAdress');
          res.push('DestinationLocationName');
          res.push('DestinationNAVLocationCode');
          res.push('DestinationLocationAdress');
          res.push('ShipmentRWStationCode');
          res.push('ShipmentRWStationName');
          res.push('DestinationRWStationCode');
          res.push('DestinationRWStationName');
          res.push('ItemGroupID');
          res.push('ItemGroupName');
          res.push('ItemID');
          res.push('ItemGUID');
          res.push('ItemName');
          res.push('ItemNavCode');
          res.push('GrossWeight');
          res.push('VehicleWeight');
          res.push('NetWeight');
          res.push('ShipmentMethod');
          res.push('StandardWeightElevator');
          res.push('ConsignorGrossWeight');
          res.push('ConsignorVehicleWeight');
          res.push('ConsignorWeight');
          res.push('DriverID');
          res.push('DriverSerial');
          res.push('DriverName');
          res.push('DriverPhone');
          res.push('TruckModel');
          res.push('TruckModelType');
          res.push('TruckVechicleType');
          res.push('Seals');
          res.push('Field1Name');
          res.push('Field1Adress');
          res.push('Field1Type');
          res.push('Field1Percent');
          res.push('Field1Mositure');
          res.push('Field2Name');
          res.push('Field2Type');
          res.push('Field2Adress');
          res.push('Field2Percent');
          res.push('Field2Mositure');
          res.push('EntryInsertDate');
          res.push('EntryInsertUserID');
          res.push('Posted');
          res.push('LastTrackEventID');
          res.push('LastTrackEventName');
          res.push('LastLon');
          res.push('LastLat');
          res.push('Departure');
          res.push('DepartureDate');
          res.push('Active');
          res.push('LocalityInID');
          res.push('LocalityInName');
          res.push('LocalitySubGroupInID');
          res.push('LocalitySubGroupInName');
          res.push('LocalityGroupInID');
          res.push('LocalityGroupInName');
          res.push('LocalityOutID');
          res.push('LocalityOutName');
          res.push('LocalitySubGroupOutID');
          res.push('LocalitySubGroupOutName');
          res.push('LocalityGroupOutID');
          res.push('LocalityGroupOutName');
          res.push('RequestID');
          res.push('RequestNumber');
          res.push('LastTrackEventDate');
          res.push('Ballance');
          res.push('Sha1Hash');
          res.push('LoadPointName');
          res.push('HarvestYear');
          res.push('isContainer');
          res.push('ContainerID');
          res.push('StorageOrderID');


          return res;
        },
   t015_LabAnalysis: ()=>{
          return `FormID nvarchar(36),
                  Type nvarchar(15),
                  EntryType bit,
                  TransportShipmentID nvarchar(36),
                  No nvarchar(20),
                  Date datetime,
                  ScanCode nvarchar(13),
                  HarvestYear datetime,
                  WaybillNo nvarchar(30),
                  WaybillDate datetime,
                  Certificate1No nvarchar(40),
                  Certificate1Date datetime,
                  Certificate2No nvarchar(40),
                  Certificate2Date datetime,
                  Certificate3No nvarchar(40),
                  Certificate3Date datetime,
                  ItemGroupID nvarchar(100),
                  ItemGroupName nvarchar(100),
                  ItemID nvarchar(100),
                  ItemGUID nvarchar(56),
                  ItemName nvarchar(100),
                  ItemNavCode nvarchar(100),
                  LabOperator nvarchar(50),
                  CertificateWeightGMO int,
                  EntryInsertDate datetime,
                  EntryInsertUserID nvarchar(50),
                  Active bit,
                  ConsigneeRegCode nvarchar(15),
                  ConsigneeType int,
                  OwnerStateRegCode nvarchar(8),
                  OwnerType int,
                  ConsignorRegCode nvarchar(15),
                  ConsignorType int,
                  Source nvarchar(10),
                  Posted bit,
                  Sha1Hash nvarchar(256)` ;
               },
   t015_LabAnalysis_fields: ()=> {

          let res = [];
            res.push('FormID');
            res.push('Type');
            res.push('EntryType');
            res.push('TransportShipmentID');
            res.push('No');
            res.push('Date');
            res.push('ScanCode');
            res.push('HarvestYear');
            res.push('WaybillNo');
            res.push('WaybillDate');
            res.push('Certificate1No');
            res.push('Certificate1Date');
            res.push('Certificate2No');
            res.push('Certificate2Date');
            res.push('Certificate3No');
            res.push('Certificate3Date');
            res.push('ItemGroupID');
            res.push('ItemGroupName');
            res.push('ItemID');
            res.push('ItemGUID');
            res.push('ItemName');
            res.push('ItemNavCode');
            res.push('LabOperator');
            res.push('CertificateWeightGMO');
            res.push('EntryInsertDate');
            res.push('EntryInsertUserID');
            res.push('Active');
            res.push('ConsigneeRegCode');
            res.push('ConsigneeType');
            res.push('OwnerStateRegCode');
            res.push('OwnerType');
            res.push('ConsignorRegCode');
            res.push('ConsignorType');
            res.push('Source');
            res.push('Posted');
            res.push('Sha1Hash');

            return res;
        },
   t020_LabAnalysisLines: ()=>{
          return `FormID	nvarchar(36),
                  AnalisysCode	nvarchar(50),
                  AnalisysName	nvarchar(100),
                  ValueType	bit,
                  UOM	nvarchar(10),
                  Value	nvarchar(40),
                  ValueFact	nvarchar(40),
                  Value2	decimal(18,3),
                  Value2Fact	decimal(18,3),
                  ContractorValue	nvarchar(100),
                  ParentAnalisysCode	nvarchar(50),
                  Inclusion	bit,
                  ShowinLabes bit,
                  SubStandart bit`;
               },
   t020_LabAnalysisLines_fields: ()=> {
          let res = [];
            res.push('FormID');
            res.push('AnalisysCode');
            res.push('AnalisysName');
            res.push('ValueType');
            res.push('UOM');
            res.push('Value');
            res.push('ValueFact');
            res.push('Value2');
            res.push('Value2Fact');
            res.push('ContractorValue');
            res.push('ParentAnalisysCode');
            res.push('Inclusion');
            res.push('ShowinLabes');
            res.push('SubStandart');

            return res;
        },
   t025_TrackEvents: ()=>{
          return `EventID	nvarchar(50),
                  EventName	nvarchar(100),
                  EntryGUID	nvarchar(56),
                  Date	datetime,
                  WaybillNumber	nvarchar(20),
                  UserName	nvarchar(100),
                  Lon	nvarchar(20),
                  Lat	nvarchar(20)
                  `;
               },
   t025_TrackEvents_fields: ()=> {
          let res = [];
            res.push('EventID');
            res.push('EventName');
            res.push('EntryGUID');
            res.push('Date');
            res.push('WaybillNumber');
            res.push('UserName');
            res.push('Lon');
            res.push('Lat');
            return res;
        }
};
