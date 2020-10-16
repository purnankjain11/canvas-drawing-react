import React, { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ControlPanel from './ControlPanel';

const getMouseXY = (offset, clientX, clientY) => {
  const { x: offsetX, y: offsetY } = offset
  const mouseX = clientX - offsetX
  const mouseY = clientY - offsetY
  return { mouseX, mouseY }
}

const isLeftMouseButton = (button) => {
  const buttonPressed = button
  const LEFT_BUTTON = 0
  return buttonPressed === LEFT_BUTTON
}

const drawExistingRectangles = (context, rectangles) => {
  rectangles.forEach((rectangle) => {
    const { startX, startY, width, height } = rectangle
    context.strokeRect(startX, startY, width, height)
    return
  })
  return
}

export const Canvas = () => {

  const canvasRef = useRef(null)
  const [canvasObj, setCanvasObj] = useState()
  const [beginMousePosition, setBeginMousePosition] = useState({ x: 0, Y: 0 })
  const [isMousePressed, setMousePressed] = useState(false)
  const [rectangles, setRectangles] = useState([])
  const redraw = useCallback(() => {
    if (!canvasObj) {
      return
    }
    const context = canvasObj.getContext('2d')
    context.clearRect(0, 0, canvasObj.width, canvasObj.height)
    drawExistingRectangles(context, rectangles)
  }, [canvasObj, rectangles]
  )
  const handleMouseDown = (event) => {
    const { mouseX, mouseY } = getMouseXY(canvasObj.getBoundingClientRect(), event.clientX, event.clientY)
    if (!isLeftMouseButton(event.button)) {
      return
    }
    setBeginMousePosition({ x: mouseX, y: mouseY })
    setMousePressed(true)
  }

  const handleMouseMove = (event) => {
    if (!canvasObj) {
      return
    }
    const ctx = canvasObj.getContext('2d')
    if (!isMousePressed || !isLeftMouseButton(event.button)) {
      return
    }

    redraw()
    const { mouseX, mouseY } = getMouseXY(canvasObj.getBoundingClientRect(), event.clientX, event.clientY)
    const width = mouseX - beginMousePosition.x
    const height = mouseY - beginMousePosition.y
    ctx.strokeRect(beginMousePosition.x, beginMousePosition.y, width, height)
  }

  const handleMouseUp = (event) => {
    if (!isMousePressed) {
      return
    }
    const { mouseX, mouseY } = getMouseXY(canvasObj.getBoundingClientRect(), event.clientX, event.clientY)
    if (!isLeftMouseButton(event.button)) {
      return
    }
    const width = mouseX - beginMousePosition.x
    const height = mouseY - beginMousePosition.y

    const newRectangle = {
      startX: beginMousePosition.x
      , startY: beginMousePosition.y
      , width
      , height
    }
    setRectangles(
      [
        ...rectangles
        , newRectangle
      ]
    )
    setMousePressed(false)
  }

  useEffect(() => {
    redraw()
  }, [redraw])

  useEffect(() => {
    setCanvasObj(canvasRef.current)
    if (canvasObj) {
      const cxt = canvasObj.getContext('2d')
      cxt.fillStyle = 'green'
    }
  }, [canvasObj])

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ border: '1px solid red' }} height="800" width="800" />
      </div>
      <div style={{ display: 'inline-block' }}>
        <ControlPanel data={rectangles} setData={setRectangles} />
      </div>

    </div>
  )
}
