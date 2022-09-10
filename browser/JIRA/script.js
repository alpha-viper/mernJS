var uid = new ShortUniqueId();
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1]; //black
let textAreaCont = document.querySelector(".textarea-cont");
const mainCont = document.querySelector(".main-cont");
let ticketsArr = [];
let removeBtn=document.querySelector("remove-btn");
let toolBoxColors = document.querySelectorAll(".color");

//to open close modal container
let isModalPresent = false;
addBtn.addEventListener("click", function () {
  if (!isModalPresent) {
    modalCont.style.display = "flex"; //modal add ho gya screen pe
    // isModalPresent = true;
  } else {
    modalCont.style.display = "none";
    // isModalPresent = false;
  }
  isModalPresent = !isModalPresent; //toggling effect
});

// console.log(allPriorityColors);

//to remove and add active class from each priority color of modal container
allPriorityColors.forEach(function (colorElement) {
  colorElement.addEventListener("click", function () {
    allPriorityColors.forEach(function (priorityColorElem) {
      priorityColorElem.classList.remove("active");
    });
    colorElement.classList.add("active");
    modalPriorityColor = colorElement.classList[0];
  });
});

//to generate and display a ticket 
modalCont.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key == "Shift") {
    console.log(modalPriorityColor);
    console.log(textAreaCont.value);
    createTicket(modalPriorityColor, textAreaCont.value);
    modalCont.style.display = "none";
    isModalPresent = false;
    textAreaCont.value = "";
    allPriorityColors.forEach(function (colorElem) {
      colorElem.classList.remove("active");
    });
  }
});

//function to create new ticket 
function createTicket(ticketColor, data, ticketId) {
    let id = ticketId || uid();
    let ticketCont = document.createElement("div"); //<div></div>
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor} "></div>
        <div class="ticket-id">${id}</div>
        <div class="task-area">${data}</div>
    `;

    mainCont.appendChild(ticketCont);

    handleRemoval(ticketCont, id);
    handleColor(ticketCont, id);
    handleLock(ticketCont, id);
    //if ticket is being created for the first time , then ticketId would be undefined
    if (!ticketId) {
        ticketsArr.push(
            {
                ticketColor,
                data,
                ticketId: id
            }
        );
        localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    }
};

//get all tickets from local Storage
if (localStorage.getItem("tickets")) {
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach(function(ticketObj){
        createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
    })
}

//filter tickets on the basis of ticketColor
for (let i = 0; i < toolBoxColors.length; i++){
    toolBoxColors[i].addEventListener("click", function () {
        let currToolBoxColor = toolBoxColors[i].classList[0];

        let filteredTickets = ticketsArr.filter(function (ticketObj) {
            return currToolBoxColor == ticketObj.ticketColor;
        });

        //remove all the tickets
        let allTickets = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < allTickets.length; i++){
            allTickets[i].remove();
        }

        //display filteredTickets
        filteredTickets.forEach(function (ticketObj) {
            createTicket(
              ticketObj.ticketColor,
              ticketObj.data,
              ticketObj.ticketId
            );
        })
    })

    //to display all the tickets of all colors on double clicking
    toolBoxColors[i].addEventListener("dblclick", function () {
      //remove all the color specific tickets 
        let allTickets = document.querySelectorAll(".ticket-cont");
      for (let i = 0; i < allTickets.length; i++) {
        allTickets[i].remove();
      }

      //display all Tickets
      ticketsArr.forEach(function (ticketObj) {
        createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
      });
    })
}

// remove button's function

let removeBtnActive=false;
removeBtn.addEventListener("click",function(){
    if(removeBtnActive)
    {
        removeBtn.style.color="red";
    }
    else
    {
        removeBtn.style.color="white";
    }
    removeBtnActive=!removeBtnActive;
})


//remove tickets from local storage nad UI
function handleRemoval(ticket,id)
{
  ticket.addEventListener("click",function(){
    if(!removeBtnActive) return;
    let idx=getTicketIdx(id);
    ticketsArr.splice(idx,1);

    localStorage.setItem("tickets",JSON.stringify(ticketsArr));

    //frontend remove
    ticketsArr.remove();
  })

  function getTicketIdx(id)
  {
    let ticketIdx=ticketsArr.findIndex(function(ticketObj){
      return ticketObj.ticketId==id;
    })
    return ticketIdx;
  }
}

//change priority color of the tickets
function handleColor(ticket, id) {
  let ticketColorStrip = ticket.querySelector(".ticket-color"); 

  ticketColorStrip.addEventListener("click", function () {
      let currTicketColor = ticketColorStrip.classList[1]; //lightpink
      //["lightpink", "lightgreen", "lightblue", "black"];
      let currTicketColorIdx = colors.indexOf(currTicketColor); //0

      let newTicketColorIdx = currTicketColorIdx + 1; //1

      newTicketColorIdx = newTicketColorIdx % colors.length; //1
      let newTicketColor = colors[newTicketColorIdx]; //lightgreen

      ticketColorStrip.classList.remove(currTicketColor); //lightpink [ticket-color, lightpink]-> [ticket-color]
      ticketColorStrip.classList.add(newTicketColor);

      //local storage update 
      let ticketIdx = getTicketIdx(id);
      ticketsArr[ticketIdx].ticketColor = newTicketColor;
      localStorage.setItem("tickets", JSON.stringify(ticketsArr));

  });
}

//lock and unlock to make content editable true or false 
function handleLock(ticket, id) {
  //icons ko append in ticket
  //toggle of icons and contenteditable property
}