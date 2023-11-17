import React from 'react';

import "../style/components/PDFViewer.css";


function PDFViewer({ url }) {
  return (
    <details className='detail-pdf-view'>
      <summary className='summary-pdf-view'>Visualizar Documento</summary>
      <iframe
        src={url}
        style={{ width: '100%', height: '800px', border: 'none' }}
        title="Visualizar documento"
      />
    </details>
  );
}

export default PDFViewer;
