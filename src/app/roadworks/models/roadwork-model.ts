declare namespace Roadwork {
  /**
   * Sinnbild, das die Art des Eintrags beschreibt. Größtenteils sind diese dem offiziellen Verkehrszeichenkatalog
   * entnommen, teilweise allerdings mit abweichender Bedeutung und/oder nicht offiziellen Unternummern.
   * Wo kein passendes Verkehrszeichen existiert, werden nicht-numerische Werte verwendet:
   * - 101: Gefahr
   * - 123: Bauarbeiten
   * - 250: Sperrung
   * - 262-2: Max. 3,5t
   * - 314-50: Park-/Rastplatz (Pkw/Lkw)
   * - 314-50-2: Park-/Rastplatz (nur Pkw)
   * - 448: Anschlussstelle gesperrt
   * - charging_plug_strong: Schnellladestation für E-Fahrzeuge
   * - warnkegel: Kurzzeitbaustelle
   */
  export type Icon =
    '101' | '123' | '250' | '262-2' | '314-50' | '314-50-2' |
    '448' | 'charging_plug_strong' | 'warnkegel'
  export type DisplayType =
    'ROADWORKS' | 'WEBCAM' | 'PARKING' | 'WARNING' | 'WEIGHT_LIMIT_35' |
    'CLOSURE' | 'CLOSURE_ENTRY_EXIT' | 'STRONG_ELECTRIC_CHARGING_STATION' |
    'SHORT_TERM_ROADWORKS' | 'ELECTRIC_CHARGING_STATION'
}

export interface RoadWork {
  coordinate: {
    lat: number,
    long: number
  },
  icon: Roadwork.Icon,
  isBlocked: boolean,
  description: string[],
  title: string,
  display_type: Roadwork.DisplayType,
  future: false,
  subtitle: string,
  startTimestamp: Date
}
