/*
All code copyright Joseph Heinz, 2022
    (with help from stackoverflow and cukmekerb (definitively not stolen with credit))
*/

var game = {
    beans: 0,
    clicks: 0,
    lifetimeBeans: 0,
    faction: null,
    clickpower: 1,
    upgrades: {
        beanCan: {
            amount: 0,
            cost: 10,
            bps: 0.1,
            hasun: false,
            unlocked: 1,
            name: "Can o' beans",
            flavor: "A can to keep your beans in- YUM!",
            img: "images/bean-can.png"
        },
        beanMachine: {
            amount: 0,
            cost: 100,
            bps: 1,
            hasun: false,
            unlocked: 75,
            name: "Machine",
            flavor: "A machine that packages up beans",
            img: "images/buildings/bean-machine.png"
        },
        beanFarm: {
            amount: 0,
            cost: 1500,
            bps: 10,
            hasun: false,
            unlocked: 1250,
            name: "Farm",
            flavor: "Plant beans, to grow, MORE BEANS",
            img: "images/buildings/bean-farm.png"
        },
        beanDrill: {
            amount: 0,
            cost: 170000,
            bps: 200,
            hasun: false,
            unlocked: 150000,
            name: "Drill",
            flavor: "Drills into the ground to find deposits of beans",
            img: "images/buildings/bean-drill.png"
        },
        beanFactory: {
            amount: 0,
            cost: 5000000,
            bps: 3600,
            hasun: false,
            unlocked: 4500000,
            name: "Factory",
            flavor: "Packages beans to send all around the world",
            img: "images/buildings/bean-factory.png"
        },
        beanTreasury: {
            amount: 0,
            cost: 300000000,
            bps: 54000,
            hasun: false,
            unlocked: 25000000,
            name: "Treasury",
            flavor: "Keeps beans safe and accepts<br>them as legal tender",
            img: "images/buildings/bean-treasury.png"
        },
        beanTemple: {
            amount: 0,
            cost: 1400000000,
            bps: 130000,
            hasun: false,
            unlocked: 1300000000,
            name: "Temple",
            flavor: "A place to pray to the great bean can in the sky",
            img: "images/buildings/bean-temple.png"
        },
        beanLaboratory: {
            amount: 0,
            cost: 33000000000,
            bps: 1250000,
            hasun: false,
            unlocked: 25000000000,
            name: "Laboratory",
            flavor: "Synthesising beans is a great step for humanity",
            img: "images/buildings/bean-lab.png"
        },
        beanRocket: {
            amount: 0,
            cost: 420000000000,
            bps: 16000000,
            hasun: false,
            unlocked: 400000000000,
            name: "Rocket",
            flavor: "The final frontier doesn't seem so final now",
            img: "images/buildings/bean-rocket.png"
        },
        beanMagician: {
            amount: 0,
            cost: 1000000000000,
            bps: 52000000,
            hasun: false,
            unlocked: 900000000000,
            name: "Magician",
            flavor: "Creating beans with MAGIC",
            img: "images/buildings/magician.png"
        },
        quantumBeans: {
            amount: 0,
            cost: 16500000000000,
            bps: 244000000,
            hasun: false,
            unlocked: 1500000000000,
            name: "Quantum Beans",
            flavor: "How can a bean be a bean and a lentil? Oh wait, nevermind",
            img: "images/buildings/quantum-bean.png"
        },
        darkMatterEnhancer: {
            amount: 0,
            cost: 670500000000000,
            bps: 1200000000,
            hasun: false,
            unlocked: 600000000000000,
            name: "Dark Matter Enhancer",
            flavor: "'Creating beans from invisible energy since 1997™'",
            img: "images/buildings/dark-matter-enhancer.png"
        },
        lightRefractor: {
            amount: 0,
            cost: 1300000000000000,
            bps: 16000000000,
            hasun: false,
            unlocked: 1000000000000000,
            name: "Light Refractor",
            flavor: "Creating beans from pure light",
            img: "images/buildings/light-refractor.png"
        },
        beanRecycler: {
            amount: 0,
            cost: 14000000000000000,
            bps: 475000000000,
            hasun: false,
            unlocked: 10000000000000000,
            name: "Recycler",
            flavor: "Recycles organic and non-organic matter into beans",
            img: "images/buildings/recycler.png"
        },
        gameDeveloper: {
            amount: 0,
            cost: 420690000000000000,
            bps: 6900000000000,
            hasun: false,
            unlocked: 420000000000000000,
            name: "Game Dev",
            flavor: "Creates games to make more beans",
            img: "images/buildings/game-dev.png"
        },
        mulitversalCore: {
            amount: 0,
            cost: 1600000000000000000,
            bps: 23000000000000,
            hasun: false,
            unlocked: 1000000000000000000,
            name: "Multiversal Core",
            flavor: "Takes beans from other multiverses",
            img: "images/buildings/multiversal-core.png"
        }
    },
    acheives: [{ req: "game.beans>0", gotten: false, text: "You have one BEAN", img: "images/acheivements/bean-acheive-64x.png" }, { req: "game.beans>9", gotten: false, text: "You have ten BEANS", img: "images/acheivements/10-beans-acheive-64x.png" }, { req: "game.beans>68", gotten: false, text: "69 beans- nice", img: "images/acheivements/681-beans-acheive-64x.png" }, { req: "game.beans>999999&&game.clicks<=10", gotten: false, text: "Neverclick- get 1,000,000 beans<br>and only click 10 times", img: "images/acheivements/neverclick-acheive-64x.png" }, { req: "game.beans>999999&&game.clicks==0", gotten: false, text: "True Neverclick- get 1,000,000<br>beans without clicking", img: "images/acheivements/true-neverclick-acheive-64x.png" }]
};

var delay = 0;
var bps = 0;
var sfx_click = new Audio("audio/click.wav");
sfx_click.volume = .5;
sfx_click.defaultPlaybackRate = 0.5;
var sfx_beanClick = new Audio("audio/powerUp.wav");
sfx_beanClick.volume = .5;
sfx_beanClick.defaultPlaybackRate = 0.5;
var sfx_error = new Audio("audio/error.wav");
sfx_error.volume = .5;
sfx_error.defaultPlaybackRate = 0.5;
var sfx_acheiveGet = new Audio("audio/acheiveGet.wav");
sfx_acheiveGet.volume = .5;
sfx_acheiveGet.defaultPlaybackRate = 0.5;
var sfx_wrathbean = new Audio("audio/wrathbean.wav");
sfx_wrathbean.volume = .5;
sfx_wrathbean.defaultPlaybackRate = 0.5;

function beaner() {
    document.querySelector(".BEAN").src = "images/beaner.png";
}

function reset(){
    if(confirm("Are you sure you want to reset?\n!!!THIS IS NOT ASCENDING MOSTLY BECAUSE THAT ISN'T A FEATURE!!!")){
        game.beans = 0;
        game.clicks = 0;
        game.faction = null;
        game.clickpower = 1;
        game.lifetimeBeans = 0;
        var _prices = [10,100,1500,170000,5000000,300000000,1400000000,33000000000,420000000000,1000000000000,16500000000000,670500000000000,1300000000000000,14000000000000000,420690000000000000,1600000000000000000];
        var _iter = 0;
        for(_ in game.upgrades){
            game.upgrades[_].amount = 0;
            game.upgrades[_].hasun = false;
            game.upgrades[_].cost = _prices[_iter];
            console.log(_);
            _iter ++;
        }
        
        for(_ in game.acheives){
            game.acheives[_].gotten = false;
        }
        localStorage.remove("game");
    }
}

function updateUpgrades() {
    var _d = 0;
    document.querySelector("#buildings").innerHTML = "";
    for (_ in game.upgrades) {
        if (game.upgrades[_].hasun) {
            document.querySelector("#buildings").innerHTML += `<br> <button onclick="thingClicked('${_}')"><img src="${game.upgrades[_].img}" alt="${game.upgrades[_].img}" height="64px" width="64px" style="float:left;margin:2px;"><span style="text-align:left;float:left;font-size:14px;">${game.upgrades[_].name}<br>${numberformat.format(game.upgrades[_].cost)} beans<br>${game.upgrades[_].flavor}</span><span style="float:right;font-size:24px;">${numberformat.format(game.upgrades[_].amount)}</span></button>`;
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
            if(game.beans == 0){
                game.beans += Math.round(Math.random()*25);
            }else if(game.beans >= 1 && game.beans <= 10){
                game.beans += Math.round(Math.random()*100);
            }else{
                game.beans += Math.round(Math.random()*game.beans/1.5);
            }
        }else if(choice <= 2 && choice > 1){
            var oldcp = game.clickpower;
            game.clickpower *= 7;
            setTimeout(() => {
                game.clickpower = oldcp;
            },30000)
        }else if(choice <= 3 && choice > 2){
            if(game.beans == 0){
                game.beans += Math.round(Math.random()*25);
            }else if(game.beans >= 1 && game.beans <= 10){
                game.beans += Math.round(Math.random()*100);
            }else{
                game.beans += Math.round(Math.random()*game.beans/1.5);
            }
        }else if(choice <= 4 && choice > 3){
            if(game.beans == 0){
                game.beans += Math.round(Math.random()*25);
            }else if(game.beans >= 1 && game.beans <= 10){
                game.beans += Math.round(Math.random()*100);
            }else{
                game.beans += Math.round(Math.random()*game.beans/1.5);
            }
        }else if(choice <= 5 && choice > 4){
            var oldcp = game.clickpower;
            game.clickpower *= 7;
            setTimeout(() => {
                game.clickpower = oldcp;
            },30000)
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

function wrathbeanClick(){
    if(document.querySelector("#popupwrathbean").style.display != "none"){
        var choice = Math.ceil(Math.random()*10)/2;
        console.log(choice);
        document.querySelector("#popupwrathbean").style.display = "none";
        sfx_wrathbean.play();
        game.beans -= 1;
        alert("Lmao you clicked the wrath bean and lost 1 bean. Cope.");
    }else{
        return false;
    }
}

function summonWrath() {
    var bean = document.querySelector("#popupwrathbean");
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
    bean.addEventListener('click', wrathbeanClick);
    bean.style.transform = `rotate(${Math.round(Math.random()*1000)}deg)`;
    setTimeout(() => {
        bean.style.display = "none";
        setTimeout(summonWrath,1800000)
    },1800000)
}
            
function updateCount() {
    if (localStorage.game != null && localStorage.game != "undefined") {
        var game1 = JSON.parse(localStorage.game);
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
    if (localStorage.lasttime != null) {
        var lastSaveDate = Number(localStorage.lasttime)
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
                document.querySelector("#acheives").innerHTML += `<br><div class='acheivement'><img src='${game.acheives[_].img}' style='height:64px;width:64px;float:left;' alt='acheiveIMG'>Acheivement Unlocked<br>${game.acheives[_].text}</div><br>`;
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
            localStorage.game = JSON.stringify(game);
            localStorage.lasttime = Date.now();
            delay = 0;
        }

    }, 50)
    setInterval(() => {
        var _bps = 0;
        for(_ in game.upgrades){
            _bps += game.upgrades[_].amount * game.upgrades[_].bps;
        }
        document.querySelector("#bps").innerHTML = `beans per second: ${numberformat.format(_bps)}`;
        document.title = `${numberformat.format(game.beans)} beans // Idle Beans`;
    },500)
    setTimeout(() => {
        summonBean();
    },420000)
    setTimeout(() => {
        summonWrath();
    },1800000)
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
