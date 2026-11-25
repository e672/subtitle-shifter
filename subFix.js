const path="got6.txt" //add your sub file
let text=""
const fs=require('fs')
let output=fs.createWriteStream("output.txt")
const data=fs.readFileSync(path,'utf-8')
chan=(par1,milis)=>{
    let hours=parseInt(par1.substring(0,2))
    let mins=parseInt(par1.substring(3,5))
    let secs=parseInt(par1.substring(6,8))
    let msecs=parseInt(par1.substring(9,par1.length))
    let totalMilis=(hours*3600000)+(mins*60000)+(secs*1000)+msecs+milis
    return turnToMilis(totalMilis)
}
turnToMilis=(time)=>{
    const hours=(time/3600000)|0
    const mins=(time-(hours*3600000))/60000|0
    const secs=(time-(hours*3600000)-(mins*60000))/1000|0
    const msecs=(time-(hours*3600000)-(mins*60000)-(secs*1000))|0
    return hours.toString().padStart(2,0)+":"+mins.toString().padStart(2,0)+":"+secs.toString().padStart(2,0)+","+msecs.toString().padStart(3,0)
}
fixSub=(param,milis)=>{
    let words=param.split("\n")
    for(let i=0;i<words.length;i++){
        if(words[i].indexOf("-->")!==-1){
            let time1=words[i].substring(0,words[i].indexOf(" "))
            let time2=words[i].substring(words[i].indexOf(" ",13)+1,words[i].length)
            words[i]=chan(time1,milis)+" --> "+chan(time2,milis)
            /* console.log(words[i])
            console.log(time1)
            console.log(time2)
            break */
        }
    }
    for(let i=0;i<words.length;i++){
        text+=words[i]+"\n"
    }
    output.write(text)
}
fixSub(data,1500) //change the second parameter as how much you want to shift
