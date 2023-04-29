interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface Stat {
  baseStat: number;
  type: string;
}

export function usePokemonHelpers() {
  function getTypesUrls(types: PokemonType[]) {
    const typeUrls = [];
    for (const item of types) {
      typeUrls.push(item.type.url);
    }
    return typeUrls;
  }

  function getStats(stats: PokemonStat[]): Stat[] {
    const statsArr: Stat[] = [];
    for (const stat of stats) {
      const newStat: Stat = {
        baseStat: stat.base_stat,
        type: stat.stat.name,
      };
      statsArr.push(newStat);
    }
    return statsArr;
  }
  return { getTypesUrls, getStats };
}
