import gleam/list
import gleam/result
import gleam/set

pub type Tree(a) {
  Nil
  Node(value: a, left: Tree(a), right: Tree(a))
}

pub type Error {
  DifferentLengths
  DifferentItems
  NonUniqueItems
}

type Traversal(a) {
  Traversal(inorder: List(a), preorder: List(a))
}

pub fn tree_from_traversals(
  inorder inorder: List(a),
  preorder preorder: List(a),
) -> Result(Tree(a), Error) {
  Traversal(inorder, preorder)
  |> check_length
  |> result.try(check_items)
  |> result.try(check_unique)
  |> result.map(build_tree)
}

fn build_tree(traversal: Traversal(a)) -> Tree(a) {
  case traversal.preorder {
    [] -> Nil
    [node, ..rest] -> {
      let #(inorder_left, inorder_right) = split(traversal.inorder, node)
      let #(preorder_left, preorder_right) =
        inorder_left |> list.length |> list.split(rest, _)
      Node(
        value: node,
        left: build_tree(Traversal(inorder_left, preorder_left)),
        right: build_tree(Traversal(inorder_right, preorder_right)),
      )
    }
  }
}

fn split(list items: List(a), on target: a) -> #(List(a), List(a)) {
  do_split(items, target, #([], []))
}

fn do_split(
  items: List(a),
  target: a,
  acc: #(List(a), List(a)),
) -> #(List(a), List(a)) {
  case items {
    [] -> acc
    [item, ..rest] ->
      case item == target {
        True -> #(list.reverse(acc.0), rest)
        False -> do_split(rest, target, #([item, ..acc.0], acc.1))
      }
  }
}

fn check_length(traversal: Traversal(a)) -> Result(Traversal(a), Error) {
  case list.length(traversal.inorder) == list.length(traversal.preorder) {
    True -> Ok(traversal)
    False -> Error(DifferentLengths)
  }
}

fn check_items(traversal: Traversal(a)) -> Result(Traversal(a), Error) {
  case set.from_list(traversal.inorder) == set.from_list(traversal.preorder) {
    True -> Ok(traversal)
    False -> Error(DifferentItems)
  }
}

fn check_unique(traversal: Traversal(a)) -> Result(Traversal(a), Error) {
  let inorder_len = list.length(traversal.inorder)
  let inorder_size = traversal.inorder |> set.from_list |> set.size
  case inorder_size == inorder_len {
    True -> Ok(traversal)
    False -> Error(NonUniqueItems)
  }
}
