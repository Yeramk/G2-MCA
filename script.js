document.addEventListener("DOMContentLoaded", () => {
  const minutosDisponibles = 180; 
  const fechaHoy = new Date('2026-10-01');

  const asignaturas = [
    { nombre: 'CED', temas: 6, dificultad: 2.0, fechaExamen: new Date('2026-10-21') }, 
    { nombre: 'ADE', temas: 4, dificultad: 1.5, fechaExamen: new Date('2026-10-23') }, 
    { nombre: 'FP', temas: 7, dificultad: 2.0, fechaExamen: new Date('2026-10-26') }   
  ];

  let asignaturasConUrgencia = [];
  let urgenciaTotal = 0;

  asignaturas.forEach(asig => {
    const diferenciaTiempo = asig.fechaExamen - fechaHoy;
    const diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); 
    const puntosCarga = asig.temas * asig.dificultad;
    const urgencia = puntosCarga / diasRestantes;
    
    asignaturasConUrgencia.push({ ...asig, diasRestantes, urgencia });
    urgenciaTotal += urgencia;
  });

  let planDeHoy = [];

  asignaturasConUrgencia.forEach(asig => {
    let porcentaje = asig.urgencia / urgenciaTotal;
    let minutosAsignados = minutosDisponibles * porcentaje;

    if (minutosAsignados >= 45) {
      let minutosRedondeados = Math.round(minutosAsignados / 15) * 15;
      planDeHoy.push({ nombre: asig.nombre, minutos: minutosRedondeados });
    }
  });

  const contenedor = document.getElementById('contenedor-plan');
  contenedor.innerHTML = ""; 

  // Franjas horarias asignadas para mostrar en la línea de tiempo
  const franjasHorarias = ["10:00 - 11:30", "11:30 - 13:00", "13:00 - 14:00"];

  planDeHoy.forEach((plan, index) => {
    const horas = Math.floor(plan.minutos / 60);
    const mins = plan.minutos % 60;
    const textoTiempo = horas > 0 ? `${horas}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;

    const horaAsignada = franjasHorarias[index] || `Bloque ${index + 1}`;

    const itemTimeline = document.createElement('div');
    itemTimeline.className = 'timeline-item activo';
    
    itemTimeline.innerHTML = `
      <div class="hora">${horaAsignada}</div>
      <div class="punto punto-estudio"></div>
      <div class="contenido-item tarjeta-estudio">
        <div class="info-estudio">
          <h4>${plan.nombre}</h4>
          <p>Tiempo objetivo: ${textoTiempo}</p>
        </div>
        <button class="btn-check"></button>
      </div>
    `;
    
    contenedor.appendChild(itemTimeline);
  });
});
