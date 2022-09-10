const puppeteer=require('puppeteer');
let email="sumitmishra2711@gmail.com";
let password="sumit2798";
let {answers}=require("./codes");
let cTab;


let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    //executablePath: "/path/to/Chrome",
  });
  browserOpenPromise.then(function(browser){
      console.log("Browser opened");
      //cosnsole.log(browser);
      //An array of all open pages inside the browser
      let allTabsPromise=browser.pages();
      return allTabsPromise;
  })
  .then(function(allTabsArr){
      cTab=allTabsArr[0];
      console.log("new tab");
      //URL to navigate page to
      let visitingLoginPagePromise=cTab.goto("https://www.hackerrank.com/auth/login");
      return visitingLoginPagePromise;

  }).then(function(){
      console.log("Hackerrank login page opened");
      let emailWillBeTypedPromise=cTab.type("input[name='username']",email);
      return emailWillBeTypedPromise;
  }).then(function(){
      console.log("email is typed");
      let passwordWillBeTypedPromise=cTab.type("input[name='password']",password);
      return passwordWillBeTypedPromise;
  }).then(function(){
      console.log("Password is typed");
      let willBeLoggedInPromise=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
      return willBeLoggedInPromise;
  }).then(function(){
      console.log("logged in hackerrank successfully");
      let algorithmTabWillBeOPenedPromise = waitAndClick(
        "div[data-automation='algorithms']"
      );
      return algorithmTabWillBeOPenedPromise;
  }).then(function(){
        console.log("algorithms is opened");
        let allQuesPromise=cTab.waitForSelector('a[data-analytics="ChallengeListChellengeName"]');
        return allQuesPromise;
  }).catch(function(err){
      console.log(err);
  })
  
  .then(function(){
       function getAllQuesLinks(){
           let allElemArr=document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]');
           
           let linksArr=[];
           for(let i=0;i<allElemArr.length;i++)
           {
                linksArr.push(allElemArr[i].getAttribute("href"));
           }
           return linksArr;
       } 
       let linksArrPromise=cTab.evaluate(getAllQuesLinks);
       return linksArrPromise;
  }).then(function(linksArr){
        console.log("links to all question recieved");
        //console.log(linksArr);
        //question slove karna hai
        let questionWillBeSolvedPromise = questionSolver(linksArr[0], 0);
        for (let i = 1; i < linksArr.length; i++){
          questionWillBeSolvedPromise = questionWillBeSolvedPromise.then(function () {
            return questionSolver(linksArr[i], i);
          })
          // a = 10;
          // a = a + 1;
        }
        return questionWillBeSolvedPromise;
  }).then(function(){
        console.log("question is solved");
  }).catch(function(err){
      console.log(err);
  });
  

  function waitAndClick(algoBtn)
  {
        let waitClickPromise=new Promise(function(resolve,reject){
            let waitForSelectorPromise=cTab.waitForSelector(algoBtn);
            waitForSelectorPromise.then(function(){
                console.log("algobtn is found");
                let clickPromise=cTab.click(algoBtn);
                return clickPromise;
            }).then(function(){
                console.log("algo btn is clicked");
                resolve();
            }).catch(function(err){
                reject(err);
                //console.log(err);
            })
        });
        // waitClickPromise.then(function () {
        //   console.log("inside then of waitclick");
        // });
        return waitClickPromise;
  }

  function questionSolver(url,idx)
  {
    return new Promise(function(resolve,reject){
        let fullLink=`https://www.hackerrank.com${url}`;
        let gotoQuesPagePromise=cTab.goto(fullLink);
        gotoQuesPagePromise.then(function(){
            console.log("question opened");
            let waitForCheckBoxAndWaitForPromise=waitAndClick(".checkbox-input");
            return waitForCheckBoxAndWaitForPromise;
            //resolve();
        }).then(function(){
            // select the box where code will be typed
            let waitForTextBoxPromise=cTab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        }).then(function(){
            let codeWillBeTypedPromise=cTab.type(".custominput",answers[idx]);
            return codeWillBeTypedPromise;
        }).then(function(){
            // ctrl is pressed
            let controlPressedPromise=cTab.keyboard.down("Control");
            return controlPressedPromise;
        }).then(function(){
            let aKeyPressedPromise=cTab.keyboard.press("a");
            return aKeyPressedPromise;
        }).then(function(){
            let xKeyPressedPromise=cTab.keyboard.press("x");
            return xKeyPressedPromise;
        }).then(function(){
            //select the editor
            let cursorOnEditorPromise=cTab.click(".monaco-editor.no-user-select.vs");
            return cursorOnEditorPromise;
        }).then(function(){
            let aKeyPressedPromise=cTab.keyboard.press("a");
            return aKeyPressedPromise;
        }).then(function(){
            let vKeyPressedPromise=cTab.keyboard.press("v");
            return vKeyPressedPromise;
        }).then(function(){
            let submitButtonClickedPromise=cTab.click(".hr-monaco-submit");
            return submitButtonClickedPromise;
        }).then(function(){
            let controlDownPromise=cTab.keyboard.down("Control");
            return controlDownPromise;
        }).then(function(){
            console.log("Code submitted succesfully");
            resolve();
        })
        .catch(function(err){
            reject(err);
            //console.log(err);
        })
    })
  }