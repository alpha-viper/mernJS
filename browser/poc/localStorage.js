localStorage.setItem("name","Sumit");
localStorage.setItem("lastname","Mishra");
localStorage.setItem("Stream", "CSE");
localStorage.setItem("place", "Delhi");
localStorage.hobby = "reading";
let data = localStorage.getItem("name");
let data1 = localStorage.name;
console.log(data);
console.log(data1);

let a=localStorage.removeItem("name");
delete localStorage.name;

let l = localStorage.length;
console.log(l);

let d = localStorage.key(1);
console.log(d);