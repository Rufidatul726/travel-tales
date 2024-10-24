import { getJson } from "serpapi";

getJson({
  engine: "google_maps_autocomplete",
  q: "cafe",
  hl: "en",
  gl: "us",
  api_key: "ab73bbcab3bd2d183d7a3f0080032a420edf4f7fdb9f87ce97ff029382877aae"
}, (json: any) => {
  console.log(json["suggestions"]);
});

export const MapAPI = () =>{
    const uri= "https://serpapi.com/search.json?engine=google_maps_autocomplete&q=cafe&hl=en&gl=us"
}