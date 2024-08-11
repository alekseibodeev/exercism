import gleam/list
import gleam/string

pub fn slices(input: String, size: Int) -> Result(List(String), Error) {
  case size {
    0 -> Error(SliceLengthZero)
    _ if size < 0 -> Error(SliceLengthNegative)
    _ ->
      case string.to_graphemes(input) {
        [] -> Error(EmptySeries)
        digits ->
          case list.window(digits, size) {
            [] -> Error(SliceLengthTooLarge)
            series -> Ok(list.map(series, fn(item) { string.join(item, "") }))
          }
      }
  }
}

pub type Error {
  SliceLengthTooLarge
  SliceLengthZero
  SliceLengthNegative
  EmptySeries
}
