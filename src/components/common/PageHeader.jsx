


export default function PageHeader({left, center, right}){

  return (
    <header className="page-header">
      {renderElement(left)}
      {renderElement(center)}
      {renderElement(right)}
    </header>
  )
}

function renderElement(element){
  return (
    <div className="padding-1" >{element}</div>
  )
}