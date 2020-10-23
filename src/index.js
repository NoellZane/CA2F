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
    const personRows = persons.map(
      (person) => `
      <tr>
        <td>
        ${person.id}
        </td>    
        <td>
        ${person.age}
        </td>    
        <td>
        ${person.name}
        </td>    
        <td>
        ${person.gender}
        </td> 
        <td>
        ${person.email}
        </td>  
      </tr>
      `
    );
    const personRowsAsString = personRows.join("");
    //console.log(users);//To check if we get any data
    document.getElementById("allPersonRows").innerHTML = personRowsAsString;
  });
}
renderAllPersons();


