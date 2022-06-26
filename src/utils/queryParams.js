const handleQueryParams = ({color, min, max, categories}) => {
  let queryParam = {categories};

  if(color?.toLocaleLowerCase() !== "colors") {
    queryParam = { ...queryParam, color};
  }

  if(min && Number(min) > 0 ) {
    queryParam = { ...queryParam, min};
  }

  if(max && Number(max) > Number(min) ) {
    queryParam = { ...queryParam, max};
  }

  return queryParam;
}

export default handleQueryParams;