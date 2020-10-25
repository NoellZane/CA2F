import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade";

document.getElementById("all-content").style.display = "block"


function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("search_html").style = "display:none"
  document.getElementById("manage_person_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
  if (idToShow === "manage_person_html") {
    document.getElementById("personTable").style = "display:block"
  }
  else {
    document.getElementById("personTable").style = "display:none"
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
      ${data.phoneList.map(phone=>phone.number).join(", ")}
      </td>
      <td>
      ${data.phoneList.map(phone=>phone.description).join(", ")}
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
      ${data.hobbyList.map(hobby=>hobby.name).join(", ")}
      </td>
      <td>
      <button id="x${data.id}" class="btn" style="background-color:rgb(190, 195, 204);margin-top: 10px;">Edit</button>
      </td>              
    </tr>
    `)
  }).join(" ")

  return createTable;
}



function addListeners(){
  personFacade.getAllPeople().then((persons) => {
  
  persons.forEach(element => {
    
    let buttonToEdit=document.getElementById("x"+element.id)
    
    buttonToEdit.addEventListener("click", function (event){
      event.preventDefault
      hideAllShowOne("edit_person_html");
      fillUpHobbyBox("hobbyBoxE")
      document.getElementById("editID").value=element.id
      document.getElementById("editID").placeholder=element.id
      document.getElementById("editFirstName").placeholder=element.firstName
      document.getElementById("editLastName").placeholder=element.lastName
      document.getElementById("editEmail").placeholder=element.email
      document.getElementById("editStreet").placeholder=element.address.street
      document.getElementById("editAdditionalInfo").placeholder=element.address.additionalInfo
      document.getElementById("editCity").placeholder=element.address.city
      document.getElementById("editZip").placeholder=element.address.zip 

      document.getElementById("editPersonBtn").addEventListener("click", function(event){
        event.preventDefault

      const  editedPerson= {
          id: element.id,
          firstName: document.getElementById("editFirstName").value,
          lastName: document.getElementById("editLastName").value,
          email: document.getElementById("editEmail").value
        }
        personFacade.editPerson(editedPerson)
        .then(document.getElementById("error1").innerHTML = "PERSON EDITED")
        .then(renderAllPeople())
        .catch(err => {
          if (err.status) {
            err.fullError.then(e => document.getElementById("error1").innerHTML = e.message)//send to innerHTML
          }
          else {
            document.getElementById("error").innerHTML ="Network error has accured: could not add new person"
            console.log("Network error! Cold not add PErson")
          }
        })
      })
      

  
      
  });
  
  })
})
}


function renderAllPeople() {
  personFacade.getAllPeople().then((persons) => {
    console.log(persons);
    // console.log(persons);//To check if we get any data
    document.getElementById("tbody").innerHTML = makeTable(persons);
  })
  .catch(err => {
    if (err.status) {
      err.fullError.then(e => document.getElementById("error").innerHTML = e.message)//send to innerHTML
    }
    else {
      document.getElementById("error").innerHTML ="Network error has accured: could not load the list of people"
      console.log("Network error! Cold not add  load the list of people")
    }
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
  })
  .catch(err => {
    if (err.status) {
      err.fullError.then(e => document.getElementById("error").innerHTML = e.message)//send to innerHTML
    }
    else {
      document.getElementById("error").innerHTML ="Network error has accured: could load zip codes"
      console.log("Network error! Cold not load zip codes")
    }
  })
  ;
}

function fillUpZipCodes() {

  personFacade.getAllZipCodes().then(data => {
    let options = `<option selected disabled>ZipCode...</option>`
    const optionList = data.map(zip => `
  <option value="${zip.zipCode}">${zip.zipCode}</option>  
  `)
    const optionsAsString = options + optionList.join("")

    document.getElementById("inputZip").innerHTML = optionsAsString
    document.getElementById("editZip").innerHTML = optionsAsString


    })
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message)//send to innerHTML
      }
      else {
        document.getElementById("error").innerHTML ="Network error has accured: could not load zip codes"
        console.log("Network error! Cold not load zipcodes")
      }
    })
  }

  function fillUpHobbyBox(idOfBox){
    personFacade.getAllHobbies().then(data => {
      let checkbox = data.map(hobby => `
      <input type="checkbox" value="${hobby.name}" id="${hobby.name}">
            <label for="${hobby.name}">
            ${hobby.name}
            </label>
      `)
      const checkboxAsString=checkbox.join("")
      //document.getElementById("hobbyBox").innerHTML=checkboxAsString
      document.getElementById(idOfBox).innerHTML=checkboxAsString

    })
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message)//send to innerHTML
      }
      else {
        document.getElementById("error").innerHTML ="Network error has accurred: could not load hobbies"
        console.log("Network error! Could not load hobbies")
      }
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
        .catch(err => {
          if (err.status) {
            err.fullError.then(e => document.getElementById("error").innerHTML = e.message)//send to innerHTML
          }
          else {
            document.getElementById("error").innerHTML ="Network error has accured: could not add new person"
            console.log("Network error! Cold not add PErson")
          }
        })
  
    
    })
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message)//send to innerHTML
      }
      else {
        document.getElementById("error").innerHTML ="Network error has accured: could not  load hobbies"
        console.log("Network error! Cold not load hobbies")
      }
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
  fillUpHobbyBox("hobbyBox");
  addListeners();

 