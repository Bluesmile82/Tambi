json.nodes do
  json.array!(@ideas) do |idea|
    json.extract! idea, :id, :x, :y, :font_size, :concept_type, :parent_id, :description
    json.title idea.concept.title
  end
end
json.edges do
  json.array!(@links) do |link|
    json.id link.id
    json.source link.idea_a_id
    json.target link.idea_b_id
    end
end

json.other_user @other_user