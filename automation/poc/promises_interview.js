// 1. read 3 files serially using promises

// 2nd way to overcome callback hell is to use promise

const fs=require("fs");

let f1readPromise=fs.promises.readFile("f1.txt");

function read2file(f1kdata)
{
    console.log(f1kdata+"");
    let f2readPromise=fs.promises.readFile("f2.txt");
    return f2readPromise;
}

function read3file(f2kdata)
{
    console.log(f2kdata+"");
    let f3readPromise=fs.promises.readFile("f3.txt");
    return f3readPromise;
}

function alldone(f3kdata)
{
    console.log(f3kdata+"");
    console.log("all files read serially");
}

f1readPromise.then(read2file)
.then(read3file)
.then(alldone)
.catch(function(err){
    console.log(err);    
})

// 2.read files f1.txt,f2.txt,f3.txt parallely

let f1p=fs.promises.readFile("f1.txt");
let f2p=fs.promises.readFile("f2.txt");
let f3p=fs.promises.readFile("f3.txt");

f1p.then(function cb(data){
    console.log(data+"");
})

f2p.then(cb);
f3p.then(cb);

function cb(data)
{
    console.log(data+"");
}