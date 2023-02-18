import React,{ useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, MapIcon, MapPinIcon, ChevronLeftIcon, MagnifyingGlassIcon, ClockIcon, XMarkIcon } from '@heroicons/react/20/solid'

const location = [
  { id: 1, name: 'Hamiltion Building' },
  { id: 2, name: '1937' },
  { id: 3, name: 'Phenix Building' },
  { id: 4, name: 'Dorset Point' },
  { id: 5, name: 'Widow Street' },
  { id: 6, name: 'Cindy House' },
]

export default function MyCombobox() {
  const [selected, setSelected] = useState(location[0])
  const [query, setQuery] = useState('')

  const filteredLocation =
    query === ''
      ? location
      : location.filter((location) =>
      location.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="fixed top-16 w-full py-2 pl-3 pr-3">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
           <div className="flex space-x-2 ">
            <ChevronLeftIcon className="h-10 w-5"/>
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person:any) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            </div>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 h-800 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div className="flex space-x-20 px-10 pb-2 pt-2">
            <h1 className='w-60'>My current location</h1>
            <MapIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="w-full h-0.5 bg-gray-500 rounded mx-auto my-2"></div>
            <div className="flex space-x-20 px-10 pb-2 pt-2">
            <h1 className='w-60'>Choose from the map</h1>
            <MapPinIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="w-full h-0.5 bg-gray-500 rounded mx-auto my-2"></div>
            <h1 className='w-60 px-5'>History/Suggested</h1>
              {filteredLocation.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-5 text-gray-700 h-full">
                  Nothing found.
                </div>
              ) : (
                filteredLocation.map((location) => (
                  <Combobox.Option
                    key={location.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2  pr-4 ${
                        active ? 'bg-white text-black' : 'text-black'
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                      <div className="flex space-x-5 px-10 pb-2 pt-2">
                       <ClockIcon className="h-5 w-5 space-x-3" aria-hidden="true"/>
                        <span
                          className={`block truncate w-60 ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {location.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 w-200${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                          </span>
                        ) : null}
                        <XMarkIcon className="h-5 w-5 right-0" aria-hidden="true"/>
                        </div>
                        <div className="w-full h-0.5 bg-gray-500 rounded mx-auto my-2"></div>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
