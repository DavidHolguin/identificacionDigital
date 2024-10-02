import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

const CarnetValidator = () => {
  const [result, setResult] = useState('');

  const startScan = async () => {
    try {
      const codeReader = new BrowserQRCodeReader();
      const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
      
      // Usa la primera cámara disponible
      const selectedDeviceId = videoInputDevices[0].deviceId;
      
      const result = await codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
          setResult(result.getText());
          codeReader.reset();
        }
        if (err) console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Escanear Carnet</h2>
      <button onClick={startScan}>Iniciar Escaneo</button>
      <video id="video" width="300" height="200" />
      {result && <p>Resultado: {result}</p>}
    </div>
  );
};

export default CarnetValidator;