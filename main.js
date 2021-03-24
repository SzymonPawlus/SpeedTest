function randomData(size) {
    return new Blob([new ArrayBuffer(size)], { type: "application/octet-stream" })
}

const requests = 10;

async function test() {

    let CallsArray = [];
    for (let i = 0; i < requests; i++) {
        CallsArray.push(singleTest());
    }
    let t0 = performance.now();
    await Promise.all(CallsArray);
    let t1 = performance.now();
    let dTime = t1 - t0;
    // Data [KB] = requests * 256
    let speed = 256 * (1000 / dTime) * requests;
    console.log(`Speed: ${(speed / 1024).toFixed(2)} MB`)
}

async function singleTest() {
    // 256 KB chunks
    let fd = new FormData();
    fd.append('file', randomData(256 * 1024));
    let t0 = performance.now();
    await fetch('http://www.blankwebsite.com/', {
        mode: 'no-cors',
        method: "POST",
        body: fd
    }).then(async (response) => {
        await response.text().then((data) => {

        })
    })
    let t1 = performance.now();
    let dTime = t1 - t0;
    let speed = 256 * 1000 / dTime;
    return dTime;
}