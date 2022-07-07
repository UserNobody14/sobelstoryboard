from __future__ import print_function
import json



def lambda_handler(event, context):
    for record in event['Records']:
        payload = record["body"]
        json_values = json.loads(payload)
        print(str(json_values["text"]))
