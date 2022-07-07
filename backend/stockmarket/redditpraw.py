from decouple import config
from django.conf import settings
from backend.stockmarket.models import ScrapingModel
import os
import praw
import pickle

def create_subreddit_instance(reddit,subname):
    return reddit.subreddit(subname)

#set default time limit as "today" to return all posts within the day itself
#set default limit as None so that all posts are returned
def track_stock_mentions_in_past_24_hours(reddit,subname,stock,time_filter="day",limit=None):
    subreddit = create_subreddit_instance(reddit,subname)
    counter = 0
    for post in subreddit.top(time_filter=time_filter,limit=limit):
        title = post.title
        counter += title.count(stock)
        txt = post.selftext
        counter += txt.count(stock)
        post.comments.replace_more(limit=0) #remove all MoreComments objects
        for comment in post.comments.list():
            body = comment.body
            counter += body.count(stock)
    return counter

#set default time limit as "day" to return all posts within the day itself
#set default limit as None so that all posts are returned
def track_mentions_in_past_24_hours(reddit,subname,active_stocks,time_filter="day",limit=None):
    subreddit = create_subreddit_instance(reddit,subname)
    for post in subreddit.top(time_filter=time_filter,limit=limit):
        title = post.title.strip().split()
        for word in title:
            if word in active_stocks:
                active_stocks[word] += 1
        txt = post.selftext.strip().split()
        for word in txt:
            if word in active_stocks:
                active_stocks[word] += 1
        post.comments.replace_more(limit=0) #remove all MoreComments objects
        for comment in post.comments.list():
            body = comment.body.strip().split()
            for word in body:
                if word in active_stocks:
                    active_stocks[word] += 1
    return active_stocks

#function for sorting dictionary of active stocks by number of mentions and returning the top pairs
#set default limit as 10; return top 10 stocks by number of mentions
def sort_by_mentions(stock_mentions,limit=10):
    lst = [(key,value) for key,value in stock_mentions.items() if value > 0]
    lst.sort(key = lambda x: x[1],reverse = True) #sort in descending order
    for i in range(len(lst)-limit):
        lst.pop()
    return {key:value for key,value in lst}

def run_script():
    CLIENT_ID,REDDIT_SECRET_KEY = config("CLIENT_ID"),config("REDDIT_SECRET_KEY")
    #read in preloaded dictionary of active stocks from .pkl file
    file_path = os.path.join(settings.BASE_DIR,'stockmarket','activestocks.pkl')
    with open(file_path,"rb") as f:
        active_stocks = pickle.load(f)
    #create a reddit instance
    reddit = praw.Reddit(client_id=CLIENT_ID, client_secret=REDDIT_SECRET_KEY,user_agent="MyBot")
    #perform the web scraping to keep track of number of mentions
    stock_mentions = track_mentions_in_past_24_hours(reddit,subname="wallstreetbets",active_stocks=active_stocks)
    sorted_stock_mentions = sort_by_mentions(stock_mentions,limit=10)
    results = ScrapingModel(data=sorted_stock_mentions,subreddit="wallstreetbets")
    ScrapingModel.save(results)

if __name__ == "__main__":
    run_script()


  




