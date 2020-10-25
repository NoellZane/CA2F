import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade";

document.getElementById("all-content").style.display = "block"


function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("search_html").style = "display:none"
  document.getElementById("manage_person_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
  if (idToShow === "about_html") {
    document.getElementById("personTable").style = "display:none"
  }
  else {
    document.getElementById("personTable").style = "display:block"
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
function makeZipTableRows(data) {
  const createTable = data.map(function (data) {
    return (`
    <tr>
      <td>
      ${data.zipCode}
      </td>    
      <td>
      ${data.city}
      </td>    
    </tr>
    `)
  }).join(" ")
  return createTable;
}
function makeTable(data) {
  const createTable = data.map(function (data) {
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
function renderAllPeople() {
  personFacade.getAllPeople().then((persons) => {
    console.log(persons);
    // console.log(persons);//To check if we get any data
    document.getElementById("tbody").innerHTML = makeTable(persons);
  });
}
function getAllPeopleByCity() {
  let city = document.getElementById("searchField").value;
  personFacade.getAllPeopleByCity(city).then((persons) => {
    // console.log(persons);//To check if we get any data 
    document.getElementById("tbody").innerHTML = makeTable(persons);
  });
}
function getAllPeopleByZip() {
  let zip = document.getElementById("searchField").value;
  personFacade.getAllPeopleByZip(zip).then((persons) => {
    // console.log(persons);//To check if we get any data
    document.getElementById("tbody").innerHTML = makeTable(persons);
  });
}
function getAllPeopleByHobby() {
  let hobby = document.getElementById("searchField").value;
  personFacade.getAllPeopleByHobby(hobby).then((persons) => {
    // console.log(persons);//To check if we get any data
    document.getElementById("tbody").innerHTML = makeTable(persons);
  });
}

function getAllZipCodes() {
  personFacade.getAllZipCodes().then((data) => {
    // console.log(data);//To check if we get any data
    let zipTable = `<table class="table"><thead><tr><th>Zip</th><th>City</th></tr></thead>`;
    document.getElementById("forZip").innerHTML = zipTable + makeZipTableRows(data);
    console.log(makeZipTableRows(data));
  });
}

function fillUpZipCodes() {

  personFacade.getAllZipCodes().then(data => {
    let options = `<option selected disabled>ZipCode...</option>`
    const optionList = data.map(zip => `
  <option value="${zip.zipCode}">${zip.zipCode}</option>  
  `)
    const optionsAsString = options + optionList.join("")

    document.getElementById("inputZip").innerHTML = optionsAsString
    
    })
  }

  function fillUpHobbyBox(){
    personFacade.getAllHobbies().then(data => {
      let checkbox = data.map(hobby => `
      <input type="checkbox" value="${hobby.name}" id="${hobby.name}">
            <label for="${hobby.name}">
            ${hobby.name}
            </label>
      `)
      const checkboxAsString=checkbox.join("")
      document.getElementById("hobbyBox").innerHTML=checkboxAsString
    })
  }



let buttAddPerson = document.getElementById("addPersonBtn")

buttAddPerson.addEventListener("click", function (event) {
    event.preventDefault
 
personFacade.getAllHobbies().then(data => {
  let chosenHobbyList =[]
      data.forEach(element => {
        if(document.getElementById(element.name).checked){
               const hobby = {
          name: element.name
        }
        chosenHobbyList.push(hobby)
      }
      });
      console.log(chosenHobbyList)
      const newPerson = {
        firstName: document.getElementById("inputFirstName").value,
        lastName: document.getElementById("inputLastName").value,
        email: document.getElementById("inputEmail").value,
        phoneList: [
          {
            number: document.getElementById("inputNumber").value,
            description: document.getElementById("inputPhoneDescription").value
          }],
  
        hobbyList: chosenHobbyList,
  
        address: {
          zip: document.getElementById("inputZip").value,
          additionalInfo: document.getElementById("inputAdditionalInfo").value,
          street: document.getElementById("inputStreet").value,
          city: "Default"
        }
  
      }
  
  console.log(newPerson)
      const perosn = personFacade.addPerson(newPerson)
        .then(document.getElementById("error").innerHTML = "PERSON ADD")
        .then(renderAllPeople())
  
    
    })

    
    

  })



document.getElementById("peopleByCity").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("personTable").style = "display:block"
    document.getElementById("forZip").style = "display:none"
    getAllPeopleByCity();
  });

  document.getElementById("peopleByZip").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("personTable").style = "display:block"
    document.getElementById("forZip").style = "display:none"
    getAllPeopleByZip();
  });
  document.getElementById("submitHobby").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("personTable").style = "display:block"
    document.getElementById("forZip").style = "display:none"

    getAllPeopleByHobby();

  });
  document.getElementById("getAllZipCodes").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("personTable").style = "display:none"
    document.getElementById("forZip").style = "display:block"
    getAllZipCodes();

  });

  renderAllPeople();
  fillUpZipCodes();
  fillUpHobbyBox();