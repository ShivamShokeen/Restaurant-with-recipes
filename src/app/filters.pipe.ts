import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  // transform(value: any, ...args: any[]): any {
  //   return null;
  // }
  transform(value: any): any {
    console.log(value);
    // let price = value.sort((obj1,obj2) =>{
    //   if(obj1.price > obj2.price){
    //     return obj1.price;
    //   }
    //   console.log(obj1.price);
    // })

      const price = [];
      value.sort((obj1,obj2) =>{
        if (obj1.price > obj2.price) {
          console.log(obj1.price);
          console.log(obj2.price);
          price.push(obj1.price);
        }
        // else {
        //   price.push(obj2);
        // }
        return price;
      })  
    
    console.log(price);
    // console.log( " price" + JSON.stringify(price));
    // let name =  value.sort((firstName,secondName) =>{
    //   if(firstName > secondName)
    //   return firstName;
    // })
    // console.log(name)
    //return null;
  }

}
