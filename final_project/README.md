Practice-Project

## Filtrar por autor

### Obtener el catálogo completo

<code>
$response = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get
</code>

### Filtrar libros por autor

<code>
$author = "Chinua Achebe"  # Especifica el autor
</code>

### Buscar los libros cuyo autor coincida

<code>
$filteredBooks = @()
</code>

<code>
foreach ($key in $response.PSObject.Properties.Name) {
    $book = $response.$key
    if ($book.author -eq $author) {
        $filteredBooks += $book
    }
}
</code>


### Mostrar los libros filtrados
<code>
$filteredBooks | ConvertTo-Json -Compress
</code>

## Filtrar por título

### Obtén el catálogo completo
$response = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get

# Filtrar libros por título
$title = "Things Fall Apart"  

### Busca los libros cuyo título coincida
$filteredBooks = @()

foreach ($key in $response.PSObject.Properties.Name) {
    $book = $response.$key
    if ($book.title -eq $title) {
        $filteredBooks += $book
    }
}

### Muestra los libros filtrados
$filteredBooks | ConvertTo-Json -Compress

## Obtener los reviews

$response = Invoke-RestMethod -Uri "http://localhost:5000/review/1" -Method Get
$response | ConvertTo-Json -Compress

## Verificar el CRUD para el registro de usuarios

### Datos del usuario a registrar
$userData = @{
    username = "newuser1"
    password = "password1"
}

### Realizar la solicitud POST
$response = Invoke-RestMethod -Uri "http://localhost:5000/register" -Method Post -Body ($userData | ConvertTo-Json) -ContentType "application/json"

### Mostrar la respuesta
$response | ConvertTo-Json -Compress

### Hacer login:

$response = Invoke-RestMethod -Uri "http://localhost:5000/customer/login" -Method Post -Body ($loginData | ConvertTo-Json) -ContentType "application/json"

## Crear reseña

### Datos de la reseña
$reviewData = @{
    review = "This is a great book!"
}

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXIxIiwiaWF0IjoxNzUyMjkzNzQ1LCJleHAiOjE3NTIyOTczNDV9.lHB_SSOjWXSPhsf4lulyfs0jlJbblatFT01HT2_ovfc"

### Asume que ya tienes el token del login anterior
$headers = @{
    Authorization = "Bearer $token"
}

### Realizar la solicitud PUT para añadir/modificar la reseña
$response = Invoke-RestMethod -Uri "http://localhost:5000/customer/auth/review/1" -Method Put -Body ($reviewData | ConvertTo-Json) -ContentType "application/json" -Headers $headers

### Mostrar la respuesta
$response | ConvertTo-Json -Compress