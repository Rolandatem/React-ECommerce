/** Enumeration-ish class for contact reasons. */
export default class ContactReason {

    /**
     * @param key Simple key value used as a value in select's for instance.
     * @param text Friendly text for contact reason.
     */
    constructor(
        key: string,
        text: string
    ) {
        this.Key = key;
        this.Text = text;
    }

    //===========================================================================================================================
    /** Key value for the contact reason. */
    public Key: string;
    /** Friendly text for the contact reason. */
    public Text: string;

    //===========================================================================================================================
    /** Product Question */
    public static readonly ProductQuestion = new ContactReason("product_question", "Product Question");
    /** Price Matching */
    public static readonly PriceMatching = new ContactReason("price_matching", "Price Matching");
    /** Order Status Update */
    public static readonly OrderStatusUpdate = new ContactReason("order_status_update", "Order Status Update");
    /** Website Problems */
    public static readonly WebsiteProblems = new ContactReason("website_problems", "Website Problems");
    /** Samples */
    public static readonly Samples = new ContactReason("samples", "Samples");
    /** Other */
    public static readonly Other = new ContactReason("other", "Other");
}