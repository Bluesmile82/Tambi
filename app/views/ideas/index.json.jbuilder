json.nodes do
  json.array!(@ideas) do |idea|
    json.extract! idea, :id, :x, :y, :font_size
    json.title idea.concept.title
  end
end
json.edges []