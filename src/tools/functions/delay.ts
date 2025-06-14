/**
 * Awaitable delay.
 * @param time Number of milliseconds to wait.
 */
const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default delay;