const Noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");
let scanner = new BeaconScanner();

const soundplayer = require("sound-player");
let options = {
    filename: "loops/ding.wav",
    gain: 100,
    debug: false,
    player: "aplay", // "afplay" "aplay" "mpg123" "mpg321"
    device: "plughw:0,0"   //
}

let isPlaying = false;

let player = new soundplayer(options)

player.on('complete', function () {
    console.log('Done with playback!');
    isPlaying = false;
});

player.on('error', function (err) {
    console.log('Error occurred:', err);
});
scanner.onadvertisement = (advertisement) => {
    if (advertisement["beaconType"] == "eddystoneTlm") {
        try {
            if (!isPlaying) {
                isPlaying = true;
                player.play();
            }
            console.log(JSON.stringify(advertisement, null, "    "))

        } catch (e) { console.error(e) }
    }
};

scanner.startScan().then(() => {
    console.log("Scanning for BLE devices...");
}).catch((error) => {
    console.error(error);
});

