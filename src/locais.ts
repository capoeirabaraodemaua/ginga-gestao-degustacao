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

function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function detectarLocal(lat: number, lng: number) {
  const maxMetros = 200;
  let melhor = null;

  for (const local of LOCAIS) {
    if (local.lat === 0) continue; 
    const dist = calcularDistancia(lat, lng, local.lat, local.lng);
    if (!melhor || dist < melhor.distMetros) {
      melhor = { local, distMetros: dist };
    }
  }

  // Se achou um local real perto (ex: se você voltar a usar GPS fixo), retorna ele
  if (melhor && melhor.distMetros <= maxMetros) return melhor;

  // LIBERAÇÃO PARA DEGUSTAÇÃO:
  // Como as unidades demo têm lat 0, o loop acima pula elas.
  // Aqui a gente força o retorno da Unidade 1 para o teste de presença não travar no Brasil todo.
  const demo = LOCAIS[0]; 
  return { local: demo, distMetros: 0 };
}
