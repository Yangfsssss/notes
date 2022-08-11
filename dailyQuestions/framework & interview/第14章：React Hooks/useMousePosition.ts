import { useState,useEffect } from "react";

function useMousePosition(){
  const [mousePosition,setMousePosition] = useState({x:0,y:0});

  useEffect(()=>{
    function handleMouseMove(e:MouseEvent){
      setMousePosition({x:e.clientX,y:e.clientY});
    }

    document.body.addEventListener("mousemove",handleMouseMove);

    return ()=>{
      document.body.removeEventListener("mousemove",handleMouseMove);
    }
  },[])

  return [mousePosition.x,mousePosition.y];
}


export default useMousePosition