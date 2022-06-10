
from parse_fountain import ElemTypes, Fountain, FountainElement

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


def process_elems(elems):
    for idx, elem in enumerate(elems):
        if (len(elems) - idx > 1):
            startoff_elem: FountainElement = elem
            stype = startoff_elem.element_type
            if (stype == ElemTypes.Character):
                # get the character's dialog
                next_item: FountainElement = elems[idx + 1]
                if (next_item.element_type == ElemTypes.Dialogue):
                    yield ProcessedLine(startoff_elem, next_item)
            elif (stype == ElemTypes.Action):
                yield ProcessedAction(startoff_elem)


def process_example(inpath):
    inpath = Fountain(None, inpath)
    elems = inpath.elements
    for itemi in process_elems(elems):
        print(itemi)



process_example(example_fountain)