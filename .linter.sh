#!/bin/bash
cd /home/kavia/workspace/weatherwise-dashboard-weather-dashboard-container-9117-9123/weather_display
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

