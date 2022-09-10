const fs=require("fs");
//fs.readFile("f1.txt",cb1);

fs.readFile("f1.txt",function cb1(err,res){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(res+" ");
        fs.readFile("f2.txt",function cb2(err,res){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(res+" ");
                fs.readFile("f3.txt",function cb3(err,res)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log(res+"");
                        console.log("All files read");
                    }
                })
            }
        })
    }
})
// fs.readFile("f1.txt",cb1);
// function cb1(err,res)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(res+" ");
//         fs.readFile("f2.txt",cb2);
//     }
// }

// function cb2(err,res)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(res+" ");
//         console.log("data printed");
//     }
// }


fs.readFile("f1.txt",cb);
fs.readFile("f2.txt",cb);
fs.readFile("f3.txt",cb);

function cb(err,res)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(res+"");
    }
}