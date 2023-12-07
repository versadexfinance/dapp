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