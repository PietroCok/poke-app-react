
export interface PageHeaderProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
}

export function PageHeader({ left, center, right }: PageHeaderProps) {

  return (
    <header className="page-header">
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