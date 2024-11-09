document.addEventListener('DOMContentLoaded', () => {
  const receiptData = data;

  const data = receiptData[0];

  // Update HTML elements with JSON data
  document.getElementById('sucursal').textContent = data.sucursal;
  document.getElementById('direccion').textContent = data.direccion;
  document.getElementById('operacion').textContent = data.operacion;

  // Set the current date and time
  const date = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  // Format the date as "Oct/22/2024"
  const [month, day, year] = date.toLocaleDateString('en-US', options).replace(',', '').split(' ');
  const formattedDate = `${month}/${day}/${year}`;

  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Update the date and time in the relevant elements
  document.getElementById('current-date').textContent = formattedDate;
  document.getElementById('current-time').textContent = formattedTime;
});
