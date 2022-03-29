const web3 = new Web3(window.ethereum);

$(document).ready(function () {
    $("#btn_Connect_MM").click(function () {
        connect_MM().then(function (data) {
            $("#address").html(data[0]);
            var rand = randomString(10);
            $("#random").html(rand);

            web3.eth.personal.sign(rand, data[0], (err, hash) => {
                if (!err) {
                    $("#hash").html(hash);
                }
            });
        })
    });


});

async function connect_MM() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function randomString(long) {
    const textArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var s = "";
    for (var i = 0; i < long; i++) {
        s += textArr[Math.floor(Math.random() * textArr.length)];
    }
    return s;
}