import gleam/list
import gleam/string

pub fn build(letter: String) -> String {
  let code = get_utf_code(letter)
  let code_a = get_utf_code("A")
  let index = code - code_a
  let width = 2 * index + 1
  do_build("A", letter, [], width)
}

fn do_build(
  letter: String,
  target: String,
  diamond: List(String),
  width: Int,
) -> String {
  case letter == target {
    True ->
      diamond
      |> list.reverse
      |> list.append([build_line(letter, width), ..diamond])
      |> string.join("\n")
    False -> {
      do_build(
        get_next_letter(letter),
        target,
        [build_line(letter, width), ..diamond],
        width,
      )
    }
  }
}

fn get_utf_code(letter: String) -> Int {
  let assert [utf_codepoint, ..] = string.to_utf_codepoints(letter)
  string.utf_codepoint_to_int(utf_codepoint)
}

fn get_next_letter(letter: String) -> String {
  let code = get_utf_code(letter)
  let assert Ok(utf_codepoint) = string.utf_codepoint(code + 1)
  string.from_utf_codepoints([utf_codepoint])
}

fn build_line(letter: String, width: Int) -> String {
  let code = get_utf_code(letter)
  let code_a = get_utf_code("A")
  let index = code - code_a
  case index == 0 {
    True -> {
      let space_around_multiplier = { width - 1 } / 2
      let space_around = string.repeat(" ", space_around_multiplier)
      space_around <> letter <> space_around
    }
    False -> {
      let space_between_multiplier = index * 2 - 1
      let space_between = string.repeat(" ", space_between_multiplier)
      let space_around_multiplier = { width - space_between_multiplier - 2 } / 2
      let space_around = string.repeat(" ", space_around_multiplier)
      space_around <> letter <> space_between <> letter <> space_around
    }
  }
}
