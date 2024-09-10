const divAddress = document.querySelector("#address");
const divTemp = document.querySelector("#temp");
const divIcon = document.querySelector("#icon");
export default class {
  showCurrentCondition(data) {
    console.log(divAddress);
    divAddress.textContent = data.address;
    divTemp.textContent = data.currentConditions.temp;
    divIcon.textContent = data.currentConditions.conditions;
  }
}
