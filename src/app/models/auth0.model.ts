import { User } from "@auth0/auth0-angular";

export namespace DAuth0{
  export interface UserInfo extends User {
    description: string
  }
}
