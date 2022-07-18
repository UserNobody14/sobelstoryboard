import * as React from 'react';
import {Button} from "reactstrap";

const exampleString = `title: The Magic of Love
credit: written by Benjamin Sobel
author: Benjamin Sobel
format: screenplay
date: 2019-01-21
contact:
    nobody@nobodymail.com
    555-555-5555

#Act 1

EXT. FESTIVAL #1#

[[ 2019-01-25 - Benjamin Sobel: Consider adding him giving to the homeless briefly? To set up his kindness?]]

Open on a scene of a major festival going down the street of a medieval styled town. The crowds swarm the sidewalks while wagons parade down the street.

On some of the wagons there are town soldiers adorned with garlands of flowers.

On other wagons there are the heads of several great beasts.

At the front of the parade is a wagon with the head of a great dragon, With a town soldiers arm still sticking out of its mouth.

There is also a wagon with a banner calling it "the swamp beast"

Amidst all of this a young man is running through the crowd

JAMES
Coming through! Excuse me!

He bumps into someone from behind.

RANDOM PERSON
hey watch where you're goi..

They turn around and see him, and suddenly their eyes grow wide.

RANDOM PERSON (CONT'D)
I'm so sorry your lordship, Please forgive me for being rude!

JAMES
You don't have to apologize! It's my fault anyway. Do you know where my older brother Henry is?

RANDOM PERSON
The great hero? He's in the tavern, right over there!

JAMES
Thanks! I can't thank you enough!

James then heads off running into the bar.

INT. BAR #2#
[[ 2019-01-04 - Benjamin Sobel: Names MC's brother Henry MC James Bug Girl Alice Princess EvelynScrollkeeper? MC's friend Brian]]

HENRY
Gather round, ladies! I'll be telling all the fantastical tales of my exploits!

JAMES
Can I listen too, brother?

HENRY
*Rolls his eyes* Yeah, yeah.

HENRY (CONT'D)
(turning to women)
Now let me tell you all about the many perils and problems I suffered on my journey!

JAMES
Are you gonna tell us about slaying the swamp creature, or the black dragon?

HENRY
No, James. Actually I'm going to tell **these ladies here** about a legendary magical artifact I discovered, deep in the ruins of Karakiz-Dur.

JAMES
The lost city!? But that whole region is missing from maps! How did you find it?!

HENRY
(irked by cockblocking)
It **was** missing, until we made maps of it, like the ones I have in my bag. It's not even that far from here!

He gestures toward his bag. Which has a number of maps in it.

HENRY (CONT'D)
Now. Getting back to my story, do you ladies know about the 'love well'?

JAMES
Really!? The well with the power to make anyone fall in love with you! That's a magic item beyond comparison!

HENRY
(glaring a little at james)
Yes james, now don't interrupt me anymore!

HENRY (CONT'D)
The love well is an incredible power. All you have to do is add drop of your blood and the person you love most, will fall back in love with you.

He points to the map

HENRY (CONT'D)
I discovered it in a cavern hidden beneath the main temple. The power to end all unrequited love!

Henry turns his attention back to the ladies while James is still transfixed by the maps.

HENRY (CONT'D)
Yet, I did not add my blood, and do you ladies know why?

James then gingerly plucks one of the maps out of Henry's bag while he is distracted.

BAR MAID
Why?
`;

interface ExampleButtonProps {
    fText: string;
    uponOutput: (o: string) => void;
}

export const ExampleButton = (props: ExampleButtonProps) => {
    return (
        <div>
            <Button
                onClick={() => props.uponOutput(exampleString)}
            >
                Insert Example
            </Button>
        </div>
    );
};