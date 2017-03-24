-- delete test users
DELETE FROM auth."user"
WHERE id = 123;

DELETE FROM auth."user"
WHERE id = 456;

DELETE FROM auth."user"
WHERE id = 789;

DELETE FROM auth."user"
WHERE id = 159;

DELETE FROM auth."user"
WHERE email_address = 'new-user@example.com';

DELETE FROM public."dive_site"
WHERE location = 'Twiske Paviljoen';

DELETE FROM public."dive";
