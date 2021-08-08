export interface User {
  idUser?: number,
  sexe?: number,
  pseudo?: string,
  firstname?: string,
  lastname?: string,
  description?:string,
  email: string,
  tel?:number,
  image?:string,
  password: string,
  dateBirth?: string,
  adresseLivraison?:string,
  adresseFacturation?:string,
  createdAt?: string

}
