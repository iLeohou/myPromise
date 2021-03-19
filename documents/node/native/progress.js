class Progress {
    constructor(cur, total) {
        this.cur = cur
        this.total = total
        this.fill = '|'
        this.empty = '_'
    }

    tick() {
        if(this.cur > this.total) return false
        this.cur += 1;
        return true;
    }

    render() {
        let str = '      [';
        for(let i = 0; i < this.cur; i++) {
            str += this.fill;
        }
        const left = this.total - this.cur;
        for(let i = 0; i < left; i++) {
            str += this.empty
        }
        str += `]${this.cur}/${this.total}\r`
        process.stderr.write(str)
        // console.log(str)会自动结尾加'\n'无法同行打印。
    }

    start() {
        const self = this;
        setInterval(() => {
            const res = self.tick()
            if(res) self.render();
        }, 1000)
    }
}

const p = new Progress(0, 50);
p.start()