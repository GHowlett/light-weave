import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

fieldnames = ("Verses", "Theme", "Emotion", "Images", "Genre", "Character", "Location", "Gender", "Question about God's Presence", "Answers")

reader = csv.DictReader( csvfile, fieldnames)
firstline = True
for row in reader:
	if firstline:
		firstline = False
		continue
	json.dump(row, jsonfile)
	jsonfile.write('\n')


