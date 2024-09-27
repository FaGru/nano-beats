import { useSequencerStore } from '@/components/sequencer/useSequencerStore';
import { useEffect, useRef } from 'react';

export const useMouseMove = (permittedAxes?: 'x' | 'y') => {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const callbackFuncRef = useRef((_: number, test: string) => {});
  const callbackTypeRef = useRef('');

  const handleMouseDown = (
    event: React.MouseEvent | React.TouchEvent,
    callback: (value: number, callbackType?: string) => void,
    callbackType?: string
  ) => {
    callbackFuncRef.current = callback;
    callbackTypeRef.current = callbackType || '';
    event.type === 'mousedown' && event.preventDefault();
    if (event.type === 'mousedown') {
      const mouseEvent = event as React.MouseEvent;
      mousePositionRef.current = { x: mouseEvent.pageX, y: mouseEvent.pageY };
    } else if (event.type === 'touchstart') {
      const touchEvent = event as React.TouchEvent;
      mousePositionRef.current = { x: touchEvent.touches[0].pageX, y: touchEvent.touches[0].pageY };
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchend', handleMouseUp);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const prevMousePosition = mousePositionRef.current;
    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;
    let updateValue = 0;
    if (!permittedAxes) {
      updateValue = prevMousePosition.y - currentY + currentX - prevMousePosition.x;
    }
    if (permittedAxes === 'y') {
      updateValue = prevMousePosition.y - currentY;
    }
    if (permittedAxes === 'x') {
      updateValue = currentX - prevMousePosition.x;
    }
    mousePositionRef.current = { x: currentX, y: currentY };
    update(updateValue);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const prevMousePosition = mousePositionRef.current;
    const currentX = e.pageX;
    const currentY = e.pageY;
    let updateValue = 0;
    if (!permittedAxes) {
      updateValue = prevMousePosition.y - currentY + currentX - prevMousePosition.x;
    }
    if (permittedAxes === 'y') {
      updateValue = prevMousePosition.y - currentY;
    }
    if (permittedAxes === 'x') {
      updateValue = currentX - prevMousePosition.x;
    }
    mousePositionRef.current = { x: currentX, y: currentY };
    update(updateValue);
  };

  const update = (updateValue: number) => {
    const callbackType = callbackTypeRef.current;
    let adjustedValue = Math.sign(updateValue) * Math.pow(Math.abs(updateValue), 2);
    if (updateValue > 6) adjustedValue = 36;
    if (updateValue < -6) adjustedValue = -36;

    callbackFuncRef.current(adjustedValue, callbackType);
  };

  return { handleMouseDown, handleMouseUp };
};
