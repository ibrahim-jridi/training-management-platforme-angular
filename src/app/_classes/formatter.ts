import { Formation } from './formation';
export class Formatter {
  id: number;
  userName: string;
  userFirstName: string;
  userLastName: string;
  email: string;
  userPassword:string;
  userConfirmPassword:string;
	phone:string;
  specialite:string;
  adresse:string;
  formation:Formation[];
  fileName;
}
