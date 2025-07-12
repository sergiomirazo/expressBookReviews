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

# Obtén el catálogo completo
$response = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get

# Filtrar libros por título
$title = "Things Fall Apart"  

# Busca los libros cuyo título coincida
$filteredBooks = @()

foreach ($key in $response.PSObject.Properties.Name) {
    $book = $response.$key
    if ($book.title -eq $title) {
        $filteredBooks += $book
    }
}

# Muestra los libros filtrados
$filteredBooks | ConvertTo-Json -Compress