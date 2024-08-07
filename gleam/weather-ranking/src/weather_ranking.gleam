import gleam/float
import gleam/list
import gleam/order.{type Order}

pub type City {
  City(name: String, temperature: Temperature)
}

pub type Temperature {
  Celsius(Float)
  Fahrenheit(Float)
}

pub fn fahrenheit_to_celsius(f: Float) -> Float {
  { f -. 32.0 } /. 1.8
}

pub fn compare_temperature(left: Temperature, right: Temperature) -> Order {
  case left, right {
    Fahrenheit(f), Celsius(c) ->
      f
      |> fahrenheit_to_celsius
      |> float.compare(c)
    Celsius(c), Fahrenheit(f) ->
      f
      |> fahrenheit_to_celsius
      |> float.compare(c, _)
    Celsius(t1), Celsius(t2) | Fahrenheit(t1), Fahrenheit(t2) ->
      float.compare(t1, t2)
  }
}

pub fn sort_cities_by_temperature(cities: List(City)) -> List(City) {
  cities
  |> list.sort(fn(a, b) { compare_temperature(a.temperature, b.temperature) })
}
