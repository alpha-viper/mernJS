// spread operator
// It is used to split up arr elements or object properties

let nums=[1,2,3]
const newNums=[...nums,4] //[1,2,3,4]
const nums2=[nums,4] //[[1,2,3],4]

const oObj={
    name:"Sumit",
    age:23
}

const nObj={...oObj,age:32};

console.log(nObj); //name:Sumit,age:32


function fun(...args)
{
    console.log(args);
    console.log(typeof args); //object sorta array

    args.forEach((arg)=>{
        console.log(arg);
    })
}

fun("how","are",1,"you");
