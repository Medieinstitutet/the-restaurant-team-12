
import { Customer } from "./Customer";

export class Bookings{
    constructor(public restaurantId:string, public date:string, public time:string, public numberOfGuests:number, public customer: Customer){

    }
}