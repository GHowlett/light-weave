import csv
import json
from sys import argv

csvfile = open(argv[1], 'r')
jsonfile = open(argv[2], 'w')

if (argv[1] == "data/pres_of_god.csv"):
	fieldnames = ("Verses", "Theme", "Emotion", "Images", "Genre", "Character", "Location", "Gender", "Question about God's Presence", "Answers")

if (argv[1] == "data/topical_list.csv"):
	fieldnames = ("Topic", "OSIS", "Quality Score")

reader = csv.DictReader( csvfile, fieldnames)
firstline = True
for row in reader:
	if firstline:
		firstline = False
		continue
	json.dump(row, jsonfile)
	jsonfile.write('\n')


