import json
import requests
from process_fountain import yield_elems_from_string
from parse_fountain import ElemTypes


def image_to_file(generatedImagesFormat, imgData):
    imgSrc = 'data:image/{};base64,{}'.format(generatedImagesFormat, imgData)


def lambda_handler(event, context):
    inbody = event['body']
    json_elems = []

    for elem_item in yield_elems_from_string(inbody):
        map_data = elem_item.get_map_out()
        new_map_data = {
            'text': map_data['text'],
            'num_images': 2,
        }
        response = requests.post('http://52.37.147.149:8080/dalle', data=json.dumps(new_map_data))
        img_map = response.json()
        # img_map = { 'generatedImgs': response.text}
        map_data['images'] = img_map['generatedImgs']
        json_elems.append(map_data)

    return {
        'statusCode': 200,
        'body': json_elems
    }
