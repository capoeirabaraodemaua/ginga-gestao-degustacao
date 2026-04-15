// @ts-nocheck

export const LOCAIS = [
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

export function distMetros() { return 0; }
export const calcularDistancia = distMetros;

export function detectarLocal() {
  return { local: LOCAIS[0], distMetros: 0 };
}

export function capturarGPS() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return reject(new Error('GPS indisponível'));
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  });
}
