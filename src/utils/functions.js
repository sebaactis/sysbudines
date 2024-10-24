export const calculate_total_price = (items) =>{
     return items.reduce((acc, item)=>(acc+=item.precio*item.quantity),0)
}