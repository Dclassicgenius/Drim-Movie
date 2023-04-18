import { TabProps } from "./types";
import { Button } from "flowbite-react";

export function Tab({ tabs, handleTabClick, header, activeTab }: TabProps) {
  const renderTabs = () =>
    tabs.map((tab) => (
      <Button
        gradientDuoTone="cyanToBlue"
        onClick={() => handleTabClick(tab)}
        key={tab.id}
        className={`${
          activeTab.id === tab.id
            ? "bg-red-700 hover:bg-red-700"
            : "bg-white hover:bg-green-500"
        }`}
      >
        {tab.title}
      </Button>
    ));

  return (
    <>
      <div className="w-11/12 px-10 pt-10 mx-auto">
        <div className="flex gap-8 items-center">
          <p className="font-bold text-xl">{header}</p>
          <Button.Group outline={true} className="tabs-container">
            {renderTabs()}
          </Button.Group>
        </div>
      </div>
    </>
  );
}
