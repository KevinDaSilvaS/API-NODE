# API-NODE
node js api created based on the rocketseat playlist

<H2>To run the project</H2>
<p> - run the commands at the terminal</p>

```
 npm install
 node src/index
```

<H2>Routes</H2>
<p> - theres a json file containing all the routes to use ans test the project on insomnia</p>
<a target="_blank">https://insomnia.rest/download/<a>
 
* <H3>Auth</H3>
 	__<p> to register a new user:(POST)</p>__

	```
	//http://localhost:7314/auth/register
	{ 
		"name": "r",
		"email": "test-ipo@Su.com.br",
		"password": "Kevin123"
	}
	```

	<p> authenticate:(POST)</p>

	```
	//http://localhost:7314/auth/authenticate
	{
		"email": "otg-da@silva.com",
		"password": "kevinnewpassword"
	}
	```

	<p> forgot password:(POST)</p>

	```
	//http://localhost:7314/auth/forgot_password
	{
		"email": "otg-da@silva.com"
	}
	```

	<p> reset password:(PATCH)</p>

	```
	//http://localhost:7314/auth/reset_password
	{
		"email": "otg-da@silva.com",
		"token": "1d87b5727e2523a0931eee96056721f753063c74",
		"password": "kevinnewpassword"
	}
	```
