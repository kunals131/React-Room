export const commands = [
    {
        match : ['MUTEME', 'TURNMICOFF', 'MUTEME'],
        task : 'TURN_OFF_MIC'
    },
    {
        match : ['TURNONMIC', 'TURNONMIKE', 'TURNONMICE', 'TURNONMICROPHONE', 'TURNONTHEMIC', 'TURNONMYEMIC'],
        task : 'TURN_ON_MIC'
    }, 
    {
        match : ['TURNONVIDEO', 'TURNONTHEVIDEO'],
        task : 'TURN_ON_VIDEO'
    }, 
    {
        match : ['SHUTVIDEO', 'DONTSHOWME', "TURNOFFTHEVIDEO", 'TURNOFFMYVIDEO', ],
        task : 'TURN_OFF_VIDEO'
    },
    {
        match : ['SWITCHTHEMETO', 'CHANGETHEMETO']
    },
    {
        match : ['COUNTPARTICIPANTS', 'HOWMANYPARTICIAPNTSARETHERE']
    },
    {
        match : ['KICKOUT']
    },
    {
        match : ['STARTMYSCREENSHARE', 'TURNONMYSCREENSHARE']
    },
    {
        match : ['GOODBYE', 'GOAWAY', 'STOPVOICERECOGNIZATION', 'GOAWAY'],
        task : 'STOP_VOICE_RECOG'
    }
    

]



const isCharacter=(char)=>{
    return (/[a-zA-Z]/).test(char)
  }
  
  const isNumber = (char)=>{
    return (/[0-9]/).test(char)
  }
  
  
 export  const cleanUp=(s)=>{
    let ans = '';
    for(let c of s) {
      if (isCharacter(c)||isNumber(c)) ans+=c;
    }
    return ans.toUpperCase();
  } 