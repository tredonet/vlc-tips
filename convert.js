const tips = require("./csvjson.json");

const raphael = tips.map((tip) => {
  const t = {
    name: tip.Name,
    kind: tip.Kind,
    listId: "Raphael",
    description: tip.Description,
    tags: tip.tags.split(", "),
    geometry: {
      lat: tip.Lat,
      lng: tip.lng,
    },
    mapsUrl: tip.URL,
  };
  if (tip.Type) t.type = { [tip.Type.split(": ")[0]]: tip.Type.split(": ")[1] };
  return t;
});

console.log(JSON.stringify(raphael));
