var game = {
    beans: 0,
    upgrades: {
        beanMachine: {
            amount: 0,
            cost: 10,
            bps: 0.1,
            hasun: false,
            unlocked: 1,
            name: "Bean Machine"
        },
        beanField: {
            amount: 0,
            cost: 100,
            bps: 1,
            hasun: false,
            unlocked: 75,
            name: "Bean Field"
        }
    },
    acheives: [{ req: "game.beans>0", gotten: false, text: "You have one BEAN" }, { req: "game.beans>9", gotten: false, text: "You have ten BEANS" }, { req: "game.beans>68", gotten: false, text: "You have some nice BEANS" }]
};

var delay = 0;
var bps = 0;

function updateUpgrades() {
    var _d = 0;
    document.querySelector("#upgrades").innerHTML = "";
    for (_ in game.upgrades) {
        if (game.upgrades[_].hasun) {
            document.querySelector("#upgrades").innerHTML += `<br> <button onclick="thingClicked('${_}')">${game.upgrades[_].name}</button> you have ${numberformat.format(game.upgrades[_].amount)}. Cost: ${numberformat.format(game.upgrades[_].cost)}`;
            _d += game.upgrades[_].bps * game.upgrades[_].amount;
            bps = _d;
        }
    }
}

function updateCount() {
    if (Cookies.get("game") != null && Cookies.get("game") != "undefined") {
        var game1 = JSON.parse(Cookies.get("game"));
        for (_ in game.upgrades) {
            if (game1.upgrades[_] == null) {
                game1.upgrades[_] = game.upgrades[_];
            }
        }
        game = game1;

        for (_ in game.acheives) {
            if (game1.acheives[_] == null || game.acheives[_].text != game1.acheives[_].text) {
                game1.acheives[_] = game.acheives[_];
            }
        }
    }
    updateUpgrades();
    if (Cookies.get("lasttime") != null) {
        var lastSaveDate = Number(Cookies.get("lasttime"))
        lastSaveDate = Date.now() - lastSaveDate;
        lastSaveDate = Math.round(lastSaveDate / 1000);
        if (lastSaveDate / 60 >= 1) {
            game.beans += lastSaveDate * bps / 1.8
            document.querySelector("#away").innerHTML += `While you were gone...<br>You got ${numberformat.format(lastSaveDate * bps / 1.8)} BEANS`;
        }
    }
    setInterval(() => {
        for (_ in game.upgrades) {
            game.beans += game.upgrades[_].amount * game.upgrades[_].bps / 20;
        }
        for (_ in game.acheives) {
            var _b = new Function('return ' + game.acheives[_].req);
            if (_b() & !game.acheives[_].gotten) {
                game.acheives[_].gotten = true;
                document.querySelector("#acheives").innerHTML += `<br>Acheivement Unlocked<br>${game.acheives[_].text}<br>`;
            }
        }
        document.querySelector("#beans").innerHTML = `You have ${numberformat.format(Number(String(game.beans).split(".")[0]))} Beans`;
        for (_ in game.upgrades) {
            if (!game.upgrades[_].hasun && game.upgrades[_].unlocked <= game.beans) {
                game.upgrades[_].hasun = true;
                updateUpgrades()
            }
        }
        delay++;
        if (delay >= 40) {
            Cookies.set("game", JSON.stringify(game), { expires: 100000 });
            Cookies.set("lasttime", Date.now(), { expires: 100000 })
            delay = 0;
        }

    }, 50)
}

function thingClicked(thing) {
    if (game.upgrades[thing].cost <= game.beans) {
        game.beans -= game.upgrades[thing].cost;
        game.upgrades[thing].amount++;
        game.upgrades[thing].cost += Math.round(game.upgrades[thing].cost * 0.15)
        updateUpgrades();
    }
}