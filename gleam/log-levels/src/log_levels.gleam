import gleam/string

pub fn message(log_line: String) -> String {
  case string.split(string.trim(log_line), on: ": ") {
    [_, msg] -> string.trim(msg)
    _ -> ""
  }
}

pub fn log_level(log_line: String) -> String {
  case string.split(string.trim(log_line), on: ": ") {
    [lvl, _] ->
      lvl
      |> string.lowercase
      |> string.drop_left(1)
      |> string.drop_right(1)
    _ -> ""
  }
}

pub fn reformat(log_line: String) -> String {
  case string.split(string.trim(log_line), on: ": ") {
    [lvl, msg] ->
      lvl
      |> string.lowercase
      |> string.replace("[", "(")
      |> string.replace("]", ")")
      |> string.append(string.trim(msg) <> " ", _)
    _ -> ""
  }
}
