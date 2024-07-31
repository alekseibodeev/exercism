pub fn keep(list: List(t), predicate: fn(t) -> Bool) -> List(t) {
  filter(list, fn(item) { predicate(item) })
}

pub fn discard(list: List(t), predicate: fn(t) -> Bool) -> List(t) {
  filter(list, fn(item) { !predicate(item) })
}

fn filter(list: List(t), predicate: fn(t) -> Bool) -> List(t) {
  case list {
    [] -> []
    [item, ..rest] ->
      case predicate(item) {
        True -> [item, ..filter(rest, predicate)]
        False -> filter(rest, predicate)
      }
  }
}
