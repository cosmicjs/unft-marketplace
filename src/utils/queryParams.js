const handleQueryParams = ({color, min, max, category, search}) => {
  let queryParam = {category};

  if(color && color?.toLocaleLowerCase() !== "colors") {
    queryParam = { ...queryParam, color};
  }

  if(min && Number(min) > 0 ) {
    queryParam = { ...queryParam, min};
  }

  if(max && Number(max) > Number(min) ) {
    queryParam = { ...queryParam, max};
  }

  if(search && search?.length ) {
    queryParam = { ...queryParam, search};
  }

  return queryParam;
}

export default handleQueryParams;