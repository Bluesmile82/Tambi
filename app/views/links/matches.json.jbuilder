json.array!(@links_b) do |link|
  json.title link.idea_b.concept.title
  json.user link.idea_b.graph.user.username
  json.id link.idea_b.id
end
json.array!(@links_a) do |link|
  json.title link.idea_a.concept.title
  json.user link.idea_a.graph.user.username
  json.id link.idea_a.id
end