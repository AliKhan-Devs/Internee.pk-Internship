"use client";

import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Combine multiple icon packs (you can add more)
const allIcons = { ...FaIcons, ...MdIcons, ...IoIcons };

export default function IconPicker({ label = "Icon", value, onChange }) {
  const [showIcons, setShowIcons] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = Object.keys(allIcons).filter((key) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        {label && <Label>{label}</Label>}
      <Input
        value={value || ""}
        readOnly
        onClick={() => setShowIcons(!showIcons)}
        placeholder="Select an icon"
        className="cursor-pointer"
      />
      </div>

      {showIcons && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg p-3">
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />

          <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
            {filteredIcons.map((key) => {
              const Icon = allIcons[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onChange(key);
                    setShowIcons(false);
                  }}
                >
                  <Icon className="text-xl" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
