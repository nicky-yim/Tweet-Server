# Tweet Server

A Node.JS server that serves Tweet JSON data
 
# HTTP Requests:
GET '/': Serve and send the 'index.html'. 

GET '/tweets': Return the contents of all tweets as JSON format.

GET '/users': Return a list of users' screen name as JSON format.

GET '/external_urls': Return a list of external urls in the tweet contents as JSON format.

GET '/tweet/#id#': Return the details of a tweet such as create time, user full name and user's screen name, as JSON format where #id# is the user id.

GET '/user/#screen_name#': Return the information of a user such as user id, user full name, user's location and user's description, as JSON format, where #screen_name# is the user's screen_name. 

