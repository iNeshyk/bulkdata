'use strict';
module.exports = {

  t010_Bulkdata: ()=>{

    return ` EntryGUID nchar(36)
           ,EntryType bit
           ,Source nvarchar(20)
           ,BarCode nchar(13)
           ,RFID nchar(30)
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
           ,StandardWeightElevator int
           ,ConsignorWeight int
           ,EntryInsertDate datetime
           ,EntryInsertUserID nvarchar(50)`;
         },

        t010_Bulkdata_fields: () =>{
          let res = [];
          res.push('EntryInsertDate');
          res.push('EntryInsertUserID');
          return res;
        }
}
