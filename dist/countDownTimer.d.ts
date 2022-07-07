declare function countDownTimer(this: any, duration: number, granularity: number | undefined): void;
declare namespace countDownTimer {
    var parse: (seconds: number) => {
        [key: string]: number;
    };
}
export default countDownTimer;
