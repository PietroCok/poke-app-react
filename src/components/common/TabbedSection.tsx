import { useState } from "react"

export interface TabbedSectionProps {
  tabsName: string[],
  tabsContent: React.ReactNode[]
}


export function TabbedSection({ tabsName, tabsContent }: TabbedSectionProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      {renderHeader(tabsName, activeTabIndex, setActiveTabIndex)}
      {renderActiveTab(tabsContent, activeTabIndex)}
    </>
  )
}

const renderHeader = (tabsName: string[], activeTabIndex: number, setActiveTabIndex: (tabIndex: number) => void) => {
  return (
    <h4
      className="tabbed-header flex just-between main-bg sticky top-0"
    >
      {tabsName.map((tabName, index) => {
        const color = activeTabIndex === index ? 'primary-color' : '';

        return (
          <span
            key={tabName.replace(" ", "-")}
            onClick={() => setActiveTabIndex(index)}
            className={`flex-1 padding-1 text-center text-uppercase pointer ${color}`}
          >
            {tabName}
          </span>
        )
      })}
    </h4>
  )
}

const renderActiveTab = (tabsContent: React.ReactNode[], activeTabIndex: number) => {
  if (activeTabIndex > tabsContent.length) {
    return null;
  }

  return tabsContent[activeTabIndex];
}