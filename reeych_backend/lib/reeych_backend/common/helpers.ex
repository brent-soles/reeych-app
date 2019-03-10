defmodule ReeychBackend.Common.Helpers do
  
  # Wrapping db results in a map
  # helps with readability in the main
  # application queries
  def package_result_query_map(query_result \\ :nil) do
    case query_result do
      :nil ->
        {:error, "Queried on object that does not exist"}
      query_result -> 
        {:ok, query_result}
    end
  end
end