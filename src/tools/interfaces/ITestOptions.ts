/** Describes the structure of testable API options. */
export default interface ITestOptions {
    /** Indicates to request the API to use the delay test to test latency. */
    withDelay?: boolean,
    /** Indicates to request the API to use the error test to test exception handling. */
    withError?: boolean
}