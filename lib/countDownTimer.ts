function countDownTimer(this:any, duration: number, granularity: number|undefined) {
	this.duration = duration;
	this.granularity = granularity || 1000;
	this.tickFtns = [];
	this.running = false;
	this.isStop = false;
}

countDownTimer.prototype.start = function(new_duration: number|undefined): void {
	if(new_duration) {
		this.duration = new_duration;
	}

	if (this.running) {
		return;
	}

	this.isStop = false;
	this.running = true;
	var start = Date.now(),
		that = this,
		diff: number|null,
		obj: {[key: string]: number};

	(function timer() {
		diff = that.duration - (((Date.now() - start) / 1000) | 0);

		if (diff > 0 && !that.isStop) {
			setTimeout(timer, that.granularity);
		} else {
			diff = 0;
			that.running = false;
		}

		obj = countDownTimer.parse(diff);
		that.tickFtns.forEach(function(this:any, ftn: Function) {
			ftn.call(this, obj.minutes, obj.seconds, that.isStop);
		}, that);
	} ());
}

countDownTimer.prototype.onTick = function(ftn: undefined|Function) {
	if (typeof ftn === 'function') {
		this.tickFtns.push(ftn);
	}
	return this;
}

countDownTimer.prototype.stop = function(): boolean {
	return !!(this.isStop = true);
}

countDownTimer.prototype.expired = function(): boolean {
	return !this.running;
}

countDownTimer.parse = function(seconds: number): {[key: string]: number} {
	return {
		'minutes': (seconds / 60) | 0,
		'seconds': (seconds % 60) | 0
	}
}

export default countDownTimer;
