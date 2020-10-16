import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FILE_SERVICE from '../services/FileService';
import { SaveFiles } from './SaveFile';
import { ShowFiles } from './ShowFiles';
import { FaUndo } from 'react-icons/fa';

const ControlPanel = ({ data, setData }) => {
  const [filename, setFilename] = useState('')
  const [files, setFiles] = useState([])

  const handleUndo = () => {
    if (data.length < 1) {
      return
    }
    setData([
      ...data.splice(0, data.length - 1)
    ])
  }

  useEffect(() => {
    FILE_SERVICE.getFiles().then(({ data }) => {
      const filenames = data.map((file) => {
        return file.split('.')[0]
      })
      setFiles(filenames)
    })
  }, [])

  const handleSave = () => {
    FILE_SERVICE.saveFile(filename, data).then(() => {
      FILE_SERVICE.getFiles().then(({ data }) => {
        const filenames = data.map((file) => {
          return file.split('.')[0]
        })
        setFiles(filenames)
      })
    })
  }

  const handleLoad = (filename) => {
    FILE_SERVICE.getFileByName(filename).then(({ data }) => {
      setData(data.data)
    })
    setFilename(filename)
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <FaUndo style={{ cursor: 'pointer', height: '50px', width: '50px', margin: '50px' }} onClick={handleUndo} />
      </div>
      <SaveFiles onSave={handleSave} selectedFile={filename} onChange={setFilename} />
      <ShowFiles files={files} onLoad={handleLoad} />
    </>
  )
}

export default ControlPanel