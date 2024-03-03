export interface Site {
  id:  number;
  nombre: string;
  calle: string;
  altura: number;
  codigoPostal: string | number;
  aulas: number;
}

export interface CreateSiteData {
  siteId: string | number | null;
}