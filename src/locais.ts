// 1. Interfaces
export interface Local {
  id: string;
  nome: string;
  endereco: string;
  nucleo: string;
  lat: number;
  lng: number;
  mapUrl: string;
}

export interface LocalDetectado {
  local: Local;
  distMetros: number;
}

// 2. Dados
export const LOCAIS: Local[] = [
  {
    id: 'demo1',
    nome: 'Unidade Experimental 1',
    endereco: 'Demonstração',
    nucleo: 'Unidade Experimental 1',
    lat: 0,
    lng: 0,
    mapUrl: ''
  },
  {
    id: 'demo2',
    nome: 'Unidade Experimental 2',
    endereco: 'Demonstração',
    nucleo: 'Unidade Experimental 2',
    lat: 0,
    lng: 0,
    mapUrl: ''
  }
];

// 3. Funções (Com os dois nomes possíveis para não dar erro)
export function distMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  return 0; 
}

// Criando o apelido para o sistema não reclamar que "calcularDistancia" sumiu
export const calcularDistancia = distMetros;

export function detectarLocal(lat: number, lng: number, maxMetros = 200): LocalDetectado | null {
  return {
    local: LOCAIS[0],
    distMetros: 0
  };
}

export function capturarGPS(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('GPS não suportado'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  });
}
