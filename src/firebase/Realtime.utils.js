import {app} from './firebase.utils'
import { getDatabase } from '@firebase/database'

export const rdb = getDatabase(app);

const createRoom = (hostId,roomId)=>{
    set(ref(rdb, 'rooms/'+roomId), {
        host : hostId,
        room : roomId,
    })
}

export const addOrUpdateMember = async (roomid, memberId, memberData=null)=>{

    const updates = {};
    updates[`rooms/${roomid}/members/${memberId}`] = memberData;
    console.log('Added member')
    const res = await update(ref(rdb),updates)
    return res;
}
export const retrieveMembers = (roomid)=>{
    const membersRef = ref(rdb,`rooms/${roomid}/members`);
    return membersRef;

}

export const removeMember = (roomid, memberid)=>{
    const memberRef = ref(rdb,`rooms/${roomid}/members/${memberid}`);
    remove(memberRef)
    console.log('DELETED A MEMBER WITH ID' + memberid)
}


export const checkifRoom = async (roomid)=>{
    let dbRef = ref(rdb);
    let ans = false;
    const res = await get(child(dbRef, `rooms/${roomid}`))
    ans = res.exists();
    return ans;
}