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
    id: 'demo1',
    nome: 'Unidade Experimental 1',
    endereco: 'Demonstração',
    nucleo: 'Unidade Experimental 1',
    lat: 0,
    lng: 0,
    mapUrl: ''
  }
];

export function distMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  return 0;
}

export interface LocalDetectado {
  local: Local;
  distMetros: number;
}

export function detectarLocal(lat: number, lng: number): LocalDetectado | null {
  return { local: LOCAIS[0], distMetros: 0 };
}

export function capturarGPS(): Promise<any> {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(resolve, () => {}, { enableHighAccuracy: true });
  });
}
