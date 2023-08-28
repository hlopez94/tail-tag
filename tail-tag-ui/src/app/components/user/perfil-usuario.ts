import { IProfile } from "../auth/model/profile";

export interface PerfilUsuario extends IProfile {
  nombre: string;
  fechaNacimiento: Date;
  redes: RedSocial[];
}

export interface RedSocial{
  nombre:string;
  usuario: string;
  url: string;
}
