import gleam/float

pub fn score(x: Float, y: Float) -> Int {
  case hypot(x, y) {
    h if h >. 10.0 -> 0
    h if h >. 5.0 -> 1
    h if h >. 1.0 -> 5
    h if h >=. 0.0 -> 10
    _ -> panic
  }
}

fn hypot(x: Float, y: Float) -> Float {
  let sq_x = case float.power(x, 2.0) {
    Ok(x) -> x
    Error(_) -> panic
  }
  let sq_y = case float.power(y, 2.0) {
    Ok(y) -> y
    Error(_) -> panic
  }
  case float.square_root(sq_x +. sq_y) {
    Ok(h) -> h
    Error(_) -> panic
  }
}
