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
    id: 'teste',
    nome: 'Modo Teste (Presença Livre)',
    endereco: 'Qualquer localização',
    nucleo: 'Teste',
    lat: 0,
    lng: 0,
    mapUrl: ''
  }
];

// 🔓 MODO TESTE: sempre retorna 0
export function distMetros(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  return 0;
}

export interface LocalDetectado {
  local: Local;
  distMetros: number;
}

// 🔓 MODO TESTE: sempre permite presença
export function detectarLocal(
  lat: number,
  lng: number,
  maxMetros?: number
): LocalDetectado | null {
  return {
    local: LOCAIS[0],
    distMetros: 0
  };
}

// GPS normal (mantido)
export function capturarGPS(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('GPS não suportado'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });
  });
}
