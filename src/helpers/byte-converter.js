const units = ['bytes', 'kb', 'mb', 'gb',];
   
export const byteConverter = (byte) => {

  let l = 0, n = parseInt(byte, 10) || 0;

  while(n >= 1024 && ++l){
      n = n/1024;
  }
  
  return (n.toFixed(n < 10 && l > 0 ? 1 : 2) + ' ' + units[l]);
}