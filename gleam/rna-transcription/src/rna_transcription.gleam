import gleam/dict.{type Dict}
import gleam/string

pub fn to_rna(dna: String) -> Result(String, Nil) {
  [#("G", "C"), #("C", "G"), #("T", "A"), #("A", "U")]
  |> dict.from_list
  |> do_to_rna(dna, "")
}

fn do_to_rna(
  complements: Dict(String, String),
  dna: String,
  rna: String,
) -> Result(String, Nil) {
  case string.pop_grapheme(dna) {
    Ok(#(nucleotide, dna_rest)) ->
      case dict.get(complements, nucleotide) {
        Ok(complement) -> do_to_rna(complements, dna_rest, rna <> complement)
        _ -> Error(Nil)
      }
    _ -> Ok(rna)
  }
}
