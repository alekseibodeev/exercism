import gleam/list

pub fn place_location_to_treasure_location(
  place_location: #(String, Int),
) -> #(Int, String) {
  #(place_location.1, place_location.0)
}

pub fn treasure_location_matches_place_location(
  place_location: #(String, Int),
  treasure_location: #(Int, String),
) -> Bool {
  place_location_to_treasure_location(place_location) == treasure_location
}

pub fn count_place_treasures(
  place: #(String, #(String, Int)),
  treasures: List(#(String, #(Int, String))),
) -> Int {
  let #(_, place_location) = place
  treasures
  |> list.fold(0, fn(count, treasure) {
    let #(_, treasure_location) = treasure
    case
      treasure_location_matches_place_location(
        place_location,
        treasure_location,
      )
    {
      True -> count + 1
      False -> count
    }
  })
}

pub fn special_case_swap_possible(
  found_treasure: #(String, #(Int, String)),
  place: #(String, #(String, Int)),
  desired_treasure: #(String, #(Int, String)),
) -> Bool {
  case place.0, found_treasure.0, desired_treasure.0 {
    "Abandoned Lighthouse.", "Brass Spyglass", _ -> True
    "Stormy Breakwater", "Amethyst Octopus", "Crystal Crab" -> True
    "Stormy Breakwater", "Amethyst Octopus", "Glass Starfish" -> True
    "Harbor Managers Office", "Vintage Pirate Hat", "Model Ship in Large Bottle"
    -> True
    "Harbor Managers Office",
      "Vintage Pirate Hat",
      "Antique Glass Fishnet Float"
    -> True
    _, _, _ -> False
  }
}
