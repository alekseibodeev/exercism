import gleam/list
import gleam/result

pub fn today(days: List(Int)) -> Int {
  days
  |> list.first
  |> result.unwrap(0)
}

pub fn increment_day_count(days: List(Int)) -> List(Int) {
  case days {
    [count, ..rest] -> [count + 1, ..rest]
    [] -> [1]
  }
}

pub fn has_day_without_birds(days: List(Int)) -> Bool {
  list.any(days, fn(x) { x == 0 })
}

pub fn total(days: List(Int)) -> Int {
  list.fold(days, 0, fn(a, b) { a + b })
}

pub fn busy_days(days: List(Int)) -> Int {
  list.fold(days, 0, fn(a, b) {
    let c = case b {
      _ if b >= 5 -> 1
      _ -> 0
    }
    a + c
  })
}
