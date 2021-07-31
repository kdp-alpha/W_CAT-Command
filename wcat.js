let fs = require("fs");
let inputArr = process.argv.slice(2);
// console.log(inputArr);

let optionsArr = [];
let filesArr = [];

//options and files identification
for(let i=0;i<inputArr.length;i++)
{
    let firstChar = inputArr[i].charAt(0);
    if(firstChar=="-")
    {
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

// edge cases
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-s")
if(isBothPresent==true)
{
    console.log("🙏either type -b or -n ");
    return;
}


//2. print content of the file
let content = "";
for(let i=0;i<filesArr.length;i++)
{
    let files_data = fs.readFileSync(filesArr[i]);
    content+=files_data + "\r\n";
}
console.log(content);

//3. 3- node wcat.js -s filepath => convert big line breaks into a singular line break
let contentArr = content.split("\r\n");
//-s identify
let isSPresent;
for(let i=0;i<optionsArr.length;i++)
{
    if(optionsArr[i]=="-s")
    {
        isSPresent = true;
    }
}
if( isSPresent==true )
{
    for(let i=1;i<contentArr.length;i++)
    {
        if(contentArr[i]==""&&contentArr[i-1]=="")
        {
            contentArr[i]= null;
        }
        
        else if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]= null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!=null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
    console.log(contentArr.join("\n"));
}


//-n option
let isNPresent;
for(let i=0;i<optionsArr.length;i++)
{
    if(optionsArr[i]=="-n")
    {
        isNPresent = true;
    }
}
if(isNPresent==true)
{
    let counter=1;
    for(let i=0;i<contentArr.length;i++)
    {
        contentArr[i] = `${counter+i} ${contentArr[i]}`;
    }
    console.log(contentArr.join("\n"));
}


//-b is present
let isBPresent = optionsArr.includes("-b");
if(isBPresent==true)
{
    let counter=1;
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
        
    }
    console.log(contentArr.join("\n"));
}




