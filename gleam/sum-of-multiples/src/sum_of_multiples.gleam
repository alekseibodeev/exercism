import gleam/int
import gleam/list

pub fn sum(factors factors: List(Int), limit limit: Int) -> Int {
  factors
  |> list.flat_map(fn(base) { multiples(base, base, limit, []) })
  |> list.unique
  |> list.fold(0, int.add)
}

fn multiples(base: Int, factor: Int, limit: Int, store: List(Int)) -> List(Int) {
  case factor {
    0 -> []
    _ if factor < limit ->
      multiples(base, factor + base, limit, [factor, ..store])
    _ -> store
  }
}
