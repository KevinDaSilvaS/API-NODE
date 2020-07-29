# API-NODE
node js api created based on the rocketseat playlist

<H2>To run the project</H2>
<p> - run the commands at the terminal</p>

```
 npm install
 node src/index
```

<H2>Routes</H2>
<p> - theres a json file containing all the routes to use and test the project on insomnia</p>
<a target="_blank" href"https://insomnia.rest/download/"> link to download insomnia</a>
<a target="_blank" href"https://insomnia.rest/download/"> link of jsob file</a>
 
* <H3>Auth</H3>
 	<hr>
	<b><p> to register a new user:(POST)</p></b>

	```
	//http://localhost:7314/auth/register
	{ 
		"name": "r",
		"email": "test-ipo@Su.com.br",
		"password": "Kevin123"
	}
	```
	<hr>
	<b><p> authenticate:(POST)</p></b>

	```
	//http://localhost:7314/auth/authenticate
	{
		"email": "otg-da@silva.com",
		"password": "kevinnewpassword"
	}
	```
	<hr>
	<b>
	<p> forgot password:(POST)</p></b>

	```
	//http://localhost:7314/auth/forgot_password
	{
		"email": "otg-da@silva.com"
	}
	```
	<hr>
	<b>
	<p> reset password:(PATCH)</p></b>

	```
	//http://localhost:7314/auth/reset_password
	{
		"email": "otg-da@silva.com",
		"token": "1d87b5727e2523a0931eee96056721f753063c74",
		"password": "kevinnewpassword"
	}
	```
