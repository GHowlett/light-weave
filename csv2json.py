import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

fieldnames = ("Verses", "Theme", "Emotion", "Images", "Genre", "Character", "Location", "Gender", "Question about God's Presence", "Answers")

reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
	json.dump(row, jsonfile)
	jsonfile.write('\n')


