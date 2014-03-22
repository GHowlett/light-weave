import csv
import json
from sys import argv

csvfile = open(argv[1], 'r')
jsonfile = open(argv[2], 'w')

fieldnames = ("Verses", "Theme", "Emotion", "Images", "Genre", "Character", "Location", "Gender", "Question about God's Presence", "Answers")

reader = csv.DictReader( csvfile, fieldnames)
firstline = True
for row in reader:
	if firstline:
		firstline = False
		continue
	json.dump(row, jsonfile)
	jsonfile.write('\n')


