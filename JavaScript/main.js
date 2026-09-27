function updateClockAndTheme() {
  const now = new Date();
 
  // 1. Formatear la hora local de Panamá (AM/PM)
  const timeString = now.toLocaleTimeString('es-PA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
 
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.textContent = timeString;
  }
 
  // 2. Cambio de imagen de fondo según la hora
  // Día: de 6:00 AM a 5:59 PM (6 a 17) | Noche: de 6:00 PM a 5:59 AM
  const hours = now.getHours();
  const body = document.getElementById('bg-body');
 
  if (body) {
    if (hours >= 6 && hours < 18) {
      body.style.backgroundImage = "url('assets/campus-dia.jpg')";
    } else {
      body.style.backgroundImage = "url('assets/campus-noche.jpg')";
    }
  }
}
 
// Actualización cada segundo
setInterval(updateClockAndTheme, 1000);
 
// Ejecución al cargar
updateClockAndTheme();