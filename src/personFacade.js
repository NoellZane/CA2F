const URL = "https://dosmarter.tech/CA2/api/person/";

function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }
   

  function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }

   function getAllPersons(){
    return fetch(URL + "allpeople") //Returns promise
    .then(handleHttpErrors);
   }
   function getAllPersonsFromCity(city){
    return fetch(URL + "livingin/"+city) //Returns promise
    .then(handleHttpErrors);
   }
   function addPerson(person){
     let options = makeOptions("POST",person)
    return fetch(URL,options) //Returns promise
    .then(handleHttpErrors);
   }
   function editPerson(person){
    let options = makeOptions("PUT", person);
    // console.log(options);
    return fetch(URL+id, options)
    .then(handleHttpErrors);
  }
  function deletePerson(id) {
    let options = makeOptions("DELETE");
    return fetch(URL + id, options)
    .then(handleHttpErrors);
  }
   const personFacade = {
    //Object with the five functions in it
    getAllPersons,
    addPerson,
    editPerson,
    deletePerson,
    getAllPersonsFromCity
  };
   export default personFacade;