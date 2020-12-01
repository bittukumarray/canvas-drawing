import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";



export default () => {
  const canvasRef = useRef(null)
  let ctx = null;
  const [clr, setClr] = useState("black");
  let canvas = useRef(null);

  useEffect(() => {
    canvas = canvasRef.current;
    // setCtx(null);
  })


  const showCoords = (event) => {
    if (ctx) {
      ctx.strokeStyle = clr
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
    }

  }

  const showCoordsClick = (event) => {
    if (ctx) {
      ctx = null;
    }
    else {
      ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = clr
        ctx.moveTo(event.clientX, event.clientY);
      }
    }

  }

  const onCheckRadio = (e, color) => {
    setClr(color)
  }

  const DownloadImg = async () => {
    const imgData = canvas.toDataURL('image/png');
    let doc = new jsPDF('p', 'mm');
    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save('canvas_output.pdf');
    const res = await axios.post("http://localhost:4000/image-download", { imgData: imgData });
    console.log("yes downloaded");
  }


  return (
    <div >
      <form>
        <input onClick={(e) => { onCheckRadio(e, "red") }} type="radio" name="color" value="red" style={{ border: "1px solid red", marginRight: 5, marginLeft: 5 }} />
        <label htmlFor="red">Red</label>
        <input onClick={(e) => { onCheckRadio(e, "green") }} type="radio" name="color" value="green" style={{ border: "1px solid green", marginRight: 5, marginLeft: 5 }} />
        <label htmlFor="red">Green</label>
        <input onClick={(e) => { onCheckRadio(e, "yellow") }} type="radio" name="color" value="yellow" style={{ border: "1px solid yellow", marginRight: 5, marginLeft: 5 }} />
        <label htmlFor="red">Yellow</label>
        <input onClick={(e) => { onCheckRadio(e, "blue") }} type="radio" name="color" value="blue" style={{ border: "1px solid blue", marginRight: 5, marginLeft: 5 }} />
        <label htmlFor="red">Blue</label>
      </form>
      <canvas
        ref={canvasRef}
        height={500}
        width={500}
        id="myCanvas" style={{ border: "1px solid #c3c3c3", }} onMouseMove={showCoords} onClick={showCoordsClick}>
      </canvas>

      <p><a id="download" href="#" onClick={DownloadImg}><button>Download The PDF</button></a></p>
    </div>
  );
};
