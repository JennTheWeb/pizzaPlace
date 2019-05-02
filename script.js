// -------------------
// OBJECT CONSTRUCTORS

function Pizza(name, toppings) {
    this.name = name;
    this.toppings = toppings;
}
// TODO: use this object
function Menu(name) {
    this.name = name;
    this.pizzas = [];
    this.add = (name, toppings) => {
        let toppingsCopy = toppings.slice(0);
        let newPizza = new Pizza(name, toppingsCopy);
        this.pizzas.push(newPizza);
    }
}
function Location(location, menu) {
    this.location = location;
    this.menu = menu;
}

// ------------------
// STANDARD FUNCTIONS

// addToMenu("name", ["topping1", "topping2"], "menu")
let addToMenu = (name, toppings, menu) => {
    let toppingsCopy = toppings.slice(0);
    let newPizza = new Pizza(name, toppingsCopy);
    menu.push(newPizza);
}

// changeMenu(0, 0, "property", "value")
function changeMenu(locationIndex, menuIndex, menuProperty, value) {
    if (menuProperty === "toppings") {
        storeList[locationIndex].menu[menuIndex].toppings.push(value);
    } else {
        storeList[locationIndex].menu[menuIndex].name = value;
    }
}

// copyMenu(menu);
let copyMenu = (menu) => {
    let menuCopy = [];
    for (let i = 0; i < menu.length; i++) {
        menuCopy[i] = {};
        for (let prop in menu[i]) {
            if (Array.isArray(menu[i][prop])) {
                menuCopy[i][prop] = [];
                for (var j = 0; j < menu[i][prop].length; j++) {
                    menuCopy[i][prop][j] = menu[i][prop][j];
                }
            } else {
                menuCopy[i][prop] = menu[i][prop];
            }
        }
    }
    return menuCopy;
}
    
// addLocation("location", "menu", "locationList")
let addLocation = (location, menu, locationList) => {
    let menuCopy = copyMenu(menu);
    let newLocation = new Location(location, menuCopy);
    locationList.push(newLocation);
}

// displayOptions([{objects}], "containerId", "property")
let displayOptions = (objectsArray, containerId, property) => {
    let container = document.getElementById(containerId);
    let items = container.childNodes;
    let item;
    // save the first non-text child node
    for (let i = 0; i < items.length; i++) {
        if (items[i].nodeType == 1) {
            item = items[i].cloneNode(true);
            break;
        }   
    }
    // empty container so that contents will be replaced
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    // fill container with one node for each value
    for (let i = 0; i < objectsArray.length; i++) {
        let itemClone = item.cloneNode(true);
        let value = objectsArray[i][property];
        let itemId = property + i;

        // TODO: find a better way of checking for location, pizza, or topping list
        if (value) {
            itemClone.innerHTML = 
            "<button id=" + itemId + ">" + value + "</button>";
        } else {
            itemClone.innerHTML = objectsArray[i];
        }
        container.appendChild(itemClone);
    }
}

// -------------------

let masterMenu = [];
addToMenu("cheese", ["cheese"], masterMenu);
addToMenu("veggie", ["mushrooms"], masterMenu);
addToMenu("meat", ["pepperoni"], masterMenu);

let storeList = [];
addLocation("New York", masterMenu, storeList);
addLocation("San Francisco", masterMenu, storeList);
addLocation("Chicago", masterMenu, storeList);

changeMenu(0, 0, "toppings", "jelly");
changeMenu(0, 0, "name", "Super Cheese");

// hide container placeholders
document.getElementById("locations").style.display = "none";
document.getElementById("pizzas").style.display = "none";
document.getElementById("toppings").style.display = "none";

// populate and un-hide parent container 
displayOptions(storeList, "locations", "location");
document.getElementById("locations").style.display = "block";

// populate child container and unhide
for (let i = 0; i < storeList.length; i++) {
    document.getElementById("location" + i).onclick = () => {
        displayOptions(storeList[i].menu, "pizzas", "name");
        document.getElementById("pizzas").style.display = "block";  

        // populate grandchild container
        for (let j = 0; j < storeList[i].menu.length; j++) {
            document.getElementById("name" + j).onclick = () => {
                displayOptions(storeList[i].menu[j].toppings, "toppings", "toppings");
                document.getElementById("toppings").style.display = "block";
            }
        }
    }
}






