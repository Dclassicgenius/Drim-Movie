import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

export function SideBar() {
  return (
    <>
      <aside className="space-y-5 p-4 pt-10 col-span-1">
        <ol className="flex gap-5 text-xl pb-6">
          <li>
            <a href="#">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="#">
              <FaLink />
            </a>
          </li>
        </ol>
        <div>
          <p className="font-bold text-base">Status</p>
          <p className="text-sm">Released</p>
        </div>
        <div>
          <p className="font-bold text-base">Original Language</p>
          <p className="text-sm">English</p>
        </div>
        <div>
          <p className="font-bold text-base">Budget</p>
          <p className="text-sm">$80,000,000.00</p>
        </div>
        <div>
          <p className="font-bold text-base">Revenue</p>
          <p className="text-sm">$366,080,049.00</p>
        </div>
      </aside>
    </>
  );
}
