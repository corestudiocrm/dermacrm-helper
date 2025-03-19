
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { Client, BodyArea } from '@/context/CrmContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BodyAreaVisualizationProps {
  client: Client;
}

// Mappa delle coordinate e dimensioni per ogni area del corpo
const bodyAreaMap: Record<BodyArea, { x: number, y: number, width: number, height: number }> = {
  'Face': { x: 175, y: 50, width: 50, height: 50 },
  'Neck': { x: 175, y: 100, width: 50, height: 30 },
  'Chest': { x: 175, y: 130, width: 100, height: 70 },
  'Back': { x: 175, y: 130, width: 100, height: 100 },
  'Arms': { x: 130, y: 130, width: 40, height: 100 },
  'Legs': { x: 160, y: 230, width: 80, height: 150 },
  'Hands': { x: 110, y: 230, width: 30, height: 30 },
  'Full Body': { x: 150, y: 100, width: 100, height: 280 }
};

// Colori per le aree trattate
const areaColors = [
  '#9b87f5', // Purple
  '#D946EF', // Magenta
  '#F97316', // Orange
  '#0EA5E9', // Blue
  '#22C55E'  // Green
];

const BodyAreaVisualization: React.FC<BodyAreaVisualizationProps> = ({ client }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasFabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inizializza Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 400,
      selection: false,
      backgroundColor: '#f8f9fa'
    });
    canvasFabricRef.current = canvas;

    // Disegna il corpo stilizzato
    drawBody(canvas);

    // Evidenzia le aree trattate
    highlightTreatedAreas(canvas, client);

    return () => {
      canvas.dispose();
    };
  }, [client]);

  // Disegna la silhouette del corpo
  const drawBody = (canvas: fabric.Canvas) => {
    // Testa
    const head = new fabric.Circle({
      left: 175,
      top: 50,
      radius: 25,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Collo
    const neck = new fabric.Rect({
      left: 187,
      top: 100,
      width: 25,
      height: 30,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Torso
    const torso = new fabric.Rect({
      left: 162,
      top: 130,
      width: 75,
      height: 100,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Braccio sinistro
    const leftArm = new fabric.Rect({
      left: 130,
      top: 130,
      width: 30,
      height: 100,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Braccio destro
    const rightArm = new fabric.Rect({
      left: 237,
      top: 130,
      width: 30,
      height: 100,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Gamba sinistra
    const leftLeg = new fabric.Rect({
      left: 162,
      top: 230,
      width: 35,
      height: 120,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Gamba destra
    const rightLeg = new fabric.Rect({
      left: 200,
      top: 230,
      width: 35,
      height: 120,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Mano sinistra
    const leftHand = new fabric.Circle({
      left: 130,
      top: 230,
      radius: 10,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Mano destra
    const rightHand = new fabric.Circle({
      left: 260,
      top: 230,
      radius: 10,
      fill: '#e9ecef',
      stroke: '#adb5bd',
      strokeWidth: 1,
      selectable: false
    });

    // Aggiungi tutti gli elementi al canvas
    canvas.add(head, neck, torso, leftArm, rightArm, leftLeg, rightLeg, leftHand, rightHand);
    canvas.renderAll();
  };

  // Evidenzia le aree trattate
  const highlightTreatedAreas = (canvas: fabric.Canvas, client: Client) => {
    // Crea un set di aree uniche che sono state trattate
    const treatedAreas = new Set<BodyArea>();
    client.measurements.forEach(measurement => {
      treatedAreas.add(measurement.area);
    });

    // Colora ogni area trattata
    Array.from(treatedAreas).forEach((area, index) => {
      const areaCoords = bodyAreaMap[area];
      const colorIndex = index % areaColors.length;
      
      // Se è "Full Body", crea un rettangolo che copre tutto il corpo
      if (area === 'Full Body') {
        const fullBody = new fabric.Rect({
          left: 150,
          top: 50,
          width: 100,
          height: 300,
          fill: areaColors[colorIndex],
          opacity: 0.5,
          selectable: false
        });
        canvas.add(fullBody);
      } else {
        // Altrimenti, crea un rettangolo specifico per l'area
        const highlightRect = new fabric.Rect({
          left: areaCoords.x,
          top: areaCoords.y,
          width: areaCoords.width,
          height: areaCoords.height,
          fill: areaColors[colorIndex],
          opacity: 0.5,
          selectable: false
        });
        canvas.add(highlightRect);
        
        // Aggiungi etichetta
        const text = new fabric.Text(area, {
          left: areaCoords.x,
          top: areaCoords.y - 15,
          fontSize: 12,
          fontFamily: 'Arial',
          fill: areaColors[colorIndex]
        });
        canvas.add(text);
      }
    });

    canvas.renderAll();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Aree Trattate</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas ref={canvasRef} width="400" height="400" />
      </CardContent>
    </Card>
  );
};

export default BodyAreaVisualization;
