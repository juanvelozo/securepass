import {  InputHTMLAttributes } from "react";

export const RangeSlider = ({...props}: InputHTMLAttributes<HTMLInputElement>):JSX.Element => {
//States
//hooks
//functions
//DOM

    return (
       <input
  {...props}
  type="range"
  min={10}
  max={100}
  className="w-full"
  step={1}
  
/>
    );
}