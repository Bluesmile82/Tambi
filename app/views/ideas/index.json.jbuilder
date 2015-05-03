json.array!(@ideas) do |idea|
  json.extract! idea, :id, :x, :y, :font_size
  json.url idea_url(idea, format: :json)
end
