import gleam/int
import gleam/string

pub fn recite(
  start_bottles start_bottles: Int,
  take_down take_down: Int,
) -> String {
  recite_loop("", start_bottles, take_down)
}

fn translate(bottles: Int) -> String {
  case bottles {
    10 -> "Ten"
    9 -> "Nine"
    8 -> "Eight"
    7 -> "Seven"
    6 -> "Six"
    5 -> "Five"
    4 -> "Four"
    3 -> "Three"
    2 -> "Two"
    1 -> "One"
    _ -> "No"
  }
}

fn add_empty_line_after_verse(verse: String) -> String {
  case string.is_empty(verse) {
    True -> verse
    False -> verse <> "\n\n"
  }
}

fn create_verse(bottles: Int) -> String {
  hanging_line(bottles)
  |> string.repeat(2)
  |> string.append(fall_line())
  |> string.append(will_hanging_line(bottles))
}

fn hanging_line(bottles: Int) -> String {
  let text = translate(bottles)
  text <> " green " <> format(bottles) <> " hanging on the wall,\n"
}

fn fall_line() -> String {
  "And if one green bottle should accidentally fall,\n"
}

fn will_hanging_line(bottles: Int) -> String {
  let text =
    bottles
    |> int.subtract(1)
    |> translate
    |> string.lowercase
  "There'll be "
  <> text
  <> " green "
  <> format(bottles - 1)
  <> " hanging on the wall."
}

fn format(n: Int) {
  case n {
    1 -> "bottle"
    _ -> "bottles"
  }
}

fn recite_loop(lyrics: String, current: Int, left: Int) -> String {
  case left {
    0 -> lyrics
    _ ->
      lyrics
      |> add_empty_line_after_verse
      |> string.append(create_verse(current))
      |> recite_loop(current - 1, left - 1)
  }
}
