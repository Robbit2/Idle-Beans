var game = {
    beans: 0,
    faction: null,
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
        },
        beanAcademy: {
            amount: 0,
            cost: 1500,
            bps: 5,
            hasun: false,
            unlocked: 1250,
            name: "Bean Academy"
        },
        beanFactory: {
            amount: 0,
            cost: 170000,
            bps: 30,
            hasun: false,
            unlocked: 150000,
            name: "Bean Factory"
        },
        beanReserve: {
            amount: 0,
            cost: 5000000,
            bps: 160,
            hasun: false,
            unlocked: 4500000,
            name: "Bean Reserve"
        },
        beanTemple: {
            amount: 0,
            cost: 300000000,
            bps: 2400,
            hasun: false,
            unlocked: 25000000,
            name: "Bean Temple"
        },
        beanGovernment: {
            amount: 0,
            cost: 1400000000,
            bps: 13000,
            hasun: false,
            unlocked: 13000,
            name: "Bean Goverment"
        }
    },
    acheives: [{ req: "game.beans>0", gotten: false, text: "You have one BEAN" }, { req: "game.beans>9", gotten: false, text: "You have ten BEANS" }, { req: "game.beans>68", gotten: false, text: "You have some nice BEANS" }, { req: "game.beans>9999999999", gotten: false, text: "1%- of what?" }, { req: "game.beans>49999999999", gotten: false, text: "5% of something" }, { req: "game.beans>99999999999", gotten: false, text: "10%..." }, { req: "game.beans>499999999999", gotten: false, text: "50%, something's talking to me..." }, { req: "game.beans>999999999999", gotten: false, text: "The BEANPOCALYPSE - coming soon lol" }]
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

console.log("%cAre you trying to CHEAT?!", "color:red;font-size:36px;");