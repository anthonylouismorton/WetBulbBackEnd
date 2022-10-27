# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WeatherItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    barometer = scrapy.Field()
    windspeed = scrapy.Field()
    humidity = scrapy.Field()
    temperature = scrapy.Field()

    pass
