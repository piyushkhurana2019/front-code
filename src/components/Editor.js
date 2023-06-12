import React, { useState }from 'react'
import 'codemirror/lib/codemirror.css'   //importing our base css
import 'codemirror/theme/material.css'  // importing our theme css
 // all the javascript realted to the different languages that we gonna be use so that all the syntax highlighting works properly
import 'codemirror/mode/xml/xml'       //for xml(same as html)
import 'codemirror/mode/javascript/javascript' // for js
import 'codemirror/mode/css/css'          // for css
import { Controlled as ControlledEditor} from 'react-codemirror2'  // reanming controlled as controleditor just so its easier to know its working 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

//the above was the editor that we can actually controll the input and output on with our own on change event handlers and our own value 

export default function Editor(props) {

  const {
    language,
    displayName,
    value,
    onChange,
  } = props

  function handleChange(editor, data, value){        //it uses the onbeforeChange function here
    onChange(value)
  }      
// toggle = ()=>{
//   open? open=true : open=false
// }
  const [open, setOpen] = useState(true)
  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
        <div className='editor-title'>
            {props.displayName}
            <button 
            type='button'
            className='expand-collapse-btn'
            onClick={()=>setOpen(prevOpen => !prevOpen)} >
              <FontAwesomeIcon icon = {open ? faCompressAlt : faExpandAlt} />
              </button>
        </div>

            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className='code-mirror-wrapper'
                options={{                          //these options are from codemirror library
                      lineWrapping: true,
                      lint: true,
                      mode: language,        //mode is the language we passing which comes through props
                      theme: 'material',
                      lineNumbers: true
                }}
            
            />

    </div>
  )
}