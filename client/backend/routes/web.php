<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

function loginAsAdmin($flags = []) {
	$admin = new \RocketChat\User('admin', 'supersecret');

	$admin->login();

	if (in_array('FETCH_INFO', $flags)) {
		$admin->info();
		
		echo "I'm {$admin->nickname} ({$admin->id}) \n";
	}
}
$router->get('/login-as-admin', function () {
	return loginAsAdmin(['FETCH_INFO']);
});

function createNewUser() {
	loginAsAdmin();

	$newuser = new \RocketChat\User('new_user_name2', 'new_user_password', [
		'nickname' => 'New user nickname',
		'email' => 'newuser2@example.org',
	]);

	try {
		// Do nothing if user already exists
		if ($newuser->login(false)) {
			return;
		}
	}
	catch (\Exception $e) {
		// echo $e->getMessage();
	}

	$newuser->create();
	$newuser->info();

	echo "user {$newuser->nickname} created ({$newuser->id})\n";
}
$router->get('/create-new-user', function () {
	return createNewUser();
});

