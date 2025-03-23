1.Customer Signin / signup API (sign up by email)

curl --location 'https://movilist-silk.vercel.app/api/customer/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"satya1@malinator.com"
}'



2.customer email verification (By OTP) API

curl --location 'https://movilist-silk.vercel.app/api/customer/verification' \
--header 'Content-Type: application/json' \
--data '{
    "customer_id":"67e02ae968071bb11f71cf1f",
    "otp":2727
}'


3.Get Customer data API

curl --location --request GET 'https://movilist-silk.vercel.app/api/customer' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data '{
    "customer_id":"67ded28078da4754f39740b2",
    "otp":5652
}'


4.Admin Login API - login by email and password

curl --location 'https://movilist-silk.vercel.app/api/admin/admin-login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"satya@mailinator.com",
    "password":"Satya@123"
}'


5.Admin create admin user API

curl --location 'https://movilist-silk.vercel.app/api/admin/admin-user' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"satya@mailinator.com",
    "phone":7978402176,
    "password":"Satya@123"
}'



6.Admin update Admin user data API

curl --location --request PUT 'https://movilist-silk.vercel.app/api/admin/admin-user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId":"67def3c8d3e81c03ecc1fd1e",
    "email":"satya@mailinator.com",
    "phone":7978402176,
    "password":"Satya@123"
}'



7. Admin Add Movie API

curl --location 'localhost:3000/api/movie' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--form 'data="{
  \"title\": \"Baahubali: The Beginning\",
  \"industry\":\"Bollywod\",
  \"description\": \"In the kingdom of Mahishmati, Shivudu grows up to become a strong and courageous young man. He sets out on a journey to discover his true identity and fulfill his destiny.\",
  \"tagline\": \"Why did Kattappa kill Baahubali?\",
  \"releaseDate\": \"2015-07-10\",
  \"runtime\": 159,
  \"genre\": [\"Action\", \"Adventure\", \"Drama\"],
  \"language\": \"Telugu\",
  \"certification\": \"U/A\",
  \"director\": [\"S.S. Rajamouli\"],
  \"writers\": [\"S.S. Rajamouli\", \"Vijayendra Prasad\"],
  \"cast\": [
    { \"name\": \"Prabhas\", \"role\": \"Shivudu / Mahendra Baahubali\" },
    { \"name\": \"Rana Daggubati\", \"role\": \"Bhallaladeva\" },
    { \"name\": \"Anushka Shetty\", \"role\": \"Devasena\" },
    { \"name\": \"Tamannaah\", \"role\": \"Avanthika\" },
    { \"name\": \"Ramya Krishnan\", \"role\": \"Sivagami\" }
  ],
  \"budget\": 120000000,
  \"productionCompanies\": [\"Arka Media Works\"],
  \"status\": \"Active\"
}"' \
--form 'poster=@"/C:/Users/sahoo/Downloads/Baahubali-s-international-poster-released-1453880984-152.jpg"'



8.Get Movie List API(include pagination filter search functionality)

curl --location --request GET 'https://movilist-silk.vercel.app/api/movie/movie-list?movie_id=67dfd8df9179a37015b8b999&search=Dangal&page=1&per_page=10&status=Active' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--form 'data="{
  \"title\": \"Baahubali: The Beginning\",
  \"industry\":\"Bollywod\",
  \"description\": \"In the kingdom of Mahishmati, Shivudu grows up to become a strong and courageous young man. He sets out on a journey to discover his true identity and fulfill his destiny.\",
  \"tagline\": \"Why did Kattappa kill Baahubali?\",
  \"releaseDate\": \"2015-07-10\",
  \"runtime\": 159,
  \"genre\": [\"Action\", \"Adventure\", \"Drama\"],
  \"language\": \"Telugu\",
  \"certification\": \"U/A\",
  \"director\": [\"S.S. Rajamouli\"],
  \"writers\": [\"S.S. Rajamouli\", \"Vijayendra Prasad\"],
  \"cast\": [
    { \"name\": \"Prabhas\", \"role\": \"Shivudu / Mahendra Baahubali\" },
    { \"name\": \"Rana Daggubati\", \"role\": \"Bhallaladeva\" },
    { \"name\": \"Anushka Shetty\", \"role\": \"Devasena\" },
    { \"name\": \"Tamannaah\", \"role\": \"Avanthika\" },
    { \"name\": \"Ramya Krishnan\", \"role\": \"Sivagami\" }
  ],
  \"budget\": 120000000,
  \"productionCompanies\": [\"Arka Media Works\"],
  \"status\": \"Active\"
}"' \
--form 'poster=@"/C:/Users/sahoo/Downloads/Baahubali-s-international-poster-released-1453880984-152.jpg"'






9.Admin update movie data API

curl --location --request PUT 'https://movilist-silk.vercel.app/api/movie' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--form 'data="{
    \"movie_id\": \"67dfd8df9179a37015b8b999\",
    \"title\": \"Dangal\",
    \"industry\":\"Bollywod\",
    \"description\": \"Former wrestler Mahavir Singh Phogat trains his daughters Geeta and Babita to become world-class wrestlers.\",
    \"tagline\": \"The fight for gold is a fight for pride.\",
    \"releaseDate\": \"2016-12-21\",
    \"runtime\": 161,
    \"genre\": [
        \"Biography\",
        \"Drama\",
        \"Sport\"
    ],
    \"language\": \"Hindi\",
    \"certification\": \"U/A\",
    \"director\": [
        \"Nitesh Tiwari\"
    ],
    \"writers\": [
        \"Nitesh Tiwari\",
        \"Piyush Gupta\",
        \"Shreyas Jain\",
        \"Nikhil Meharotra\"
    ],
    \"cast\": [
        {
            \"name\": \"Aamir Khan\",
            \"role\": \"Mahavir Singh Phogat\"
        },
        {
            \"name\": \"Sakshi Tanwar\",
            \"role\": \"Daya Kaur\"
        },
        {
            \"name\": \"Fatima Sana Shaikh\",
            \"role\": \"Geeta Phogat\"
        },
        {
            \"name\": \"Sanya Malhotra\",
            \"role\": \"Babita Kumari\"
        }
    ],
    \"budget\": 70000000,
    \"productionCompanies\": [
        \"Aamir Khan Productions\",
        \"UTV Motion Pictures\"
    ],
    \"status\": \"Active\"
}"' \
--form 'poster=@"/C:/Users/sahoo/Downloads/images (1).jpeg"'







10.customer add movie review API

curl --location 'https://movilist-silk.vercel.app/api/movie/review' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data '{
    "movie_id":"67dfdf9f9179a37015b8b9e2",
    "rating":4,
    "review":"Great movie"
}'


11.Customer Update movie review
curl --location --request PUT 'https://movilist-silk.vercel.app/api/movie/review' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data '{
    "review_id": "67e022e0de3dfe8a881c36c9",
    "movie_id": "67dfdf9f9179a37015b8b9e2",
    "rating": 3,
    "review": "Great movie.."
}'



12.Customer delete movie review API

curl --location --request PUT 'https://movilist-silk.vercel.app/api/movie/review' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data '{
    "action":"delete",
    "review_id": "67e0294cde3dfe8a881c3740",
    "movie_id": "67dfdf9f9179a37015b8b9e2",
    "rating": 3,
    "review": "Great movie.."
}'


13.Get Movie's review list API

curl --location --request GET 'https://movilist-silk.vercel.app/api/movie/review-list?movie_id=67dfdf9f9179a37015b8b9e2&page=1&per_page=10' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--form 'data="{
  \"title\": \"Baahubali: The Beginning\",
  \"industry\":\"Bollywod\",
  \"description\": \"In the kingdom of Mahishmati, Shivudu grows up to become a strong and courageous young man. He sets out on a journey to discover his true identity and fulfill his destiny.\",
  \"tagline\": \"Why did Kattappa kill Baahubali?\",
  \"releaseDate\": \"2015-07-10\",
  \"runtime\": 159,
  \"genre\": [\"Action\", \"Adventure\", \"Drama\"],
  \"language\": \"Telugu\",
  \"certification\": \"U/A\",
  \"director\": [\"S.S. Rajamouli\"],
  \"writers\": [\"S.S. Rajamouli\", \"Vijayendra Prasad\"],
  \"cast\": [
    { \"name\": \"Prabhas\", \"role\": \"Shivudu / Mahendra Baahubali\" },
    { \"name\": \"Rana Daggubati\", \"role\": \"Bhallaladeva\" },
    { \"name\": \"Anushka Shetty\", \"role\": \"Devasena\" },
    { \"name\": \"Tamannaah\", \"role\": \"Avanthika\" },
    { \"name\": \"Ramya Krishnan\", \"role\": \"Sivagami\" }
  ],
  \"budget\": 120000000,
  \"productionCompanies\": [\"Arka Media Works\"],
  \"status\": \"Active\"
}"' \
--form 'poster=@"/C:/Users/sahoo/Downloads/Baahubali-s-international-poster-released-1453880984-152.jpg"'



14. customer Add like on a review API

curl --location --request PUT 'https://movilist-silk.vercel.app/api/movie/custemr-like-review' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data '{
    "action":"add_like",
    "review_id": "67e029ba68071bb11f71cf05"
}'






15.Customer remove like on his given like

curl --location --request PUT 'https://movilist-silk.vercel.app/api/movie/custemr-like-review' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjdlMDJhZTk2ODA3MWJiMTFmNzFjZjFmIiwic2VjcmV0X2tleSI6IjA4NWNmY2QyYTFlNTg2NThhYzE3MTNiMzI5YWU2YjJkIiwiaWF0IjoxNzQyNzQ0MzI3LCJleHAiOjE3NDM2MDgzMjd9.ZHuWgvU5sezYo5G4PG6RzmEtUpM-kZ1iiQ5hTlUfSmM' \
--header 'Content-Type: application/json' \
--data '{
    "action":"remove_like",
    "review_id": "67e029ba68071bb11f71cf05"
}'