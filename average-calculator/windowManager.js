class WindowManager {
    constructor(size) {
        this.size = size;
        this.window = [];
        this.set = new Set();
    }

    update(newNumbers) {
        const prevState = [...this.window];
        const addedNumbers = [];

        for (const num of newNumbers) {
            if (!this.set.has(num)) {
                if (this.window.length >= this.size) {
                    const removed = this.window.shift();
                    this.set.delete(removed);
                }
                this.window.push(num);
                this.set.add(num);
                addedNumbers.push(num);
            }
        }

        return {
            windowPrevState: prevState,
            windowCurrState: [...this.window],
            numbers: addedNumbers,
            avg: this.calculateAverage()
        };
    }

    calculateAverage() {
        if (this.window.length === 0) return 0;
        const sum = this.window.reduce((acc, val) => acc + val, 0);
        return parseFloat((sum / this.window.length).toFixed(2));
    }
}

module.exports = WindowManager;
