function countDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.isRunning = false;
    this.isStoped = false;
}
countDownTimer.prototype.start = function (new_duration) {
    if (new_duration) {
        this.duration = new_duration;
    }
    if (this.isRunning) {
        return;
    }
    this.isStoped = false;
    this.isRunning = true;
    var start = Date.now(), that = this, diff, obj;
    (function timer() {
        diff = that.duration - (((Date.now() - start) / 1000) | 0);
        if (diff > 0 && !that.isStoped) {
            setTimeout(timer, that.granularity);
        }
        else {
            diff = 0;
            that.isRunning = false;
        }
        obj = countDownTimer.parse(diff);
        that.tickFtns.forEach(function (ftn) {
            ftn.call(this, obj.minutes, obj.seconds, that.isStoped);
        }, that);
    }());
};
countDownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === 'function') {
        this.tickFtns.push(ftn);
    }
    return this;
};
countDownTimer.prototype.stop = function () {
    return (this.isStoped = true);
};
countDownTimer.prototype.expired = function () {
    return !this.isRunning;
};
countDownTimer.parse = function (seconds) {
    return {
        'minutes': (seconds / 60) | 0,
        'seconds': (seconds % 60) | 0
    };
};
export default countDownTimer;
