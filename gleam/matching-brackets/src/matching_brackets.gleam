import gleam/list
import gleam/result
import gleam/string

pub fn is_paired(value: String) -> Bool {
  value
  |> string.to_graphemes
  |> is_paired_loop([])
}

fn is_paired_loop(values: List(String), opens: List(String)) -> Bool {
  let #(v, rest_v) =
    values
    |> list.pop(fn(_) { True })
    |> result.unwrap(#("", []))
  let #(o, rest_o) =
    opens
    |> list.pop(fn(_) { True })
    |> result.unwrap(#("", []))
  case o, v {
    "", "" -> True
    "[", "]" | "{", "}" | "(", ")" -> is_paired_loop(rest_v, rest_o)
    _, "[" | _, "{" | _, "(" -> is_paired_loop(rest_v, [v, ..opens])
    _, "]" | _, "}" | _, ")" | _, "" -> False
    _, _ -> is_paired_loop(rest_v, opens)
  }
}
