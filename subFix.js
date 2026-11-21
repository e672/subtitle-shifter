const path="" //add your sub file
let text=""
const fs=require('fs')
let output=fs.createWriteStream("output.txt")
const data=fs.readFileSync(path,'utf-8')
fixSub=(param,milis)=>{
    let words=param.split("\n")
    console.log(words)
    for(let i=0;i<words.length;i++){
        if(words[i].indexOf("-->")!==-1){
            let time1=words[i].substring(words[i].length-12)
            let time2=words[i].substring(0,13)
            words[i]=chan(time2,milis)+" --> "+chan(time1,milis)
        }
    }
    for(let i=0;i<words.length;i++){
        text+=words[i]+"\n"
    }
    output.write(text)
}
chan=(par1,milis)=>{
    let hours=parseInt(par1.substring(0,2))
    let mins=parseInt(par1.substring(3,5))
    let secs=parseInt(par1.substring(6,8))
    let msecs=parseInt(par1.substring(9,12))
    if(milis>0){
        if(msecs+milis>999){
        msecs=(msecs+milis)-1000
        secs+=1
            }
    if(secs>59){
        secs=secs-60
        mins+=1
            }
    if(mins>59){
        mins=mins-60
        hours+=1
            }
    }
    
    if(milis<0){
        if(msecs+milis<0){
            msecs=1000+(msecs+milis)
            secs-=1
        }
        if(secs<0){
            secs=60+secs
            mins-=1
        }
        if(mins<0){
            mins=60+mins
            hours-=1
        }
    }
    return hours.toString().padStart(2,0)+":"+mins.toString().padStart(2,0)+":"+secs.toString().padStart(2,0)+","+msecs.toString()
}
fixSub(data, -1300) //change the second parameter as how much you want to shift
