json.array!(@ideas) do |idea|
  concept = idea.concept
  json.idea do
    json.id idea.id
    json.x idea.x
    json.y idea.y
    json.font_size idea.font_size
    json.title concept.title
  end
  json.url idea_url(idea, format: :json)
end
