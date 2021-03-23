
# milid analytics php sqlite version

implements a route to add a Milid event object to an sqlite database.
expects a json encoded object of format: 
```
{
	"uid": "2bdaf3e1-39653661",
	"username": "marcus",
	"module": 1,
	"lesson":1,
	"state": 0
}
```

## install it

- copy **empty.sqlite** and rename it **db.sqlite** 
- copy all php files to *./dist* folder
- use deploy script from **milid-frontent**

## todo

## curl test
- curl -v -H "Content-Type: application/json" --data @test.json http://site-address/api/event
- curl -v -H "Content-Type: application/json" -H "Authorization: Bearer abcd"  http://localhost:4000/api/event/2bdaf3e1-39653661

## run php locally
- php -S localhost:port


## stats route

- curl localhost:4000/api/stats

returns a json object with 5 keys:

- **total_users** -> total of unique visitors (users that have completed the landing page)
- **completed_lessons_m1** total of completed lessons for the module 1 (divide by total users and then divide by lessons per module to obtain ration)
