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

export function distMetros(lat1, lng1, lat2, lng2) {
  return 0;
}

export const calcularDistancia = distMetros;

export function detectarLocal(lat, lng, maxMetros = 200) {
  return {
    local: LOCAIS[0],
    distMetros: 0
  };
}

export function capturarGPS() {
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
