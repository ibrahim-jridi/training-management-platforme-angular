import { Formation } from './formation';
export class Guest {
  public id : number;
  public userFirstName: string;
  public userLastName: string;
  public userName: string;
  public userPassword: string;
  public userConfirmPassword: string;
  public email: string;
  public adresse : string;
  public phone : string;

  public formations !: Formation;
}
