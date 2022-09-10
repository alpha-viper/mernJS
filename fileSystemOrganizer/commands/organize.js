const fs=require("fs");
const path=require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}

function organize(srcPath)
{
    if(srcPath == undefined)
    {
       
       // process.cwd return cureent working directory
       srcPath=process.cwd(); 
    }   

    let organizedFiles=path.join(srcPath,"organized_path");
    if(fs.existsSync(organizedFiles) == false)
    {
        fs.mkdirSync(organizedFiles);

        let allFiles=fs.readdirSync(organizedFiles);

        for(let i=0;i<allFiles.length;i++)
        {

            
            let fullPathOfFile=path.join(srcPath,allFiles[i]);

            let isFile=fs.lstatSync(fullPathOfFile).isFile();

            if(isFile)
            {
                //let ext=allFiles[i].split(".")[1];
                let ext=path.extname(allFiles[i]);

                let FolderName=getFolderNmae(ext);
                               //copy,what to copy,paste here
                copyFileToDest(srcPath,fullPathOfFile,FolderName);

            }
        }
    }

    else{
        console.log("organizedFiles folder already exists");
    }


    function getFolderName(ext)
    {
        for(let keys in types)
        {
            for(let i=0;i<types[key].length;i++)
            {
                if(types[key][i] == ext)
                {
                    return key;
                }
            }
        }
        return "miscllaneous";
    }

    function copyFileToDest(srcPath, fullPathOfFile, folderName)
    {
        let destFolderPath= path.join(srcPath,"organized_files",folderName);

        if(!fs.existsSync(destFolderPath))
        {
            fs.mkdirSync(destFolderPath);
        }
        //copy file from src folder to dest folder

  // Returns the last portion of a path

        let FileName=path.basename(fullPathOfFile);
        let destFileName = path.join(destFolderPath, fileName);    
                      // src        dest
        fs.copyFileSync(fullPathOfFile, destFileName);
    }





    organize();

    module.exports = {
        organize:organize
      }
}