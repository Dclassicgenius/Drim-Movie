import classNames from "classnames";

export type SearchTab = {
  id: number;
  label: string;
  size: number | null;
};

type SearchSideBarProps = {
  tabs: SearchTab[];
  handleTabClick: (tab: SearchTab) => void;
  activeTab: SearchTab;
};

export function SearchSideBar({
  tabs,
  handleTabClick,
  activeTab,
}: SearchSideBarProps) {
  return (
    <>
      <aside className="shadow rounded-lg sm:col-span-1 overflow-hidden sm:h-[200px]">
        <div className="bg-[#09b4e4] overflow-hidden">
          <h2 className="text-white font-bold p-5 text-lg">Search Results</h2>
        </div>
        <ul className="py-2">
          {tabs.map((tab) => (
            <li
              className={classNames(
                "group hover:bg-[#ebebeb] flex justify-between py-2 px-4 items-center cursor-pointer",
                {
                  "bg-[#ebebeb]": activeTab.id === tab.id,
                  "bg-white": activeTab.id !== tab.id,
                }
              )}
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              data-toggle="tab"
              role="tablist"
            >
              <p
                className={classNames("text-base", {
                  "font-bold": activeTab.id === tab.id,
                  "font-normal": activeTab.id !== tab.id,
                })}
              >
                {tab.label}
              </p>
              <p
                className={classNames(
                  "rounded-full px-3 py-0.5 text-xs",
                  {
                    "bg-white": activeTab.id === tab.id,
                    "bg-[#ebebeb]": activeTab.id !== tab.id,
                  },
                  "group-hover:bg-white"
                )}
              >
                {tab.size}
              </p>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
