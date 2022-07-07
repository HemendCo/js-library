"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
    this.isStop = false;
}
countDownTimer.prototype.start = function (new_duration) {
    if (new_duration) {
        this.duration = new_duration;
    }
    if (this.running) {
        return;
    }
    this.isStop = false;
    this.running = true;
    var start = Date.now(), that = this, diff, obj;
    (function timer() {
        diff = that.duration - (((Date.now() - start) / 1000) | 0);
        if (diff > 0 && !that.isStop) {
            setTimeout(timer, that.granularity);
        }
        else {
            diff = 0;
            that.running = false;
        }
        obj = countDownTimer.parse(diff);
        that.tickFtns.forEach(function (ftn) {
            ftn.call(this, obj.minutes, obj.seconds, that.isStop);
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
    return !!(this.isStop = true);
};
countDownTimer.prototype.expired = function () {
    return !this.running;
};
countDownTimer.parse = function (seconds) {
    return {
        'minutes': (seconds / 60) | 0,
        'seconds': (seconds % 60) | 0
    };
};
exports.default = countDownTimer;
