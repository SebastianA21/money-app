document.addEventListener('DOMContentLoaded', () => {
    const receiptData = data;
  
    const data = receiptData[0];
  
    // Update HTML elements with JSON data
    document.getElementById('sucursal').textContent = data.sucursal;
    document.getElementById('direccion').textContent = data.direccion;
    document.getElementById('operacion').textContent = `Operación: ${data.operacion}`;
    document.getElementById('tipoCambio').textContent = `$${data.tipoCambio.toFixed(2)} MXN`;
    document.getElementById('monto').textContent = `$${data.monto.toFixed(2)} USD`;
    document.getElementById('recibido').textContent = `$${data.recibido.toFixed(2)} USD`;
    document.getElementById('entregado').textContent = `$${data.entregado.toFixed(2)} MXN`;
    document.getElementById('cambio').textContent = `$${data.cambio.toFixed(2)} USD`;
  });
  