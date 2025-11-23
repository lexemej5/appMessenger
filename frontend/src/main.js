
const containerOne = document.querySelector(".container1");
const containerTwo = document.querySelector(".container2");
const userNameInput = document.querySelector("#input")
const genLinkBtn = document.querySelector(".btnGenerate")
const msgBox = document.querySelector(".message-box")
const linkInput = document.querySelector(".link-input")
const msgHeading = document.querySelector(".msg-heading")
const sendInput = document.querySelector(".send-input")
const submit = document.querySelector(".submit")
const copyBtn = document.querySelector(".copy-btn")
const searchParams = new URLSearchParams(window.location.search)
const URLBACKEND = import.meta.env.VITE_BACKEND_URL
let user_id = null;

getMode();
setInterval(()=>{
render()
}, 2000)
function tap(){
   genLinkBtn.addEventListener("click",(e)=>{
   e.preventDefault()
    const username = userNameInput.value.toLowerCase().trim()
  
    if(!username){
        return alert("Enter a username")   
    }
   signup(username)
   copyLink();
  })
}

tap();

function getMode(){
const to = searchParams.get("to")
if(!to){
containerTwo.classList.add("hidden")
containerOne.classList.add("show")
return;
}

containerOne.classList.add("hidden")
containerTwo.classList.add("show")
sendMessage(to);
}

async function render(){
const user = localStorage.getItem("username")

if(user){
const res =  await fetch(`${URLBACKEND}/getMessage/${user}`)
const data = await res.json()
if(!data.successful || data.message.length === 0){
msgHeading.classList.add("hidden")
const ol = msgBox.querySelector(".lists")
ol.innerHTML  = ""
return;
}
const ol = msgBox.querySelector(".lists")
ol.innerHTML  = ""
msgHeading.classList.add("show")
data.message.map((datum)=>{
const li = document.createElement("li")
li.textContent = datum
li.textContent = li.textContent.replace(/^\w+/, w => w[0].toUpperCase() + w.slice(1));
ol.append(li)
})
}
else{
msgHeading.classList.add("hidden")
return;
}
}

function genLink(username){
const neWURL = new URL(`${window.location.origin}/?to=${username}`)
return neWURL;
}


async function signup(username){
    try{
    const res = await fetch(`${URLBACKEND}/user/signup`, {
    method : "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
    username
})
})

 const data = await res.json()
  if(data.successful){
  user_id = data.userId;
  localStorage.setItem("username", username);
  const userURL = genLink(username);
  linkInput.value = userURL;
  alert(data.message)
  return;
  }

  return alert(data.message)
} catch(e){
 return alert(e)
}
}

function copyLink(){
copyBtn.addEventListener("click", ()=>{
if(!linkInput.value) return alert("No link to copy")
navigator.clipboard.writeText(linkInput.value)
.then(()=>{
alert("Link copied")
}).catch((e)=> alert("Failed to copy"))
})
}


function sendMessage(to){
const user = document.querySelector(".user")
const span = document.createElement("span")
user.innerHTML = `Send Message To <span style="color: blue; font-weight: 900; text-transform: capitalize; font-family: cursive;">${to}</span>`;
submit.addEventListener("click", async(e)=>{
e.preventDefault()
const message = sendInput.value
if(!message){
return alert("Enter some messages")
}
const res = await fetch(`${URLBACKEND}/message`,{
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({
message,
to
})
})
const data = await res.json()
if(data.successful){
sendInput.value = ""   
return alert(data.message)
}
return alert(data.message)
})
}