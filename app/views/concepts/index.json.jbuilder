json.array!(@concepts) do |concept|
  json.extract! concept, :id, :content
  json.url concept_url(concept, format: :json)
end
