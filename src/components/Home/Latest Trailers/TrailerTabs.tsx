export interface TrailerTabs {
  id: string | number;
  label: string;
}

export type TabsProps = {
  tabs: TrailerTabs[];
  handleTabClick: (tab: TrailerTabs) => void;
  activeTab: TrailerTabs;
};

export function TrailerTabs({ tabs, handleTabClick, activeTab }: TabsProps) {
  return (
    <>
      <div className="flex flex-wrap w-11/12 px-10 pt-10 mx-auto">
        <div className="flex gap-8 items-center">
          <p className="font-bold text-xl">Latest Trailers</p>
          <ul
            className="flex mb-0 list-none flex-wrap flex-row border-2 border-[#fff] border-solid rounded"
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
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg block leading-normal " +
                      (activeTab.id === tab.id
                        ? "text-white bg-[#1b74d2]"
                        : "text-[#1b74d2] bg-white")
                    }
                    onClick={() => handleTabClick(tab)}
                    key={tab.id}
                    data-toggle="tab"
                    role="tablist"
                  >
                    {tab.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
