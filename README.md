# Cooking+ Prototype

A demo of a cooking system, inspired by _The Legend of Zelda: Breath of the Wild_ and [Cuisine a la Card](https://boardgamegeek.com/boardgame/175541/cuisine-la-card).

(There's a lot of _Zelda_ in this demo and repo, which is of course a registered trademark of Nintendo, with whom I am not affiliated. Similarly, much of the ingredient metadata is based on _Cuisine a la Card_, a trademark of InMotion Software, and I'm not affiliated with them either. But I highly recommend buying and playing both games anyways!)

## How to mess with it

Just go to the GitHub pages site: https://dallonf.github.io/cooking-proto/ !

If you want to pull it down locally, clone the repo and run `yarn` (or `npm install`, if you're not on Yarn bandwagon yet), then `yarn start` (or, again, `npm start`). It's all written in TypeScript, so you'll probably want a good TS plugin for your editor of choice so you can jump around the codebase.

## How it works

Each ingredient has several traits, such as its culinary origin (one of the four major races [the ones that don't eat rocks, anyways] in _Breath of the Wild_), its flavor profile, and its nutritional emphasis.

They also have several different effects that can activate based on the properties of other ingredients. A _Negative Effect_ overrides a _Common Effect_, which in turn overrides a _Special Effect_.

## How I feel about the prototype

I like the general concept. It definitely encourages min-maxing and getting to know all of your ingredients, and you'll also probably wind up with a few favorite recipes. It's definitely more of a puzzle to put together a meal vs. _Zelda_, where you pretty much just pick things at random as long as they're in the same category (such as "Hearty").

However, this system is pretty complex, and could definitely bog down the pacing of any game that would include it. I think this system is even more complex than its other inspiration, _Cuisine a la Card_, which is a tabletop game all about min-maxing ingredient combinations! I see why Nintendo chose the simpler system.

Some improvements could be made, of course - I could focus more on cuisine groups, similar to _Cuisine_, and have ingredients with effects that trigger on very particualr combinations as more rare seasoning. I think the UI could also greatly benefit from some iconography - I avoided icons because it would be time-consuming for a prototype, but if I revisit this, it might be worth adding some.

The ability to produce food with _negative_ effects is a mistake, in retrospect. The player would never use it, although since it would have _some_ positive effects, they'd probably hoard it "just in case" they're in a pinch and it's better than nothing - resulting in a cluttered and full inventory. Better to make like Zelda and let even "Dubious Food" heal some hearts. Other, more specific debuffs (ex: a stealth penalty), could be replaced with cancelling out other good effects the meal might have.

One more thing - in a game with as many ingredients available as _Breath of the Wild_, a system like this would have a paralyzing number of combinations to consider. You would almost have to incorporate it into a minigame where you get only a small selection of your available ingredients can be chosen at a time. Maybe you would discover _new_ recipes via that minigame, but be able to re-create any recipe you've learned at anytime.