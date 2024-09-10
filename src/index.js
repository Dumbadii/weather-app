import "./style.css";
import Model from "./model";
import View from "./view";
const model = new Model();
const view = new View();
model.getWeather("London", "", "", view.showCurrentCondition);
console.log("await");
