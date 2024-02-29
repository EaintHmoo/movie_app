import React, { useState, Fragment, useEffect, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CategoriesData } from "../Data/CategoriesData";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../Actions/categoryActions";
const YearsData = [
  { value: "", title: "Sort By Year" },
  { value: "1700 - 1800", title: "1700 - 1800" },
  { value: "1800 - 1900", title: "1800 - 1900" },
  { value: "1900 - 2000", title: "1900 - 2000" },
  { value: "2000 - 2010", title: "2000 - 2010" },
  { value: "2010 - 2030", title: "2010 - 2030" },
];

const TimesData = [
  { value: "", title: "Sort By Hours" },
  { value: "1 - 5", title: "1 - 5 Hours" },
  { value: "5 - 10", title: "5 - 10 Hours" },
  { value: "10 - 15", title: "10 - 15 Hours" },
  { value: "15 - 20", title: "15 - 20 Hours" },
];

const RatesData = [
  { value: "", title: "Sort By Rates" },
  { value: "1", title: "1 Star" },
  { value: "2", title: "2 Star" },
  { value: "3", title: "3 Star" },
  { value: "4", title: "4 Star" },
  { value: "5", title: "5 Star" },
];

function Filter({ handleFilterData }) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    value: "",
    title: "Sort By Category",
  });
  const [year, setYear] = useState(YearsData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const { categories } = useSelector((state) => state.categories);
  const handlerFunction = useCallback(() => {
    return handleFilterData;
  }, []);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    handleFilterData({
      category: category.value.trim(),
      year: year.value && year.value.trim().split(" - ").map(Number),
      times: times.value && times.value.trim().split(" - ").map(Number),
      rates: rates.value.trim(),
    });
  }, [category, year, times, rates, handlerFunction]);
  const FilterData = [
    {
      value: category,
      onChange: setCategory,
      items: categories.map((category) => ({
        value: category.title,
        title: category.title,
      })),
    },
    {
      value: year,
      onChange: setYear,
      items: YearsData,
    },
    {
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];
  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {FilterData.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-border  w-full cursor-default bg-main rounded-lg text-white text-left py-4 pl-6 pr-10 text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FaAngleDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm py-1">
                {item.items.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="w-3 h-3" aria-hidden={true} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}
export default Filter;
