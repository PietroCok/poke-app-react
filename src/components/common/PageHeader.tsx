
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
      {renderElement(left, "padding-1")}
      {renderElement(center, "padding-1-0 min-w-0")}
      {renderElement(right, "padding-1")}
    </header>
  )
}

function renderElement(element: React.ReactNode, classes: string) {
  return (
    <div className={classes} >{element}</div>
  )
}