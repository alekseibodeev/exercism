import gleam/list

pub type Tree {
  Nil
  Node(data: Int, left: Tree, right: Tree)
}

pub fn to_tree(data: List(Int)) -> Tree {
  let dummy =
    list.fold(data, Node(0, Nil, Nil), fn(acc, item) { insert(item, acc) })
  case dummy {
    Node(_, _, tree) -> tree
    Nil -> Nil
  }
}

fn insert(data: Int, tree: Tree) -> Tree {
  case tree {
    Node(node_data, node_left, node_right) ->
      case data > node_data {
        True ->
          case node_right {
            Nil -> Node(node_data, node_left, Node(data, Nil, Nil))
            _ -> Node(node_data, node_left, insert(data, node_right))
          }
        False ->
          case node_left {
            Nil -> Node(node_data, Node(data, Nil, Nil), node_right)
            _ -> Node(node_data, insert(data, node_left), node_right)
          }
      }
    Nil -> Nil
  }
}

pub fn sorted_data(data: List(Int)) -> List(Int) {
  to_tree(data)
  |> to_sorted_list
}

fn to_sorted_list(tree: Tree) -> List(Int) {
  case tree {
    Nil -> []
    Node(node_data, node_left, node_right) ->
      list.concat([
        to_sorted_list(node_left),
        [node_data],
        to_sorted_list(node_right),
      ])
  }
}
