export interface Local {
  id: string;
  nome: string;
  endereco: string;
  nucleo: string;
  lat: number;
  lng: number;
  mapUrl: string;
}

export const LOCAIS: Local[] = [
  {
    id: 'demo 1',
    nome: 'Unidade Experimental 1',
    endereco: 'Demonstração (GPS Liberado)',
    nucleo: 'Unidade Experimental 1',
    lat: 0,
    lng: 0,
    mapUrl: ''
  },
  {
    id: 'demo 2',
    nome: 'Unidade Experimental 2',
    endereco: 'Demonstração (GPS Liberado)',
    nucleo: 'Unidade Experimental 2',
    lat: 0,
    lng: 0,
    mapUrl: ''
  },
  {
    id: 'demo 3',
    nome: 'Unidade Experimental 3',
    endereco: 'Demonstração (GPS Liberado)',
    nucleo: 'Unidade Experimental 3',
    lat: 0,
    lng: 0,
    mapUrl: ''
  }
];

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function distMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface LocalDetectado {
  local: Local;
  distMetros: number;
}

export function detectarLocal(lat: number, lng: number, maxMetros = 200): LocalDetectado | null {
  let melhor: LocalDetectado | null = null;

  for (const local of LOCAIS) {
    if (local.lat === 0) continue;
    const d = distMetros(lat, lng, local.lat, local.lng);
    if (!melhor || d < melhor.distMetros) {
      melhor = { local, distMetros: d };
    }
  }

  if (melhor && melhor.distMetros <= maxMetros) return melhor;

  // REGRA PARA DEGUSTAÇÃO: Assume a Unidade 1 se estiver longe
  const demo = LOCAIS[0];
  return { local: demo, distMetros: 0 };
}

export function capturarGPS(timeoutMs = 30000): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: timeoutMs,
      maximumAge: 0,
    });
  });
}
