import React, {useState} from 'react'
import './Sidebar.scss'
import { TextField, Button } from '@mui/material'

const inputStyles =  {
    width : '70%',
}

const buttonStyle = {
    height : '53px',
    marginLeft : '0.5rem',
    backgroundColor : '#3F3D56'
}

const Sidebar = ({ participantList, setBackground}) => {
    const [view,setView] = useState('Participants');
    const [theme,setTheme] = useState('');
    return (
        <div className="sb">
            <div className="ui two item menu">
                <div className="item" onClick={()=>setView('Participants')}>Participants</div>
                <div className="item" onClick={()=>setView('Themes')}>Themes</div>
            </div>
            <div className="sb__container">
                {
                    view==='Themes'&&<div className="sb__container__items">
                        <div className="sb__container__items-item" onClick={()=>setBackground('Forest')}>
                            Forest
                        </div>
                        <div className="sb__container__items-item" onClick={()=>setBackground('City')}>
                            City
                        </div>
                        <div className="sb__container__items-item" onClick={()=>setBackground('Mountains')} >
                            Mountains
                        </div>
                        <div className="sb__container__items-item" onClick={()=>setBackground('black')}>
                            Default
                        </div>
                        <div className="sb__container__items-item-2">
                            <p>Go to your own Place!</p>
                            <div className="sb__container__items-item-2-controls">
                            <TextField value={theme} onChange={(e)=>setTheme(e.target.value)} label="Enter Theme" type="text" variant="outlined" style={inputStyles}/>
                            <Button onClick={()=>setBackground(theme)} variant="contained" style={buttonStyle}>Go!</Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    view==='Participants'&&<div className="sb__container__items">
                    {
                        participantList.map((p,idx)=>{
                            return <div key={idx} className="sb__container__items-item">
                                {p.name}
                            </div>
                        })
                    }
                    </div>
                }
            </div>
            
        </div>
    )
}

export default Sidebar
