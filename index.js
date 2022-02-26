var game = {
    beans: 0,
    clicks: 0,
    lifetimeBeans: 0,
    faction: null,
    clickpower: 1,
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
            unlocked: 1300000000,
            name: "Bean Goverment"
        }
    },
    acheives: [{ req: "game.beans>0", gotten: false, text: "You have one BEAN" }, { req: "game.beans>9", gotten: false, text: "You have ten BEANS" }, { req: "game.beans>68", gotten: false, text: "69 beans- nice" }, { req: "game.beans>999999&&game.clicks<=10", gotten: false, text: "Neverclick- get 1,000,000 beans<br>and only click 10 times" }, { req: "game.beans>999999&&game.clicks==0", gotten: false, text: "True Neverclick- get 1,000,000<br>beans without clicking" }, { req: "game.beans>9999999999", gotten: false, text: "1%- of what?" }, { req: "game.beans>49999999999", gotten: false, text: "5% of something" }, { req: "game.beans>99999999999", gotten: false, text: "10%..." }, { req: "game.beans>499999999999", gotten: false, text: "50%, something's talking to me..." }, { req: "game.beans>999999999999", gotten: false, text: "The BEANPOCALYPSE - coming soon lol" }]
};

var delay = 0;
var bps = 0;
var sfx_click = new Audio("/audio/click.wav");
sfx_click.volume = .5;
sfx_click.defaultPlaybackRate = 0.5;
var sfx_beanClick = new Audio("/audio/powerUp.wav");
sfx_beanClick.volume = .5;
sfx_beanClick.defaultPlaybackRate = 0.5;
var sfx_error = new Audio("/audio/error.wav");
sfx_error.volume = .5;
sfx_error.defaultPlaybackRate = 0.5;
var sfx_acheiveGet = new Audio("/audio/acheiveGet.wav");
sfx_acheiveGet.volume = .5;
sfx_acheiveGet.defaultPlaybackRate = 0.5;

function beaner() {
    document.querySelector(".BEAN").src = "/images/beaner.png";
}

function updateUpgrades() {
    var _d = 0;
    document.querySelector("#upgrades").innerHTML = "";
    for (_ in game.upgrades) {
        if (game.upgrades[_].hasun) {
            document.querySelector("#upgrades").innerHTML += `<br> <button class="buy-btn" onclick="thingClicked('${_}')"><span style="float:left;">${game.upgrades[_].name}<br>${numberformat.format(game.upgrades[_].cost)} beans</span><span style="float:right;">${numberformat.format(game.upgrades[_].amount)}</span></button>`;
            _d += game.upgrades[_].bps * game.upgrades[_].amount;
            bps = _d;
        }
    }
}

function beanClick(){
    if(document.querySelector("#popupbean").style.display != "none"){
        var choice = Math.ceil(Math.random()*10)/2;
        console.log(choice);
        document.querySelector("#popupbean").style.display = "none";
        sfx_beanClick.play();
        if(choice <= 1){
            game.beans += Math.round(Math.random()*100);
        }else if(choice <= 2 && choice > 1){
            var oldcp = game.clickpower;
            game.clickpower *= 7;
            setTimeout(() => {
                game.clickpower = oldcp;
            },30000)
        }else if(choice <= 3 && choice > 2){
            console.log("2.1 -> 3")
        }else if(choice <= 4 && choice > 3){
            console.log("3.1 -> 4");
        }else if(choice <= 5 && choice > 4){
            console.log("4.1 -> 5");
        }
    }else{
        return false;
    }
}

function summonBean() {
    var bean = document.querySelector("#popupbean");
    var height = window.innerHeight - bean.height;
    var width = window.innerWidth - bean.width;
    var x = Math.round(Math.random()*width);
    var y = Math.round(Math.random()*height);
    if(x < 0){
        x *= -1
    }
    if(y < 0){
        y *= -1
    }
    console.log(x,y)
    bean.style.top = `${y}px`;
    bean.style.left = `${x}px`;
    bean.style.display = "block";
    bean.addEventListener('click', beanClick);
    bean.style.transform = `rotate(${Math.round(Math.random()*1000)}deg)`;
    setTimeout(() => {
        bean.style.display = "none";
        setTimeout(summonBean,5000)
    },420000)
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
                document.querySelector("#acheives").innerHTML += `<br><div class='acheivement'>Acheivement Unlocked<br>${game.acheives[_].text}</div><br>`;
                sfx_acheiveGet.play();
                if (window.Notification && Notification.permission === "granted") {
                    var img = "/images/idle_beans_icon.png";
                    var notification = new Notification("Acheivement Unlocked!", {body: game.acheives[_].text, icon: img});
                }
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
    setTimeout(() => {
        summonBean();
    },420000)
}

function thingClicked(thing) {
    if (game.upgrades[thing].cost <= game.beans) {
        game.beans -= game.upgrades[thing].cost;
        game.upgrades[thing].amount++;
        game.upgrades[thing].cost += Math.round(game.upgrades[thing].cost * 0.15)
        updateUpgrades();
        sfx_click.play();
    } else {
        sfx_error.play();
    }
    
}

console.log("%cAre you trying to CHEAT?!", "color:red;font-size:36px;");
Notification.requestPermission().then(function(result) {
  console.log(`The user ${result} notifications`);
});