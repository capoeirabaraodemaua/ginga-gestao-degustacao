function toRad(valor: number): number {
  return (valor * Math.PI) / 180;
}

export function distMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // raio da Terra em metros
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function detectarLocal(lat: number, lng: number, maxMetros = 100): LocalDetectado | null {
  let maisProximo: LocalDetectado | null = null;

  for (const local of LOCAIS) {
    const distancia = distMetros(lat, lng, local.lat, local.lng);

    if (distancia <= maxMetros) {
      if (!maisProximo || distancia < maisProximo.distMetros) {
        maisProximo = {
          local,
          distMetros: distancia
        };
      }
    }
  }

  return maisProximo;
}
