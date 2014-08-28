#!/bin/bash

if [[ "$7" == 0 ]]; then
  rsync -avz "$1" sean@10.8.0.200:/storage/temp/

  DIR=$(basename $1)
  ssh sean@10.8.0.200 "python /usr/local/sickbeard/autoProcessTV/sabToSickBeard.py '/storage/temp/$DIR' '$2' '$3' '$4' '$5'"
fi
