#!/bin/bash

# Infinite loop: executes the following commands over and over again without stopping
while true; do
    # Runs the Django command to retrieve the articles and redirects all output (stdout and stderr) to the /app/cron.log file
    python /app/app/manage.py fetch_articles >> /app/cron.log 2>&1
    # Sleep pauses the script for a certain number of seconds, so since 86400 seconds = 24 hours,... 
    # ...the script waits 24 hours before restarting fetch_articles.
    sleep 86400 
# End of while loop.
done
