export const formatNumber = (value:number, includeCommas:boolean = false) => {
    
    if(includeCommas){
        return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    }else if (Math.abs(value) >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}m`;
    } else if (Math.abs(value) >= 1e3) {
      return `$${(value / 1e3).toFixed(0)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };


  export function roundToFirstNonZeroDecimal(input: string | null) {
    if(!Number(input)) return 0;
    // Parse the input as a floating-point number
    const number = parseFloat(input??'0');
    console.log("input", number, "result",Math.max(2,1-Math.floor(Math.log(number)/Math.log(10))));
    

  
    const finalNumber = number.toFixed(Math.max(2, 1-Math.floor(Math.log(number)/Math.log(10))))

    return finalNumber;
  }
  
    