import gleam/int
import gleam/list
import gleam/order.{Gt, Lt}
import gleam/result

const single_book_price = 800.0

pub fn lowest_price(books: List(Int)) -> Float {
  books
  |> list.unique
  |> list.map(fn(item) { list.count(books, fn(book) { item == book }) })
  |> list.sort(fn(a, b) {
    case a >= b {
      True -> Lt
      False -> Gt
    }
  })
  |> backtrack(0.0)
}

fn backtrack(counts: List(Int), price: Float) -> Float {
  case list.length(counts) {
    0 -> price
    _ -> {
      counts
      |> list.index_map(fn(_, i) {
        let books_count = i + 1
        let next_price =
          price
          +. int.to_float(books_count)
          *. single_book_price
          *. { 1.0 -. get_discount(books_count) }

        counts
        |> list.index_map(fn(item, j) {
          case j <= i {
            True -> item - 1
            False -> item
          }
        })
        |> list.filter(fn(item) { item > 0 })
        |> backtrack(next_price)
      })
      |> list.reduce(fn(prev, curr) {
        case prev >. curr {
          True -> curr
          False -> prev
        }
      })
      |> result.unwrap(0.0)
    }
  }
}

fn get_discount(books_count: Int) -> Float {
  case books_count {
    5 -> 0.25
    4 -> 0.2
    3 -> 0.1
    2 -> 0.05
    _ -> 0.0
  }
}
