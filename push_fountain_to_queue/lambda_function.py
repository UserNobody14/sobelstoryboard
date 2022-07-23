import json
import boto3
from process_fountain import yield_elems_from_string
from parse_fountain import ElemTypes
import uuid


def lambda_handler(event, context):
    inbody = event['body']
    json_elems = []

    # now = datetime.now()
    # current_time = now.strftime("%H:%M:%S %p")
    unique_number = '{}'.format(uuid.uuid4())

    sqs = boto3.client('sqs')
    count = 0
    last_scene = 0
    for elem_item in yield_elems_from_string(inbody):
        map_data = elem_item.get_map_out()
        new_map_data = {
            'text': map_data['text'],
            'number_of_items': 1,
            'unique_number': unique_number,
            'scene_number': map_data['scene'],
            'line_number': count
        }
        sqs.send_message(
            QueueUrl="https://sqs.us-west-2.amazonaws.com/455807151942/fountain_gpu",
            MessageBody=json.dumps(new_map_data)
        )
        count = count + 1
        last_scene = map_data['scene']
    return_value = {
        'number_of_lines': count,
        'last_scene': last_scene,
        'unique_number': unique_number
    }
    return {
        'statusCode': 200,
        'body': json.dumps(return_value)
    }