import gleam/int

pub fn egg_count(number: Int) -> Int {
  egg_count_loop(number, 0)
}

fn egg_count_loop(number: Int, count: Int) -> Int {
  case number == 0 {
    True -> count
    False ->
      egg_count_loop(
        int.bitwise_shift_right(number, 1),
        int.bitwise_and(number, 1) + count,
      )
  }
}
