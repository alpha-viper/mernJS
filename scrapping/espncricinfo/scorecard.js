const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");

function getInfoFromScorecard(url)
{
    //console.log("from scorecard.js",url);
    request(url,cb);
}


function cb(err,res,body) {
    if (err) {
        console.log(err);
    }
    else {
        getMatchDetails(body);
    }
}


function getMatchDetails(html)
{
    let selecTool=cheerio.load(html);
    let desc = selecTool(".match-header-info.match-info-MATCH");

    let descArr = desc.text().split(",");
    //Match (N), Abu Dhabi, Oct 25 2020, Indian Premier League
      // console.log(descArr);
      let dateOfMatch = descArr[2];
      let venueOfMatch = descArr[1];
      //console.log(dateOfMatch);
      //console.log(venueOfMatch);
      //3. get result
        let matchResEle = selecTool(
          ".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text"
        );
    let matchResult = matchResEle.text();;
     //   console.log(matchResult);
    //4. get team names
    let teamNameArr = selecTool(".name-detail>.name-link");
    // console.log(teamNames.text());
    let ownTeam = selecTool(teamNameArr[0]).text();
    let opponentTeam = selecTool(teamNameArr[1]).text();
    //console.log(ownTeam);
    //console.log(opponentTeam);

    //5. get innings
    let allBatsmenRows=selecTool(".table.batsman tbody>tr");
    //console.log(allBatsmenRows.text());
    let allBatsmenTable = selecTool(".table.batsman tbody");
  //console.log("number of batsmen tables are ->   ",allBatsmenTable.length);
  let htmlString = "";
  let count = 0;
  for (let i = 0; i < allBatsmenTable.length; i++) {
    htmlString = htmlString + selecTool(allBatsmenTable[i]).html();
    //Get the descendants(table rows ) of each element (table )
    let allRows = selecTool(allBatsmenTable[i]).find("tr"); // -> data of batsmen + empty rows 
    
    for (let i = 0; i < allRows.length; i++) {
      //Check to see if any of the matched elements have the given className
      let row = selecTool(allRows[i]);
      let firstColmnOfRow = row.find("td")[0];
      if (selecTool(firstColmnOfRow).hasClass("batsman-cell")) {
        //will be getting valid data
        // count++;
        // console.log("inside " + count);
        // name | runs | balls | 4's | 6's | sr
        // for (let i = 0; i < 8; i++) {
        //   if (i == 1 || i == 4) continue;
        //   else {
        //     console.log(selecTool(row.find("td")[i]).text());
        //   }
        // }
        let playerName = selecTool(row.find("td")[0]).text().trim();
        // console.log(playerName);
        let runs = selecTool(row.find("td")[2]).text();
        let balls = selecTool(row.find("td")[3]).text();
        let numberOf4 = selecTool(row.find("td")[5]).text();
        let numberOf6 = selecTool(row.find("td")[6]).text();
        let sr = selecTool(row.find("td")[7]).text();

        // console.log(
        //   `playerName -> ${playerName} runsScored ->  ${runs} ballsPlayed ->  ${balls} numbOfFours -> ${numberOf4} numbOfSixes -> ${numberOf6}  strikeRate-> ${sr}`
        // );

        let teamNamePath=path.join(__dirname,"IPL",ownTeam);
        if(!fs.existsSync(teamNamePath))
        {
          fs.mkdirSync(teamNamePath);
        }
        }
    }
}

}

module.exports={
    gifs:getInfoFromScorecard,
};