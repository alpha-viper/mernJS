let rows=100;
let cols=26;

let addressColCont= document.querySelector(".address-col-cont");
let addressRowCont= document.querySelector(".address-row-cont");
let cellsCont=document.querySelector(".cells-cont");
let addressBar=document.querySelector(".address-bar");

for(let i=0;i<rows;i++){
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addressColCont.append(addressCol);
}

for(let i=0;i<cols;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.append(addressRow);
}

for(let i=0;i<rows;i++)
{
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<cols;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        rowCont.appendChild(cell);
        addListenerForAdressBarDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont);   
}

function addListenerForAdressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowId=i+1;
        let colId=String.fromCharCode(65+j);
        addressBar.value=`${colId}${rowId}`;
    })
}