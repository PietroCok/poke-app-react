
export interface PageFooterProps {
  left: React.ReactNode,
  right: React.ReactNode
  solid?: boolean
}

export function PageFooter({ left, right, solid }: PageFooterProps) {
  const _classes = solid ? 'main-bg ' : '';
  return (
    <footer className={`${_classes}page-footer`}>
      {renderElement(left)}
      {renderElement(right)}
    </footer>
  )
}

function renderElement(element: React.ReactNode) {
  return (
    <div className="padding-1" >{element}</div>
  )
}