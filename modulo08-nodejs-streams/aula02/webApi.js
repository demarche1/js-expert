import http from 'http';
import { Readable } from 'stream'

function api1(req, res) {
    let count = 0;
    const maxCount = 99;

    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => {
                if (count++ <= maxCount) {
                    this.push(JSON.stringify({
                        id: Date.now(),
                        name: `Ale-${count}`
                    }) + "\n")
                    return;
                }

                clearInterval(intervalContext);
                this.push(null);
            }

            setInterval(function () {
                everySecond(this)
            })
        }
    })

    readable.pipe(res);
}

function api2(req, res) {
    let count = 0;
    const maxCount = 99;

    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => {
                if (count++ <= maxCount) {
                    this.push(JSON.stringify({
                        id: Date.now(),
                        name: `Zézin-${count}`
                    }) + "\n")
                    return;
                }

                clearInterval(intervalContext);
                this.push(null);
            }

            setInterval(function () {
                everySecond(this)
            })
        }
    })

    readable.pipe(res);
}

http.createServer(api1).listen(3000, () => console.log('API 1 running on port 3000'));
http.createServer(api2).listen(4000, () => console.log('API 2 running on port 4000'));