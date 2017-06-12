'use strict';
module.exports = {

  t010_Bulkdata: ()=>{

    return ` EntryGUID nchar(36)
           ,OwnerEntryGUID nchar(36)
           ,EntryType bit
           ,Complex bit
           ,ComplexID nchar(36)
           ,Source nvarchar(20)
           ,BarCode nchar(13)
           ,NFC nchar(12)
           ,RFID nchar(24)
           ,VehicleType bit
           ,VehicleStateNo nvarchar(15)
           ,TrailerStateNo nvarchar(15)
           ,WaybillNo nvarchar(15)
           ,WaybillDate datetime
           ,PostingDate datetime
           ,ShipmentDate datetime
           ,OwnerStateName nvarchar(200)
           ,OwnerStateRegCode nchar(8)
           ,ShippingAgentStateName nvarchar(200)
           ,ShippingAgentStateRegCode nchar(8)
           ,OrderAgentStateName nvarchar(200)
           ,OrderAgentStateRegCode nchar(8)
           ,ConsignorName nvarchar(200)
           ,ConsignorRegCode nchar(8)
           ,ConsigneeName nvarchar(200)
           ,ConsigneeRegCode nchar(8)
           ,ShipmentLocationName nvarchar(200)
           ,ShipmentNAVLocationCode nchar(15)
           ,ShipmentLocationAdress nvarchar(400)
           ,DestinationLocationName nvarchar(200)
           ,DestinationNAVLocationCode nchar(15)
           ,DestinationLocationAdress nvarchar(400)
           ,ShipmentRWStationCode nchar(15)
           ,ShipmentRWStationName nvarchar(200)
           ,DestinationRWStationCode nchar(15)
           ,DestinationRWStationName nvarchar(200)
           ,ItemGUID nchar(32)
           ,ItemName nvarchar(100)
           ,ItemNavCode nchar(15)
           ,GrossWeight int
           ,VehicleWeight int
           ,NetWeight int
           ,ShipmentMethod nchar(15)
           ,ConsignorGrossWeight int
           ,ConsignorVehicleWeight int
           ,ConsignorWeight int
           ,DriverID	char(9)
           ,DriverPhone	char(13)
           ,DriverName	nvarchar(100)
           ,TruckModel	nvarchar(15)
           ,TruckModelType	nvarchar(15)
           ,TruckVechicleType	nvarchar(15)
           ,Seals	nvarchar(100)
           ,Field1Name	nvarchar(100)
           ,Field1Type	nvarchar(10)
           ,Field1Adress	nvarchar(200)
           ,Field1Percent	int
           ,Field1Mositure	numeric(6, 2)
           ,Field2Name	nvarchar(100)
           ,Field2Type	nvarchar(10)
           ,Field2Adress	nvarchar(200)
           ,Field2Percent	int
           ,Field2Mositure	numeric(6, 2)
           ,EntryInsertDate datetime
           ,EntryInsertUserID nvarchar(50)
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
          res.push('WaybillNo');
          res.push('WaybillDate');
          res.push('PostingDate');
          res.push('ShipmentDate');
          res.push('OwnerStateName');
          res.push('OwnerStateRegCode');
          res.push('ShippingAgentStateName');
          res.push('ShippingAgentStateRegCode');
          res.push('OrderAgentStateName');
          res.push('OrderAgentStateRegCode');
          res.push('ConsignorName');
          res.push('ConsignorRegCode');
          res.push('ConsigneeName');
          res.push('ConsigneeRegCode');
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
          res.push('Active');

          return res;
        },
        t015_LabAnalysis: ()=>{
          return `FormID nchar(36),
                  Type nchar(15),
                	TransportShipmentID nchar(36),
                	No nvarchar(20),
                	Date datetime,
                	ScanCode nchar(13),
                	HarvestYear datetime,
                	WaybillNo nvarchar(30),
                	WaybillDate datetime,
                	Certificate1No nvarchar(40),
                	Certificate1Date datetime,
                	Certificate2No nvarchar(40),
                	Certificate2Date datetime,
                	CertificateWeightGMO int,
                  EntryInsertDate datetime,
                  EntryInsertUserID nvarchar(50),
                  Active bit,
                  ConsigneeRegCode nchar(15),
                  OwnerStateRegCode nchar(8)`;
               },
        t015_LabAnalysis_fields: ()=> {

          let res = [];
            res.push('FormID');
            res.push('Type');
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
            res.push('CertificateWeightGMO');
            res.push('EntryInsertDate');
            res.push('EntryInsertUserID');
            res.push('Active');
            res.push('ConsigneeRegCode');
            res.push('OwnerStateRegCode');

            return res;
        },
        t020_LabAnalysisLines: ()=>{
          return `FormID	nchar(36),
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
        }

}
