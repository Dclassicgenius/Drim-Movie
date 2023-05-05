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
      <aside className="shadow rounded-lg pl-10 pt-8 col-span-1 h-[300px] overflow-hidden">
        <div className="bg-[#09b4e4] overflow-hidden">
          <h2 className="text-white font-bold p-5">Search Results</h2>
        </div>

        <div className="px-3 py-1">
          {tabs.map((tab) => (
            <ul
              className="flex justify-between py-3"
              onClick={() => handleTabClick(tab)}
              key={tab.id}
              data-toggle="tab"
              role="tablist"
            >
              <li>
                <a
                  className={
                    "text-base leading-normal " +
                    (activeTab.id === tab.id
                      ? "font-bold bg-[#ebebeb]"
                      : " bg-white")
                  }
                >
                  {tab.label}
                </a>
              </li>
              <li
                className={
                  "text-xs leading-normal rounded-full py-1 px-3" +
                  (activeTab.id === tab.id ? " bg-white" : " bg-[#ebebeb]")
                }
              >
                {tab.size}
              </li>
            </ul>
          ))}
        </div>
      </aside>
    </>
  );
}
