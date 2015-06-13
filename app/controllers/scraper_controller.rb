require "open-uri"
require "nokogiri"

class ScraperController < ApplicationController

  def get
    url = "#{params.first[0]}=#{params.first[1]}"
    @data = []
    doc = Nokogiri::HTML(open( url ))
    pinterest( doc ) if params.first[0].include?('pinterest')
    youtube( doc ) if params.first[0].include?('youtube')
  end

  def pinterest( doc )
    rnd = (1..25).to_a.sample(6)
    pinImg = doc.search('.pinImg')
    rnd.each do |index|
      link = pinImg[index]
      @data << link.attr('src') if link
    end
    return {data: @data}
  end

  def youtube( doc )
    @data = []
    rnd = (1..20).to_a.sample(6)
    youtubeId = doc.search('.yt-lockup-video')
    rnd.each do |index|
      link = youtubeId[index]
      data = 'http://www.youtube.com/v/watch?v=' + link.attr('data-context-item-id') if link
      title = link.search('.yt-uix-tile-link').text if link
      @data << {data: data, title: title}
    end

    return @data
  end
end