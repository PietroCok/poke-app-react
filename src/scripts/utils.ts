


export function ingredientNameToId(name: string){
  if(!name) return '';

  return name.replaceAll(" ", "-").replaceAll("'", "--");
}


export function ingredientIdToName(id: string){
  if(!id) return '';

  return id.replaceAll("--", "'").replaceAll("-", " ");
}

