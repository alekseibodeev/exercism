pub fn append(first first: List(a), second second: List(a)) -> List(a) {
  case first {
    [] -> second
    [item, ..rest] -> [item, ..append(rest, second)]
  }
}

pub fn concat(lists: List(List(a))) -> List(a) {
  foldl(lists, [], append)
}

fn concat_loop(lists: List(List(a)), acc: List(a)) -> List(a) {
  case lists {
    [] -> acc
    [item, ..rest] -> concat_loop(rest, append(acc, item))
  }
}

pub fn filter(list: List(a), function: fn(a) -> Bool) -> List(a) {
  foldl(list, [], fn(acc, item) {
    case function(item) {
      True -> append(acc, [item])
      False -> acc
    }
  })
}

pub fn length(list: List(a)) -> Int {
  foldl(list, 0, fn(acc, _item) { acc + 1 })
}

pub fn map(list: List(a), function: fn(a) -> b) -> List(b) {
  foldl(list, [], fn(acc, item) { append(acc, [function(item)]) })
}

pub fn foldl(
  over list: List(a),
  from initial: b,
  with function: fn(b, a) -> b,
) -> b {
  list |> fold_loop(initial, function)
}

pub fn foldr(
  over list: List(a),
  from initial: b,
  with function: fn(b, a) -> b,
) -> b {
  list |> reverse |> fold_loop(initial, function)
}

fn fold_loop(list: List(a), acc: b, cb: fn(b, a) -> b) -> b {
  case list {
    [] -> acc
    [item, ..rest] -> fold_loop(rest, cb(acc, item), cb)
  }
}

pub fn reverse(list: List(a)) -> List(a) {
  reverse_loop(list, [])
}

fn reverse_loop(list: List(a), acc: List(a)) -> List(a) {
  case list {
    [] -> acc
    [item, ..rest] -> reverse_loop(rest, [item, ..acc])
  }
}
