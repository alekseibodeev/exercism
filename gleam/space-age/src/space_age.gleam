pub type Planet {
  Mercury
  Venus
  Earth
  Mars
  Jupiter
  Saturn
  Uranus
  Neptune
}

const seconds_in_earth_year = 31_557_600.0

pub fn age(planet: Planet, seconds: Float) -> Float {
  let years = seconds /. seconds_in_earth_year
  let period = case planet {
    Mercury -> 0.2408467
    Venus -> 0.61519726
    Earth -> 1.0
    Mars -> 1.8808158
    Jupiter -> 11.862615
    Saturn -> 29.447498
    Uranus -> 84.016846
    Neptune -> 164.79132
  }
  years /. period
}
