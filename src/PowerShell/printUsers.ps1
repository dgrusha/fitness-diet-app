# Set database connection parameters
$serverName = "(localdb)\MSSQLLocalDB"
$databaseName = "fitnessapp_local"
$connectionString = "Server=$serverName;Database=$databaseName;Integrated Security=True;Trusted_Connection=True;"

# SQL query to select all records from the 'users' table
$query = "SELECT * FROM [users]"

# Create a new SQL connection
$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString

# Open the connection
$connection.Open()

# Create a SQL command
$command = $connection.CreateCommand()
$command.CommandText = $query

# Execute the query and load results into a DataTable
$dataTable = New-Object System.Data.DataTable
$dataAdapter = New-Object System.Data.SqlClient.SqlDataAdapter $command
$dataAdapter.Fill($dataTable) | Out-Null

# Close the SQL connection
$connection.Close()

# Display the results
$dataTable | Format-Table -AutoSize