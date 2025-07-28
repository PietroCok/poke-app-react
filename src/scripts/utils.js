


export function ingredientNameToId(name){
  if(!name) return '';

  return name.replaceAll(" ", "-").replaceAll("'", "--");
}


export function ingredientIdToName(id){
  if(!id) return '';

  return id.replaceAll("-", " ").replaceAll("--", "'");
}

