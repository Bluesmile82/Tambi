require "open-uri"
require "nokogiri"

class ScraperController < ApplicationController

  def get
    url = "#{params.first[0]}=#{params.first[1]}"
    @data = []
    doc = Nokogiri::HTML(open( url ))
    rnd = (1..25).to_a.sample(6)
    pinImg = doc.search('.pinImg')
    rnd.each do |index|
     link = pinImg[index]
     @data << link.attr('src') if link
    end
    @data
  end
end