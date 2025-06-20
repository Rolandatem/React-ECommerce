import ShipType from "../enums/ShipType";

/**
 * Converts the integer value of the ship type from the API
 * to the Enum locally.
 * @param shipTypeId Integer value of the ship type.
 * @returns 
 */
const convertShipType = (
    shipTypeId: number) => {
    
    return ShipType.ConvertToShipType(shipTypeId);
}

export default convertShipType;