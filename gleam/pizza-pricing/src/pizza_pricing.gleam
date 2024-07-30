pub type Pizza {
  Margherita
  Caprese
  Formaggio
  ExtraSauce(Pizza)
  ExtraToppings(Pizza)
}

pub fn pizza_price(pizza: Pizza) -> Int {
  pizza_price_loop(pizza, 0)
}

fn pizza_price_loop(pizza: Pizza, price: Int) -> Int {
  case pizza {
    Margherita -> price + 7
    Caprese -> price + 9
    Formaggio -> price + 10
    ExtraSauce(p) -> pizza_price_loop(p, price + 1)
    ExtraToppings(p) -> pizza_price_loop(p, price + 2)
  }
}

pub fn order_price(order: List(Pizza)) -> Int {
  case order {
    [_, _] -> order_price_loop(order, 2)
    [_] -> order_price_loop(order, 3)
    _ -> order_price_loop(order, 0)
  }
}

fn order_price_loop(order: List(Pizza), price: Int) -> Int {
  case order {
    [pizza, ..rest] -> order_price_loop(rest, price + pizza_price(pizza))
    [] -> price
  }
}
