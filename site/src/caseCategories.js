import {supportServices} from './supportServices.js';
// Keep chronology IDs stable while sharing the public names and order.
export const caseCategories=supportServices.map(service=>({id:service.category,number:service.number,label:service.name,short:service.short}));
