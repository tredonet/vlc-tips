import { Tip } from "@/models";
import L, { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const ARROW_DOWN_KEY = 40;
const ARROW_UP_KEY = 38;
const ARROW_LEFT_KEY = 37;
const ARROW_RIGHT_KEY = 39;

const SPECIAL_KEYS = [ENTER_KEY, ESCAPE_KEY, ARROW_DOWN_KEY, ARROW_UP_KEY, ARROW_LEFT_KEY, ARROW_RIGHT_KEY];
type Query = {
  query: string;
  data: unknown;
};

export const useSearchBox = () => {
  const [tip, setTip] = useState<Tip | undefined>();
  function SearchBox() {
    const provider = new OpenStreetMapProvider();

    //@ts-ignore
    const searchControl = new GeoSearchControl({
      provider,
      retainZoomLevel: true,
      keepResult: true,
      style: "bar",
      searchLabel: "Enter place name",
      resultFormat: ({ result }: { result: SearchResult }) => result.label,
      marker: {
        icon: new Icon({ iconUrl: "../../../../busMarker.svg" }),
      },
    });

    searchControl.onSubmit = async (query: Query) => {
      query.query = query.query.trim() + " Valencia";
      searchControl.resultList.clear();
      const { provider } = searchControl.options;

      39.42 - 39.5 - 0.44 - -0.33;
      const _results = await provider!.search(query);
      const results: SearchResult[] = _results.filter((r: SearchResult) => r.y > 39.42 && r.y < 39.5 && r.x > -0.44 && r.x < -0.33);
      if (results && results.length > 0) {
        searchControl.showResult(results[0], query);
      }
    };

    searchControl.autoSearch = async (event: KeyboardEvent) => {
      if (SPECIAL_KEYS.indexOf(event.keyCode) > -1) {
        return;
      }
      const query = (event.target as HTMLInputElement).value;
      const { provider } = searchControl.options;

      if (query.length) {
        let results = await provider!.search({ query });
        results = results.filter((r: SearchResult) => r.y > 39.42 && r.y < 39.5 && r.x > -0.44 && r.x < -0.33);
        results = results.slice(0, searchControl.options.maxSuggestions);
        searchControl.resultList.render(results, searchControl.options.resultFormat);
      } else {
        searchControl.resultList.clear();
      }
    };

    const map = useMap();

    map.on("geosearch/showlocation", ({ location }: any) => {
      setTip({
        geometry: {
          lat: location.y,
          lng: location.x,
        },
        name: location.raw.name,
        kind: "Restaurant",
        description: "",
        mapsUrl: "",
        tags: [],
      });
    });
    //@ts-ignore
    useEffect(() => {
      map.addControl(searchControl);
      const clearButton = document.querySelector(".reset");
      clearButton?.addEventListener("click", () => {
        map.eachLayer((layer) => layer instanceof L.Marker && map.removeLayer(layer));
        setTip(undefined);
      });
      return () => map.removeControl(searchControl);
    }, []);

    return null;
  }
  return { SearchBox, tip };
};
