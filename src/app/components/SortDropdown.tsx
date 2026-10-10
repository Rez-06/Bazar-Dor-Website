"use client";
import { useRef, useState } from "react";
import Card from "@/app/components/Card";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

const SortDropdown = ({ data }: { data: any[] }) => {
  const [selected, setSelected] = useState("default");
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const sorted =
    selected === "asc"
        ? [...data].sort((a, b) => a.today - b.today)
        : selected === "desc"
        ? [...data].sort((a, b) => b.today - a.today)
        : data;

  const currentLabel = OPTIONS.find((o) => o.value === selected)?.label;

  return (
    <>
      <div className="bg-white container mx-auto my-5 rounded-3xl flex justify-end items-center border gap-5 border-gray-200 mt-8 p-5">
        <div>সাজান</div>
        <div>
          <details className="dropdown" ref={dropdownRef}>
            <summary className="btn m-1">
              {currentLabel}
              <FontAwesomeIcon className="h-5" icon={faAngleDown} style={{ color: "rgb(0,0,0)" }} />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-56 p-2 shadow-sm">
              {OPTIONS.map((o) => (
                <li key={o.value}>
                  <a
                    className={selected === o.value ? "menu-active" : ""}
                    onClick={() => {
                      setSelected(o.value);
                      dropdownRef.current?.removeAttribute("open");
                    }}
                  >
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center justify-center">
        {sorted.map((n) => (
          <Card key={n.id} props={n} />
        ))}
      </div>
    </>
  );
};

export default SortDropdown;