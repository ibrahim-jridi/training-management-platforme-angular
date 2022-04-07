import { Formatter } from './formatter';
import { Theme } from './theme';
export class Formation {
  id:number;
  name:string;
  description:string;
  theme:Theme[];
  formatter:Formatter[];
  lien:String;
  date_creation:Date;
  date_debut:Date;
  date_final:Date;

}
