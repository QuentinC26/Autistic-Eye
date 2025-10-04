#!/bin/sh

# Step 1: Host and port to test
host="$1"
port="$2"

# remove the first 3 arguments
shift 3

# Step 2: As long as the database is not accessible, we wait
until nc -z "$host" "$port"; do
  echo "Waiting for database to $host:$port..."
  sleep 1
done

# Step 3: When it's good, we display a message
echo "Database ready !"

# Step 4: Execute the command placed after the --
exec "$@"
