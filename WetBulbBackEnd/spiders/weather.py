import scrapy
from WetBulbBackEnd.items import WeatherItem


class WeatherSpider(scrapy.Spider):
    name = 'weather'
    start_urls = [
        'https://forecast.weather.gov/MapClick.php?lat=36.2424&lon=-115.042']

    def parse(self, response):
        item = WeatherItem()
        item['temperature'] = response.css(
            'p.myforecast-current-lrg::text').get()
        weatherRows = response.css('tr')
        for row in weatherRows:
            title = row.css('b::text').get()
            if title == 'Humidity':
                item['humidity'] = row.css('td::text').get()
            if title == 'Wind Speed':
                item['windspeed'] = row.css('td::text').get()
            if title == 'Barometer':
                item['barometer'] = row.css('td::text').get()
        yield item
