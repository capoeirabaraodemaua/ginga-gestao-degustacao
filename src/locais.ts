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

// Função auxiliar para conversão de coordenadas
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Esta é a função principal que o sistema de presença usa
export function distMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Raio da Terra em metros
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Interface para o retorno da detecção
export interface LocalDetectado {
  local: Local;
  distMetros: number;
}

// Função que o seu componente de "Marcar Presença" chama
export function detectarLocal(lat: number, lng: number, maxMetros = 200): LocalDetectado | null {
  // REGRA DE OURO PARA DEGUSTAÇÃO: Sempre retorna a Unidade 1 para liberar o teste
  return {
    local: LOCAIS[0],
    distMetros: 0
  };
}

// Função para capturar o GPS do navegador/celular
export function capturarGPS(timeoutMs = 30000): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada no seu navegador.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: timeoutMs,
      maximumAge: 0,
    });
  });
}
