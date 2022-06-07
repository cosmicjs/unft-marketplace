export const filterByType = ( data,index ) => {
  if( data?.length && index ) {
    const typeData = data?.filter( ( item ) => item.hasOwnProperty( index ) )[ 0 ][ index ];
    return typeData ? typeData : [];
  } else {
    return [];
  }
};