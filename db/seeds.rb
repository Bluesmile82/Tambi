# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create([{ username: 'Alvaro',
              email:'alvaro@tambi.com',
              password:'tambi',
              bio:"I am the lead coder of Tambi. Let's think together"
              },
              {username: 'Maria',
              email:'maria@tambi.com',
              password:'thinktambi',
              bio:"I am Maria from Tambi. Let's think together"
              }

              ])
