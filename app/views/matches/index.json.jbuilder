json.array!(@matches_b) do |match|
  json.title match.concept_b.title
  json.user match.user.email
end
json.array!(@matches_a) do |match|
  json.title match.concept_a.title
  json.user match.user.email
end