const chooseBySlug = (data, slugName) => {
  if( data && slugName ) {
    const chooseBySlug = data?.filter(content => Object.values(content).includes(slugName.toLowerCase()));
    return chooseBySlug ? chooseBySlug[0] : [];
  }
}

export default chooseBySlug;


