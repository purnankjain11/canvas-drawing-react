import React from 'react';

export const SaveFiles = ({ onSave, selectedFile, onChange }) => {

  const handleChange = ({ target }) => {
    onChange(target.value)
  }

  return (
    <div style={{margin: '50px', textAlign: 'center'}}>
      <div>
        <input style={{fontSize: '20px'}} type="text" value={selectedFile} onChange={handleChange} pattern="[a-zA-Z0-9]*" />
      </div>
      <div style={{marginTop: '30px'}}>
        <button onClick={onSave} style={{fontSize: '20px'}}>Save File</button>
      </div>
    </div>
  )
}