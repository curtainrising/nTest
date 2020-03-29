```
docker build -t nTestImage .
docker run --rm -p 8080:8080 --name nTestContainer nTestImage
```
