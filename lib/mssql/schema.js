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
           ,RFID nvarchar(24)
           ,VehicleType bit
           ,VehicleStateNo nvarchar(15)
           ,TrailerStateNo nvarchar(15)
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
           ,ConsignorGrossWeight int
           ,ConsignorVehicleWeight int
           ,ConsignorWeight int
           ,DriverID	nvarchar(9)
           ,DriverPhone	nvarchar(13)
           ,DriverName	nvarchar(100)
           ,TruckModel	nvarchar(50)
           ,TruckModelType	nvarchar(50)
           ,TruckVechicleType	nvarchar(50)
           ,Seals	nvarchar(100)
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
           ,Active bit `;
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
          res.push('VehicleType');
          res.push('VehicleStateNo');
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
          res.push('ConsignorGrossWeight');
          res.push('ConsignorVehicleWeight');
          res.push('ConsignorWeight');
          res.push('DriverID');
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
                  ConsignorType int`;
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

            return res;
        },
        t020_LabAnalysisLines: ()=>{
          return `FormID	nvarchar(36),
                  AnalisysCode	nvarchar(50),
                  AnalisysName	nvarchar(100),
                  ValueType	bit,
                  UOM	nvarchar(10),
                  Value	nvarchar(40),
                  Value2	decimal(18,3),
                  ParentAnalisysCode	nvarchar(50),
                  Inclusion	bit,
                  ShowinLabes	bit
                	`;
               },
        t020_LabAnalysisLines_fields: ()=> {
          let res = [];
            res.push('FormID');
            res.push('AnalisysCode');
            res.push('AnalisysName');
            res.push('ValueType');
            res.push('UOM');
            res.push('Value');
            res.push('Value2');
            res.push('ParentAnalisysCode');
            res.push('Inclusion');
            res.push('ShowinLabes');
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
}
