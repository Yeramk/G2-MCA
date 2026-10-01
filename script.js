document.addEventListener("DOMContentLoaded", () => {
  // 1. LOS DATOS INICIALES
  const minutosDisponibles = 180; // Las horas de hoy
  const fechaHoy = new Date('2026-10-01');

  const asignaturas = [
    { nombre: 'CED', temas: 6, dificultad: 2.0, fechaExamen: new Date('2026-10-21') }, 
    { nombre: 'ADE', temas: 4, dificultad: 1.5, fechaExamen: new Date('2026-10-23') }, 
    { nombre: 'FP', temas: 7, dificultad: 2.0, fechaExamen: new Date('2026-10-26') }   
  ];

  // 2. EL CÁLCULO MATEMÁTICO
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

  // 3. PINTAR EL RESULTADO EN LA WEB
  const contenedor = document.getElementById('contenedor-plan');
  contenedor.innerHTML = ''; 

  planDeHoy.forEach(plan => {
    const horas = Math.floor(plan.minutos / 60);
    const mins = plan.minutos % 60;
    const textoTiempo = horas > 0 ? `${horas}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-estudio';
    tarjeta.innerHTML = `
      <div class="info-asignatura">
        <h3>${plan.nombre}</h3>
        <span class="minutos">Toca estudiar: ${textoTiempo}</span>
      </div>
      <div style="width: 25px; height: 25px; border-radius: 50%; border: 2px solid var(--rosa-principal);"></div>
    `;
    contenedor.appendChild(tarjeta);
  });
});
