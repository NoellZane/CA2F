import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade";

document.getElementById("all-content").style.display = "block"


function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("search_html").style = "display:none"
  document.getElementById("manage_person_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
  if(idToShow==="about_html"){
    document.getElementById("personTable").style= "display:none"
  }
  else{
    document.getElementById("personTable").style= "display:block"    
  }
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "search": hideAllShowOne("search_html"); break
    case "manage_person": hideAllShowOne("manage_person_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
function makeTable(data){
  const createTable = data.map(function (data){
    return (`
    <tr>
      <td>
      ${data.id}
      </td>    
      <td>
      ${data.firstName}
      </td>    
      <td>
      ${data.lastName}
      </td>    
      <td>
      ${data.email}
      </td> 
      <td>
      ${data.phoneList}
      </td>
      <td>
      ${data.address.street}
      </td>
      <td>
      ${data.address.zip}
      </td>
      <td>
      ${data.address.city}
      </td>
      <td>
      ${data.address.additionalInfo}
      </td>          
      <td>
      ${data.hobbyList[0].name}
      </td>          
    </tr>
    `)
  }).join(" ")
  return createTable;
}
function renderAllPeople(){
  personFacade.getAllPeople().then((persons) => {
    console.log(persons);
  // console.log(persons);//To check if we get any data
      document.getElementById("tbody").innerHTML = makeTable(persons);
  });
}
function getAllPeopleByCity(){
  let city = document.getElementById("searchField").value;
personFacade.getAllPeopleByCity(city).then((persons) => {
  // console.log(persons);//To check if we get any data 
   document.getElementById("tbody").innerHTML = makeTable(persons);
});
}
function getAllPeopleByZip(){
  let zip = document.getElementById("searchField").value;
personFacade.getAllPeopleByZip(zip).then((persons) => {
  // console.log(persons);//To check if we get any data
  document.getElementById("tbody").innerHTML = makeTable(persons);
});
}
function getAllPeopleByHobby(){
  let hobby = document.getElementById("searchField").value;
personFacade.getAllPeopleByHobby(hobby).then((persons) => {
  // console.log(persons);//To check if we get any data
  document.getElementById("tbody").innerHTML = makeTable(persons);
});
}

document.getElementById("peopleByCity").addEventListener("click", function (event) {
  event.preventDefault();
  getAllPeopleByCity();
});

document.getElementById("peopleByZip").addEventListener("click", function (event) {
  event.preventDefault();
  getAllPeopleByZip();
});
document.getElementById("submitHobby").addEventListener("click", function (event) {
  event.preventDefault();
  getAllPeopleByHobby()
});

renderAllPeople();