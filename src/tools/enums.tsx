export class ShipType {
    constructor(
        value: number,
        imageUrl: string
    ) {
        this.Value = value;
        this.ImageUrl = imageUrl;
    }

    //--Public Properties
    public Value: number;
    public ImageUrl: string;

    //--Static ENUM-ish
    public static readonly None = new ShipType(1, 'shipping/none.webp');
    public static readonly QuickShip = new ShipType(2, 'shipping/quick_ship.webp');
    public static readonly FreeQuickShip = new ShipType(3, 'shipping/free_quick_shipping.webp');
    public static readonly NextDay = new ShipType(4, 'shipping/next_day_shipping.webp');
    public static readonly FreeNextDay = new ShipType(5, 'shipping/free_next_day_shipping.webp');
    public static readonly FreeShipping = new ShipType(6, 'shipping/free_shipping.webp');

    //--Converters
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