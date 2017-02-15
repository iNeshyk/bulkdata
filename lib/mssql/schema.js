'use strict';
module.exports = {

  t010_Bulkdata: ()=>{

    return ` EntryGUID nchar(36)
           ,EntryType bit
           ,Source varchar(20)
           ,BarCode nchar(13)
           ,RFID nchar(10)
           ,VehicleType bit
           ,VehicleStateNo varchar(15)
           ,TrailerStateNo varchar(15)
           ,WaybillNo varchar(15)
           ,WaybillDate datetime
           ,PostingDate datetime
           ,ShipmentDate datetime
           ,OwnerStateName varchar(100)
           ,OwnerStateRegCode nchar(8)
           ,ShippingAgentStateName varchar(100)
           ,ShippingAgentStateRegCode nchar(8)
           ,OrderAgentStateName varchar(100)
           ,OrderAgentStateRegCode nchar(8)
           ,ConsignorName varchar(100)
           ,ConsignorRegCode nchar(8)
           ,ConsigneeName varchar(100)
           ,ConsigneeRegCode nchar(8)
           ,ShipmentLocationName varchar(200)
           ,ShipmentNAVLocationCode nchar(15)
           ,ShipmentLocationAdress varchar(400)
           ,DestinationLocationName varchar(200)
           ,DestinationNAVLocationCode nchar(15)
           ,DestinationLocationAdress varchar(400)
           ,ShipmentRWStationCode nchar(15)
           ,ShipmentRWStationName varchar(200)
           ,DestinationRWStationCode nchar(15)
           ,DestinationRWStationName varchar(200)
           ,ItemGUID nchar(32)
           ,ItemName varchar(100)
           ,ItemNavCode nchar(15)
           ,GrossWeight int
           ,VehicleWeight int
           ,NetWeight int
           ,ShipmentMethod nchar(15)
           ,StandardWeightElevator int
           ,ConsignorWeight int
           ,EntryInsertDate datetime
           ,EntryInsertUserID varchar(50)`;
         }
}
