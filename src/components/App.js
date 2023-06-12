import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';


function App() {
  const[html,setHtml] = useLocalStorage('html', '')
  const[css,setCss] = useLocalStorage('css', '')
  const[js,setJs] = useLocalStorage('js', '')
  const[srcDoc,setsrcDoc] = useState('')

  useEffect (()=>{
    const timeout = setTimeout(() => {
      
      setsrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>

      </html>
      `)

    }, 250)

    return ()=> clearTimeout(timeout)
    
  }, [html, css, js])



   //to render the above html css js into the iframe we require source Doc

  return (
    <>
        <div className='pane top-pane'>
          <Editor language="xml"  displayName="HTML"  value={html}  onChange={setHtml} />
          <Editor language="css"  displayName="CSS"  value={css}  onChange={setCss} />
          <Editor language="js"  displayName="JS"  value={js}  onChange={setJs} />
          
        </div>
        <div className='pane'>

        <iframe 
          srcDoc={srcDoc}
          title='Output'  // embed content from another source into an HTML document for eg. majorly used for ads and in many hacking techniques
          sandbox='allow-scripts'  //enables an extra set of restrictions for the content in the iframe i.e. help a lil bit in securityso that when you run the application its not able to access a bunch of other things like document cookies and that kind of stuff
          width='100%'
          height='100%'
        />

        </div>
    </>
  )
}

export default App;
