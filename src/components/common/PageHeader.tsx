
export interface PageHeaderProps {
  classes?: string
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
}

export function PageHeader({ classes, left, center, right }: PageHeaderProps) {
  let _classes = classes ? `${classes} ` : '';

  return (
    <header 
      className={`${_classes}page-header`}
    >
      {renderElement(left)}
      {renderElement(center)}
      {renderElement(right)}
    </header>
  )
}

function renderElement(element: React.ReactNode) {
  return (
    <div className="padding-1" >{element}</div>
  )
}