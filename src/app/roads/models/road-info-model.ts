export namespace RoadInfo {

  /**
   * Sinnbild, das die Art des Eintrags beschreibt. Größtenteils sind diese dem offiziellen Verkehrszeichenkatalog
   * entnommen, teilweise allerdings mit abweichender Bedeutung und/oder nicht offiziellen Unternummern.
   * Wo kein passendes Verkehrszeichen existiert, werden nicht-numerische Werte verwendet:
   */
  export enum Icon {
    Gefahr = '101',
    Bauarbeiten = '123',
    Sperrung = '250',
    Max3_5t = '262-2',
    ParkRastplatz_PKW_LKW = '314-50',
    ParkRastplatz_nur_PKW = '314-50-2',
    Sperrung_Anschlussstelle = '448',
    Schnelladestation_EFahrzeuge = 'charging_plug_strong',
    Kurzzeitbaustelle = 'warnkegel'
  }

  export type DisplayType =
    'ROADWORKS' | 'WEBCAM' | 'PARKING' | 'WARNING' | 'WEIGHT_LIMIT_35' |
    'CLOSURE' | 'CLOSURE_ENTRY_EXIT' | 'STRONG_ELECTRIC_CHARGING_STATION' |
    'SHORT_TERM_ROADWORKS' | 'ELECTRIC_CHARGING_STATION'
}

export interface RoadInfo {
  coordinate: {
    lat: number,
    long: number
  },
  title: string,
  description: string[],
  icon: RoadInfo.Icon,
  display_type: RoadInfo.DisplayType,
  subtitle: string
}
