import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss'],
})
export class FabricComponent implements OnInit {
  constructor() {}

  public text: string = '1923-2021';
  public canvas: any;
  public textInstance: any;
  public files: any;

  public selectorOptions: any = {
    transparentCorners: false,
    cornerColor: '#203639',
    cornerStrokeColor: '#B0AD99',
    borderColor: '#B0AD99',
    cornerSize: 12,
    padding: 10,
    cornerStyle: 'circle',
    borderDashArray: [3, 3],
  };

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('c');

    // let imgElement = document.getElementById('porsche') as HTMLImageElement;

    // if (imgElement) {
    //   let imgInstance = new fabric.Image(imgElement, {
    //     opacity: 0.85,
    //     height: 100,
    //     width: 100,
    //     ...this.selectorOptions,
    //   });

    //   this.canvas.centerObject(imgInstance);
    //   this.canvas.add(imgInstance);
    //   imgInstance.scale(0.5);
    //   imgInstance.set({
    //     width: imgInstance.getOriginalSize().width,
    //     height: imgInstance.getOriginalSize().height,
    //   });
    // }

    this.textInstance = new fabric.Text(this.text, {
      left: 150,
      top: 150,
      fill: 'white',
      ...this.selectorOptions,
    });

    this.canvas.centerObject(this.textInstance);
    this.canvas.add(this.textInstance);

    this.canvas.setBackgroundImage(
      '../../assets/tombstone.png',
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: 1,
        scaleY: 1,
        left: 25,
        top: 25,
      }
    );

    // document.getElementById('file')?.addEventListener('change', (e: any) => {
    //   let file = e.target?.files[0];
    //   let reader = new FileReader();
    //   reader.onload = function (f) {
    //     let data = f.target?.result;
    //     fabric.Image.fromURL(data, function (img) {
    //       let oImg = img
    //         .set({ left: 0, top: 0, angle: 0, width: 100, height: 100 })
    //         .scale(0.9);
    //       this.canvas.add(oImg).renderAll();
    //       let a = this.canvas.setActiveObject(oImg);
    //       let dataURL = this.canvas.toDataURL({ format: 'png', quality: 0.8 });
    //     });
    //   };
    //   reader.readAsDataURL(file);
    // });

    window.addEventListener('keydown', (e) => {
      console.log(e, this.canvas.getActiveObject());
      switch (e.code) {
        case 'Backspace': // delete
          let activeObject = this.canvas.getActiveObject();
          if (activeObject) this.canvas.remove(activeObject);
      }
    });
  }

  onTextChange(change: any) {
    this.textInstance.set({ text: this.text });
    this.canvas.renderAll();
  }

  onFilesChange(e: any) {
    console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      console.log(file);
      let reader = new FileReader();
      reader.onload = (f) => {
        let data = String(f.target?.result);
        fabric.Image.fromURL(data, (img) => {
          let oImg = img
            .set({
              left: 0,
              top: 0,
              angle: 0,
              width: img.getOriginalSize().width,
              height: img.getOriginalSize().height,
              ...this.selectorOptions,
            })
            .scale(0.9);
          this.canvas.add(oImg).renderAll();
          let a = this.canvas.setActiveObject(oImg);
          let dataURL = this.canvas.toDataURL({ format: 'png', quality: 0.8 });
        });
      };
      reader.readAsDataURL(file);
    }
  }

  saveMockup() {
    console.log(
      'saveMockup',
      this.canvas.toDatalessJSON(),
      this.canvas.toDatalessObject(),
      JSON.stringify(this.canvas.toDatalessJSON())
    );
    // this.canvas.toDatalessObject();
    const link = document.createElement('a');
    link.download = 'filename.png';
    const canvas = document.getElementById('c') as any;
    link.href = canvas.toDataURL();
    link.click();
  }

  loadFromJSON() {
    this.canvas.loadFromJSON(
      JSON.parse(`
    {"version":"5.3.0","objects":[{"type":"text","version":"5.3.0","originX":"left","originY":"top","left":287.84,"top":351.9,"width":173.32,"height":45.2,"fill":"white","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Times New Roman","fontWeight":"normal","fontSize":40,"text":"1923-2021","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"},{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":289,"top":196,"width":200,"height":200,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgNjQgNDMiIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIj48cGF0aCBmaWxsPSJ1cmwoJnF1b3Q7I1N2Z2pzTGluZWFyR3JhZGllbnQxMzIwJnF1b3Q7KSIgZD0iTTQ5LjEgNy41Yy0uNSAwLS45IDAtMS40LjFDNDMuOSAzLjQgMzguNS44IDMyLjQuOGMtNi4xIDAtMTEuNiAyLjctMTUuNCA3LS44LS4xLTEuNy0uMi0yLjUtLjItNy43IDAtMTQgNi4zLTE0IDE0czYuMiAxNCAxNCAxNGMuOSAwIDEuNy0uMSAyLjUtLjIgMy44IDQuMyA5LjMgNyAxNS40IDdzMTEuNS0yLjYgMTUuMy02LjhjLjUgMCAuOS4xIDEuNC4xIDcuNyAwIDE0LTYuMyAxNC0xNCAwLTcuOS02LjMtMTQuMi0xNC0xNC4yWiI+PC9wYXRoPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDAgMC41IDAuNSkiIGlkPSJTdmdqc0xpbmVhckdyYWRpZW50MTMyMCI+PHN0b3Agc3RvcC1vcGFjaXR5PSIgMSIgc3RvcC1jb2xvcj0icmdiYSgyNDMsIDE5NCwgMjIpIiBvZmZzZXQ9IjAiPjwvc3RvcD48c3RvcCBzdG9wLW9wYWNpdHk9IiAxIiBzdG9wLWNvbG9yPSJyZ2JhKDgzLCAxNjEsIDEwMikiIG9mZnNldD0iMC45OTg1MTU2MjUiPjwvc3RvcD48c3RvcCBzdG9wLW9wYWNpdHk9IiAxIiBzdG9wLWNvbG9yPSJyZ2JhKDIzNCwgMjA0LCAyNDgpIiBvZmZzZXQ9IjEiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=","crossOrigin":null,"filters":[]},{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":181.93,"top":186.74,"width":200,"height":200,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.9,"scaleY":0.9,"angle":23.3,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgNjQgNDMiPjxwYXRoIGZpbGw9InVybCgmcXVvdDsjU3ZnanNMaW5lYXJHcmFkaWVudDEwMTQmcXVvdDspIiBkPSJNNDkuMSA3LjVjLS41IDAtLjkgMC0xLjQuMUM0My45IDMuNCAzOC41LjggMzIuNC44Yy02LjEgMC0xMS42IDIuNy0xNS40IDctLjgtLjEtMS43LS4yLTIuNS0uMi03LjcgMC0xNCA2LjMtMTQgMTRzNi4yIDE0IDE0IDE0Yy45IDAgMS43LS4xIDIuNS0uMiAzLjggNC4zIDkuMyA3IDE1LjQgN3MxMS41LTIuNiAxNS4zLTYuOGMuNSAwIC45LjEgMS40LjEgNy43IDAgMTQtNi4zIDE0LTE0IDAtNy45LTYuMy0xNC4yLTE0LTE0LjJaIj48L3BhdGg+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJTdmdqc0xpbmVhckdyYWRpZW50MTAxNCI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZiYzJlYiIgb2Zmc2V0PSIwIj48L3N0b3A+PHN0b3Agc3RvcC1jb2xvcj0iI2E2YzFlZSIgb2Zmc2V0PSIxIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+","crossOrigin":null,"filters":[]},{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":161,"top":116,"width":200,"height":200,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgNjQgNDMiIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIj48cGF0aCBmaWxsPSJ1cmwoJnF1b3Q7I1N2Z2pzTGluZWFyR3JhZGllbnQxODIyJnF1b3Q7KSIgZD0iTTQ5LjEgNy41Yy0uNSAwLS45IDAtMS40LjFDNDMuOSAzLjQgMzguNS44IDMyLjQuOGMtNi4xIDAtMTEuNiAyLjctMTUuNCA3LS44LS4xLTEuNy0uMi0yLjUtLjItNy43IDAtMTQgNi4zLTE0IDE0czYuMiAxNCAxNCAxNGMuOSAwIDEuNy0uMSAyLjUtLjIgMy44IDQuMyA5LjMgNyAxNS40IDdzMTEuNS0yLjYgMTUuMy02LjhjLjUgMCAuOS4xIDEuNC4xIDcuNyAwIDE0LTYuMyAxNC0xNCAwLTcuOS02LjMtMTQuMi0xNC0xNC4yWiI+PC9wYXRoPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDAgMC41IDAuNSkiIGlkPSJTdmdqc0xpbmVhckdyYWRpZW50MTgyMiI+PHN0b3Agc3RvcC1vcGFjaXR5PSIgMSIgc3RvcC1jb2xvcj0icmdiYSgwLCAyNTUsIDIwMSkiIG9mZnNldD0iMCI+PC9zdG9wPjxzdG9wIHN0b3Atb3BhY2l0eT0iIDEiIHN0b3AtY29sb3I9InJnYmEoMiwgMCwgMjU1KSIgb2Zmc2V0PSIxIj48L3N0b3A+PHN0b3Agc3RvcC1vcGFjaXR5PSIgMSIgc3RvcC1jb2xvcj0icmdiYSg4NCwgMTM0LCAyNDEpIiBvZmZzZXQ9IjEiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=","crossOrigin":null,"filters":[]},{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":263.45,"top":200.6,"width":200,"height":200,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.9,"scaleY":0.9,"angle":308.86,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgNjQgNDMiIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIj48cGF0aCBmaWxsPSJ1cmwoJnF1b3Q7I1N2Z2pzTGluZWFyR3JhZGllbnQxODk4JnF1b3Q7KSIgZD0iTTQ5LjEgNy41Yy0uNSAwLS45IDAtMS40LjFDNDMuOSAzLjQgMzguNS44IDMyLjQuOGMtNi4xIDAtMTEuNiAyLjctMTUuNCA3LS44LS4xLTEuNy0uMi0yLjUtLjItNy43IDAtMTQgNi4zLTE0IDE0czYuMiAxNCAxNCAxNGMuOSAwIDEuNy0uMSAyLjUtLjIgMy44IDQuMyA5LjMgNyAxNS40IDdzMTEuNS0yLjYgMTUuMy02LjhjLjUgMCAuOS4xIDEuNC4xIDcuNyAwIDE0LTYuMyAxNC0xNCAwLTcuOS02LjMtMTQuMi0xNC0xNC4yWiI+PC9wYXRoPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDAgMC41IDAuNSkiIGlkPSJTdmdqc0xpbmVhckdyYWRpZW50MTg5OCI+PHN0b3Agc3RvcC1vcGFjaXR5PSIgMSIgc3RvcC1jb2xvcj0icmdiYSgxODcsIDExMCwgMjUyKSIgb2Zmc2V0PSIwIj48L3N0b3A+PHN0b3Agc3RvcC1vcGFjaXR5PSIgMSIgc3RvcC1jb2xvcj0icmdiYSgxMjAsIDksIDI1NSkiIG9mZnNldD0iMC4wMDg1MTU2MjUiPjwvc3RvcD48c3RvcCBzdG9wLW9wYWNpdHk9IiAxIiBzdG9wLWNvbG9yPSJyZ2JhKDE5NCwgNzgsIDcpIiBvZmZzZXQ9IjAuNzIzNTE1NjI1Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+","crossOrigin":null,"filters":[]}],"backgroundImage":{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":25,"top":25,"width":609,"height":618,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:4200/assets/tombstone.png","crossOrigin":null,"filters":[]}}`)
    );
  }
}
