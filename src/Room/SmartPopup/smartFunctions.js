export const commands = [
    {
        match : ['TURNOFFMYMIC', 'TURNMICOFF', 'TURNMYMICOFF', 'STOPMYMIC', 'MUTEME'],
        task : 'TURN_OFF_MIC'
    },
    {
        match : ['TURNONMIC', 'TURNONMIKE', 'TURNONMICE', 'TURNONMICROPHONE', 'TURNONTHEMIC', 'TURNONMYMIC', 'STARTMYMIC', 'UNMUTEME'],
        task : 'TURN_ON_MIC'
    }, 
    {
        match : ['TURNONVIDEO', 'TURNONTHEVIDEO', 'TURNONMYVIDEO', 'STARTMYVIDEO', 'STARTHEVIDEO'],
        task : 'TURN_ON_VIDEO'
    }, 
    {
        match : [ "TURNOFFTHEVIDEO", 'TURNOFFMYVIDEO','STOPTHEVIDEO', 'STOPMYVIDEO' ],
        task : 'TURN_OFF_VIDEO'
    },

    {
        match : ['STARTMYSCREENSHARE', 'TURNONMYSCREENSHARE', 'SHAREMYSCREEN'],
        task :'START_SCREEN_SHARE'
    },
    {
        match : ['STOPMYSCREENSHARE', 'TURNOFFMYSCREENSHARE'],
        task :'STOP_SCREEN_SHARE'
    },
    {
        match : ['GOODBYE', 'GOAWAY', 'STOPVOICERECOGNIZATION', 'GOAWAY'],
        task : 'STOP_VOICE_RECOG'
    },
    {
        match : ['TAKEMETOTHE'],
        task : 'CHANGE_THEME'
    },
    {
        match : ['HELPME', 'PLEASEHELPME', 'HELP'],
        task : 'HELPME'
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