/** Enumeration-ish class for US states. */
export default class USState {

    /**
     * @param abbr Two-letter postal abbreviation.
     * @param name Full state name.
     */
    constructor(
        abbr: string,
        name: string
    ) {
        this.Abbr = abbr;
        this.Name = name;
    }

    //===========================================================================================================================
    /** Two-letter postal abbreviation */
    public Abbr: string;
    /** Full state name. */
    public Name: string;

    //===========================================================================================================================
    /** Alabama */
    public static readonly Alabama = new USState("AL", "Alabama");
    /** Alaska */
    public static readonly Alaska = new USState("AK", "Alaska");
    /** Arizona */
    public static readonly Arizona = new USState("AZ", "Arizona");
    /** Arkansas */
    public static readonly Arkansas = new USState("AR", "Arkansas");
    /** California */
    public static readonly California = new USState("CA", "California");
    /** Colorado */
    public static readonly Colorado = new USState("CO", "Colorado");
    /** Connecticut */
    public static readonly Connecticut = new USState("CT", "Connecticut");
    /** Delaware */
    public static readonly Delaware = new USState("DE", "Delaware");
    /** Florida */
    public static readonly Florida = new USState("FL", "Florida");
    /** Georgia */
    public static readonly Georgia = new USState("GA", "Georgia");
    /** Hawaii */
    public static readonly Hawaii = new USState("HI", "Hawaii");
    /** Idaho */
    public static readonly Idaho = new USState("ID", "Idaho");
    /** Illinois */
    public static readonly Illinois = new USState("IL", "Illinois");
    /** Indiana */
    public static readonly Indiana = new USState("IN", "Indiana");
    /** Iowa */
    public static readonly Iowa = new USState("IA", "Iowa");
    /** Kansas */
    public static readonly Kansas = new USState("KS", "Kansas");
    /** Kentucky */
    public static readonly Kentucky = new USState("KY", "Kentucky");
    /** Louisiana */
    public static readonly Louisiana = new USState("LA", "Louisiana");
    /** Maine */
    public static readonly Maine = new USState("ME", "Maine");
    /** Maryland */
    public static readonly Maryland = new USState("MD", "Maryland");
    /** Massachusetts */
    public static readonly Massachusetts = new USState("MA", "Massachusetts");
    /** Michigan */
    public static readonly Michigan = new USState("MI", "Michigan");
    /** Minnesota */
    public static readonly Minnesota = new USState("MN", "Minnesota");
    /** Mississippi */
    public static readonly Mississippi = new USState("MS", "Mississippi");
    /** Missouri */
    public static readonly Missouri = new USState("MO", "Missouri");
    /** Montana */
    public static readonly Montana = new USState("MT", "Montana");
    /** Nebraska */
    public static readonly Nebraska = new USState("NE", "Nebraska");
    /** Nevada */
    public static readonly Nevada = new USState("NV", "Nevada");
    /** New Hampshire */
    public static readonly NewHampshire = new USState("NH", "New Hampshire");
    /** New Jersey */
    public static readonly NewJersey = new USState("NJ", "New Jersey");
    /** New Mexico */
    public static readonly NewMexico = new USState("NM", "New Mexico");
    /** New York */
    public static readonly NewYork = new USState("NY", "New York");
    /** North Carolina */
    public static readonly NorthCarolina = new USState("NC", "North Carolina");
    /** North Dakota */
    public static readonly NorthDakota = new USState("ND", "North Dakota");
    /** Ohio */
    public static readonly Ohio = new USState("OH", "Ohio");
    /** Oklahoma */
    public static readonly Oklahoma = new USState("OK", "Oklahoma");
    /** Oregon */
    public static readonly Oregon = new USState("OR", "Oregon");
    /** Pennsylvania */
    public static readonly Pennsylvania = new USState("PA", "Pennsylvania");
    /** Rhode Island */
    public static readonly RhodeIsland = new USState("RI", "Rhode Island");
    /** South Carolina */
    public static readonly SouthCarolina = new USState("SC", "South Carolina");
    /** South Dakota */
    public static readonly SouthDakota = new USState("SD", "South Dakota");
    /** Tennessee */
    public static readonly Tennessee = new USState("TN", "Tennessee");
    /** Texas */
    public static readonly Texas = new USState("TX", "Texas");
    /** Utah */
    public static readonly Utah = new USState("UT", "Utah");
    /** Vermont */
    public static readonly Vermont = new USState("VT", "Vermont");
    /** Virginia */
    public static readonly Virginia = new USState("VA", "Virginia");
    /** Washington */
    public static readonly Washington = new USState("WA", "Washington");
    /** West Virginia */
    public static readonly WestVirginia = new USState("WV", "West Virginia");
    /** Wisconsin */
    public static readonly Wisconsin = new USState("WI", "Wisconsin");
    /** Wyoming */
    public static readonly Wyoming = new USState("WY", "Wyoming");
}