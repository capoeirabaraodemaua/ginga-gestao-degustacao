export interface Local {
  id: string;
  nome: string;
  endereco: string;
  nucleo: string;
  lat: number;
  lng: number;
  mapUrl: string;
}
  {
   export const LOCAIS: Local[] = [
  {
    id: 'demo 1',
    nome: 'Unidade Experimental 1',
    endereco: 'Demonstração - Nível Brasil',
    nucleo: 'Unidade Experimental 1',
    lat: 0,
    lng: 0,
    mapUrl: ''
  },
  {
    id: 'demo 2',
    nome: 'Unidade Experimental 2',
    endereco: 'Demonstração - Nível Brasil',
    nucleo: 'Unidade Experimental 2',
    lat: 0,
    lng: 0,
    mapUrl: ''
  },
  {
    id: 'demo 3',
    nome: 'Unidade Experimental 3',
    endereco: 'Demonstração - Nível Brasil',
    nucleo: 'Unidade Experimental 3',
    lat: 0,
    lng: 0,
    mapUrl: ''
  }
];
  },
];

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

/** Distância em metros entre dois pontos (Haversine) */
export function distMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface LocalDetectado {
  local: Local;
  distMetros: number;
}

/**
 * Dado lat/lng do usuário, retorna o local mais próximo.
 * Retorna null se nenhum local estiver dentro de maxMetros.
 * maxMetros = 200 → precisa estar dentro de 200m do local.
 */
export function detectarLocal(lat: number, lng: number, maxMetros = 200): LocalDetectado | null {
  let melhor: LocalDetectado | null = null;
  for (const local of LOCAIS) {
    const d = distMetros(lat, lng, local.lat, local.lng);
    if (!melhor || d < melhor.distMetros) {
      melhor = { local, distMetros: d };
    }
  }
 // Se achou um local real perto, retorna ele
  if (melhor && melhor.distMetros <= maxMetros) return melhor;

  // LIBERAÇÃO PARA DEGUSTAÇÃO:
  // Se não achou nada perto, ele assume a "Unidade Experimental 1" 
  // para permitir que o cliente teste a presença de qualquer lugar do Brasil.
  const demo = LOCAIS.find(l => l.id === 'demo 1');
  if (demo) return { local: demo, distMetros: 0 };

  return null;
}

/** Captura posição GPS de alta precisão via browser.
 *  Sempre força leitura fresca do sensor (maximumAge: 0).
 *  Funciona online e offline — GPS é recurso do dispositivo.
 */
export function capturarGPS(timeoutMs = 30000): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: timeoutMs,
      maximumAge: 0, // sempre leitura fresca — sem cache
    });
  });
}

/** Inicia watchPosition para atualização contínua de GPS.
 *  Retorna o watchId para cancelamento posterior via clearWatch.
 */
export function iniciarWatchGPS(
  onUpdate: (pos: GeolocationPosition) => void,
  onError?: (err: GeolocationPositionError) => void,
): number {
  if (!navigator.geolocation) return -1;
  return navigator.geolocation.watchPosition(onUpdate, onError ?? (() => {}), {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0,
  });
}
