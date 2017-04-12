-- delete test users
DELETE FROM auth."user"
WHERE id IN(123, 456, 789, 159, 357);

DELETE FROM auth."user"
WHERE email_address = 'new-user@example.com';

DELETE FROM public."dive_site"
WHERE id IN(1, 2, 3);

DELETE FROM public."dive_site"
WHERE location = 'Twiske Paviljoen';

DELETE FROM public."dive";
