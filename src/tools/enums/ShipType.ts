/**
 * Enumeration-ish class for shipping type.
 */
export default class ShipType {
    /**
     * @param value Value to assign the ship type.
     * @param imageUrl URL to the image for the ship type.
     */
    constructor(
        value: number,
        imageUrl: string
    ) {
        this.Value = value;
        this.ImageUrl = imageUrl;
    }

    //--Public Properties
    /** Value of the ship type. */
    public Value: number;
    /** URL to the image for the ship type. */
    public ImageUrl: string;

    //--Static ENUM-ish
    /** Normal shipping. */
    public static readonly None = new ShipType(1, 'shipping/none.webp');
    /** Quick shipping. */
    public static readonly QuickShip = new ShipType(2, 'shipping/quick_ship.webp');
    /** Free quick shipping. */
    public static readonly FreeQuickShip = new ShipType(3, 'shipping/free_quick_shipping.webp');
    /** Next day shipping. */
    public static readonly NextDay = new ShipType(4, 'shipping/next_day_shipping.webp');
    /** Free next day shipping. */
    public static readonly FreeNextDay = new ShipType(5, 'shipping/free_next_day_shipping.webp');
    /** Free shipping. */
    public static readonly FreeShipping = new ShipType(6, 'shipping/free_shipping.webp');

    //--Converters
    /**
     * Uses a number value to retrieve the matching ShipType enumeration.
     * @param shipTypeValue Integer value to compare with.
     * @returns Matching ShipType.
     */
    static ConvertToShipType = (shipTypeValue: number): ShipType => {
        switch (shipTypeValue) {
            case 1: return ShipType.None;
            case 2: return ShipType.QuickShip;
            case 3: return ShipType.FreeQuickShip;
            case 4: return ShipType.NextDay;
            case 5: return ShipType.FreeNextDay;
            case 6: return ShipType.FreeShipping;
            default: throw new Error(`Uknown ShipType value: ${shipTypeValue}`);
        }
    }
}