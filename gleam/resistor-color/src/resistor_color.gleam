import gleam/list.{Continue, Stop}

pub type Color {
  Black
  Brown
  Red
  Orange
  Yellow
  Green
  Blue
  Violet
  Grey
  White
}

pub fn code(color: Color) -> Int {
  list.fold_until(colors(), 0, fn(acc, item) {
    case item == color {
      True -> Stop(acc)
      False -> Continue(acc + 1)
    }
  })
}

pub fn colors() -> List(Color) {
  [Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White]
}
