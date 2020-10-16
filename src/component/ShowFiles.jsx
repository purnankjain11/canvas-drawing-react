import React, { useState } from 'react';

export const ShowFiles = ({ onLoad, files }) => {
  const [selected, setSelected] = useState('')

  const handleClick = () => {
    onLoad(selected)
  }

  const handleSelect = ({ target }) => {
    setSelected(target.innerText)
  }

  return <div style={{ margin: '50px', textAlign: 'center' }}>
    <ol style={{ textAlign: 'left' }}>
      {files.map((file) => <li key={file} value={file} style={file === selected ? { fontWeight: 'bold', fontSize: '20px', marginTop: '10px', cursor: 'pointer' } : { fontSize: '20px', marginTop: '10px', cursor: 'pointer' }} onClick={handleSelect} >{file}</li>)}
    </ol>
    <button style={{ fontSize: '20px' }} disabled={selected === ''} onClick={handleClick}>Load File</button>
  </div>
}