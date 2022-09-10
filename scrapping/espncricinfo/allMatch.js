//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request=require("request");
const cheerio=require("cheerio");
const {gifs}=require("./scorecard");
//const scorecardObj=reuire("scorecard"); -> scoreCardObj.gifs();
function getAllMatch(url){
    console.log(url);
    request(url,cb);
}

function cb(err,res,body)
{
    if(err)
    {
        console.log("error",err);
    }
    else
    {
        extractAllMatchLink(body);
    }
}



function extractAllMatchLink(html)
{
    let selecTool=cheerio.load(html);
    let scorecardElemArr=selecTool('a[data-hover="Scorecard"]');

    
    console.log(scorecardElemArr.length);
    //let fullLink="https://www.espncricinfo.com"+relativeLink;
    //console.log(fullLink);

    for(let i=0;i<scorecardElemArr.length;i++)
    {
        let scorecardLink=selecTool(scorecardElemArr[i]).attr("href");
        //console.log(scorecardLink);
        let fullLink = "https://www.espncricinfo.com" + scorecardLink;
        gifs(fullLink);
    }
    
}

module.exports = {
    getAllMatch:getAllMatch,

};