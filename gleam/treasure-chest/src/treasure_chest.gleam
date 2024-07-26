pub type TreasureChest(t) {
  TreasureChest(String, t)
}

pub type UnlockResult(t) {
  Unlocked(t)
  WrongPassword
}

pub fn get_treasure(
  chest: TreasureChest(treasure),
  password: String,
) -> UnlockResult(treasure) {
  case chest {
    TreasureChest(p, t) if p == password -> Unlocked(t)
    _ -> WrongPassword
  }
}
