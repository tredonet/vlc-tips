import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import usePlacesAutocomplete from "use-places-autocomplete";

export const PlaceSearchBar: React.FC<{ handleSelect: any }> = ({ handleSelect }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
    } = usePlacesAutocomplete();
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          disabled={!ready}
          className=" w-full p-2"
          placeholder="Search an address"
        />
        <ComboboxPopover className="w-full p-2">
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };
  