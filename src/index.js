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

function renderAllPersons(){
  personFacade.getAllPersons().then((persons) => {
    console.log(persons);
    const personRows = persons.map(
      (person) => `
      <tr>
        <td>
        ${person.id}
        </td>    
        <td>
        ${person.firstName}
        </td>    
        <td>
        ${person.lastName}
        </td>    
        <td>
        ${person.email}
        </td> 
        <td>
        ${person.phoneList}
        </td>
        <td>
        ${person.address.street}
        </td>
        <td>
        ${person.address.zip}
        </td>
        <td>
        ${person.address.city}
        </td>
        <td>
        ${person.address.additionalInfo}
        </td>          
        <td>
        ${person.hobbyList[0].name}
        </td>          
      </tr>
      `
    );
    const personRowsAsString = personRows.join("");
    //console.log(users);//To check if we get any data
    document.getElementById("tbody").innerHTML = personRowsAsString;
  });
}
renderAllPersons();

