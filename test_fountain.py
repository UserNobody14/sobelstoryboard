# from pprint import pprint
#
# from lambda_function import lambda_handler

from parse_fountain import ElemTypes, Fountain, FountainElement
from process_fountain import process_elems, yield_elems_from_string

example_fountain = "/home/benjamin/CodeProjects/Python Stuff/fountain_to_dalle/examples/short_example.fountain"


class ProcessedAction:
    def __init__(
            self,
            input_action: FountainElement
    ):
        self.element_type = input_action.element_type
        self.element_text = input_action.element_text
        self.section_depth = input_action.section_depth
        self.scene_number = input_action.scene_number
        self.scene_abbreviation = input_action.scene_abbreviation
        self.is_centered = input_action.is_centered
        self.is_dual_dialogue = input_action.is_dual_dialogue
        self.original_line = input_action.original_line
        self.original_content = input_action.original_content

    def __repr__(self):
        return '{}'.format(self.element_type) + ': ' + self.element_text


class ProcessedLine:
    def __init__(
            self,
            input_speaker: FountainElement,
            input_line: FountainElement,
    ):
        self.element_type = ElemTypes.Dialogue
        self.speaker = input_speaker.element_text
        self.element_text = input_line.element_text

        self.input_speaker = input_speaker
        self.input_line = input_line
        # self.section_depth = section_depth
        # self.scene_number = scene_number
        # self.scene_abbreviation = scene_abbreviation
        # self.is_centered = is_centered
        # self.is_dual_dialogue = is_dual_dialogue
        # self.original_line = original_line
        # self.original_content = original_content

    def __repr__(self):
        return '{} says "{}"'.format(self.speaker, self.element_text)


def process_example(inpath):
    inpath = Fountain(None, inpath)
    elems = inpath.elements
    for itemi in process_elems(elems):
        print(itemi)
        print(itemi.scene_number)

def process_example2(inpath):
    inpath = Fountain(None, inpath)
    elems = inpath.elements
    for itemi in yield_elems_from_string(elems):
        print(itemi)
        print(itemi.scene_number)

lbody = "EXT. FESTIVAL #1#\r\n\r\n[[ 2019-01-25 - Benjamin Sobel: Consider adding him giving to the homeless briefly? To set up his kindness?]]\r\n\r\nOpen on a scene of a major festival going down the street of a medieval styled town. The crowds swarm the sidewalks while wagons parade down the street.\r\n\r\nOn some of the wagons there are town soldiers adorned with garlands of flowers.\r\n\r\nOn other wagons there are the heads of several great beasts.\r\n\r\nAt the front of the parade is a wagon with the head of a great dragon, With a town soldiers arm still sticking out of its mouth.\r\n\r\nThere is also a wagon with a banner calling it \"the swamp beast\"\r\n\r\nAmidst all of this a young man is running through the crowd\r\n\r\nJAMES\r\nComing through! Excuse me!"

# retv = lambda_handler({'body': lbody}, None)
# pprint(retv)
process_example('./examples/short_example.fountain')
