import { Formatter } from './formatter';
import { Theme } from './theme';
export class Formation {
  id:number;
  name:string;
  description:string;
  theme:Theme[];
  formatter:Formatter[];
  lien:String;
  date_creation:String;
  date_final:Date;

}
