import { TabType } from "../../types";

export type TabsProps = {
  tabs: TabType[];
  handleTabClick: (tab: TabType) => void;
  header: string;
  activeTab: TabType;
};

export function Tabs({ tabs, header, handleTabClick, activeTab }: TabsProps) {
  return (
    <>
      <div className="flex flex-wrap w-11/12 px-10 pt-10 mx-auto">
        <div className="flex gap-8 items-center">
          <p className="font-bold text-xl">{header}</p>
          <ul
            className="flex mb-0 list-none flex-wrap flex-row border-2 border-[#1b74d2] border-solid rounded-lg"
            role="tablist"
          >
            {tabs &&
              tabs.map((tab) => (
                <li
                  className="flex-auto text-center rounded-lg cursor-pointer"
                  key={tab.id}
                >
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (activeTab.id === tab.id
                        ? "text-white bg-[#1b74d2]"
                        : "text-[#1b74d2] bg-white")
                    }
                    onClick={() => handleTabClick(tab)}
                    key={tab.id}
                    data-toggle="tab"
                    role="tablist"
                  >
                    {tab.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
