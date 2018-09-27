let baseUrl = "http://localhost:3000/chores"
let form = document.querySelector("#new-chore-form")
const choreList = document.querySelector("#chore-list")

document.addEventListener("DOMContentLoaded", init)
form.addEventListener("submit", handleSubmit)
choreList.addEventListener('click', handleDeleteClick)

function init(){
  fetchChores()
}

function fetchChores(){
  return fetch(baseUrl)
  .then(res => res.json())
  .then(chores => {
    chores.forEach(chore => createChoreCard(chore))
      // function(chore){
      // createChoreCard(chore)})
  })
}

function createChoreCard(chore){
  let choreCard = `
  <div class="chore-card">
    <button class="delete-button" data-id="${chore.id}">x</button>
    <h3> ${chore.title} </h3>
    <p> Duration: ${chore.duration} </p>
    <input value="${chore.priority}"/>
  </div>
  `
  // append can only be used with createdElement
  // innerHTML can only be used with string (see above)
  choreList.innerHTML += choreCard
}

function handleSubmit(e){
  e.preventDefault()
  let inputTitle = e.target.title
  let inputPriority = e.target.priority
  let inputDuration = e.target.duration

  let data = {
    title: inputTitle.value,
    priority: inputPriority.value,
    duration: inputDuration.value
  }

  postChore(data)
  .then(chore => createChoreCard(chore))

  inputTitle.value = ""
  inputPriority.value = ""
  inputDuration.value = ""

}

function postChore(data){
  return fetch(baseUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

function handleDeleteClick(e){
  if (e.target.className === "delete-button"){
    deleteChore(e.target.dataset.id)
    let card = e.target.parentElement
    card.remove()
  }
}

function deleteChore(id){
  let choreUrl = baseUrl + `/${id}`
  fetch(choreUrl, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
                     }
  }).then(res => res.json()).then(console.log)
}
