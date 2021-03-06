export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Friend {
  id: number;
  username: string;
  pictureURL: string;
}

export interface SimpleUser {
  id: number;
  name: string;
  username: string;
  email: string;
  pictureURL?: string;
}

export interface User extends SimpleUser {
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
  friendIDs?: number[];
  friends?: Friend[];
}
