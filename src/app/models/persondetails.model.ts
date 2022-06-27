export interface Details {
    id: number;
    lname: string;
    fname: string;
    tel: string;
}

export interface AddressDetails {
    id: number;
    addr: string;
    city: string;
    st: string;
    zip: string;
    addrtype: string;
}
export interface PersonDetails extends AddressDetails {
    lname: string;
    fname: string;
    tel: string;
}