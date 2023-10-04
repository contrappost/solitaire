import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import deckBack from './images/Cards2/back_red_basic_white.png';
import back from './images/Cards2/back_black_basic_white.png';


import AceSpade from './images/Cards2/ace_spades_white.png'
import TwoSpade from './images/Cards2/2_spades_white.png'
import ThreeSpade from './images/Cards2/3_spades_white.png'
import FourSpade from './images/Cards2/4_spades_white.png'
import FiveSpade from './images/Cards2/5_spades_white.png'
import SixSpade from './images/Cards2/6_spades_white.png'
import SevenSpade from './images/Cards2/7_spades_white.png'
import EightSpade from './images/Cards2/8_spades_white.png'
import NineSpade from './images/Cards2/9_spades_white.png'
import TenSpade from './images/Cards2/10_spades_white.png'
import JackSpade from './images/Cards2/jack_spades_white.png'
import QueenSpade from './images/Cards2/queen_spades_white.png'
import KingSpade from './images/Cards2/king_spades_white.png'


import AceHeart from './images/Cards2/ace_hearts_white.png'
import TwoHeart from './images/Cards2/2_hearts_white.png'
import ThreeHeart from './images/Cards2/3_hearts_white.png'
import FourHeart from './images/Cards2/4_hearts_white.png'
import FiveHeart from './images/Cards2/5_hearts_white.png'
import SixHeart from './images/Cards2/6_hearts_white.png'
import SevenHeart from './images/Cards2/7_hearts_white.png'
import EightHeart from './images/Cards2/8_hearts_white.png'
import NineHeart from './images/Cards2/9_hearts_white.png'
import TenHeart from './images/Cards2/10_hearts_white.png'
import JackHeart from './images/Cards2/jack_hearts_white.png'
import QueenHeart from './images/Cards2/queen_hearts_white.png'
import KingHeart from './images/Cards2/king_hearts_white.png'


import AceDiamond from './images/Cards2/ace_diamonds_white.png'
import TwoDiamond from './images/Cards2/2_diamonds_white.png'
import ThreeDiamond from './images/Cards2/3_diamonds_white.png'
import FourDiamond from './images/Cards2/4_diamonds_white.png'
import FiveDiamond from './images/Cards2/5_diamonds_white.png'
import SixDiamond from './images/Cards2/6_diamonds_white.png'
import SevenDiamond from './images/Cards2/7_diamonds_white.png'
import EightDiamond from './images/Cards2/8_diamonds_white.png'
import NineDiamond from './images/Cards2/9_diamonds_white.png'
import TenDiamond from './images/Cards2/10_diamonds_white.png'
import JackDiamond from './images/Cards2/jack_diamonds_white.png'
import QueenDiamond from './images/Cards2/queen_diamonds_white.png'
import KingDiamond from './images/Cards2/king_diamonds_white.png'

import AceClub from './images/Cards2/ace_clubs_white.png'
import TwoClub from './images/Cards2/2_clubs_white.png'
import ThreeClub from './images/Cards2/3_clubs_white.png'
import FourClub from './images/Cards2/4_clubs_white.png'
import FiveClub from './images/Cards2/5_clubs_white.png'
import SixClub from './images/Cards2/6_clubs_white.png'
import SevenClub from './images/Cards2/7_clubs_white.png'
import EightClub from './images/Cards2/8_clubs_white.png'
import NineClub from './images/Cards2/9_clubs_white.png'
import TenClub from './images/Cards2/10_clubs_white.png'
import JackClub from './images/Cards2/jack_clubs_white.png'
import QueenClub from './images/Cards2/queen_clubs_white.png'
import KingClub from './images/Cards2/king_clubs_white.png'

import Heart from './images/Cards2/heart_blank.png'
import Spade from './images/Cards2/spade_blank.png'
import Club from './images/Cards2/club_blank.png'
import Diamond from './images/Cards2/diamond_blank.png'

import { CardSuit, CardValue } from '.';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    Back: new ImageSource(back),
    DeckBack: new ImageSource(deckBack),
    Heart: new ImageSource(Heart),
    Diamond: new ImageSource(Diamond),
    Club: new ImageSource(Club),
    Spade: new ImageSource(Spade)
}

const CardResources: {[key in CardSuit] : Record<CardValue, ImageSource>} = {
  Spade: {
    Ace: new ImageSource(AceSpade),
    Two: new ImageSource(TwoSpade),
    Three: new ImageSource(ThreeSpade),
    Four: new ImageSource(FourSpade),
    Five: new ImageSource(FiveSpade),
    Six: new ImageSource(SixSpade),
    Seven: new ImageSource(SevenSpade),
    Eight: new ImageSource(EightSpade),
    Nine: new ImageSource(NineSpade),
    Ten: new ImageSource(TenSpade),
    Jack: new ImageSource(JackSpade),
    Queen: new ImageSource(QueenSpade),
    King: new ImageSource(KingSpade),
  },
  Heart: {
    Ace: new ImageSource(AceHeart),
    Two: new ImageSource(TwoHeart),
    Three: new ImageSource(ThreeHeart),
    Four: new ImageSource(FourHeart),
    Five: new ImageSource(FiveHeart),
    Six: new ImageSource(SixHeart),
    Seven: new ImageSource(SevenHeart),
    Eight: new ImageSource(EightHeart),
    Nine: new ImageSource(NineHeart),
    Ten: new ImageSource(TenHeart),
    Jack: new ImageSource(JackHeart),
    Queen: new ImageSource(QueenHeart),
    King: new ImageSource(KingHeart),
  },
  Diamond: {
    Ace: new ImageSource(AceDiamond),
    Two: new ImageSource(TwoDiamond),
    Three: new ImageSource(ThreeDiamond),
    Four: new ImageSource(FourDiamond),
    Five: new ImageSource(FiveDiamond),
    Six: new ImageSource(SixDiamond),
    Seven: new ImageSource(SevenDiamond),
    Eight: new ImageSource(EightDiamond),
    Nine: new ImageSource(NineDiamond),
    Ten: new ImageSource(TenDiamond),
    Jack: new ImageSource(JackDiamond),
    Queen: new ImageSource(QueenDiamond),
    King: new ImageSource(KingDiamond),
  },
  Club: {
    Ace: new ImageSource(AceClub),
    Two: new ImageSource(TwoClub),
    Three: new ImageSource(ThreeClub),
    Four: new ImageSource(FourClub),
    Five: new ImageSource(FiveClub),
    Six: new ImageSource(SixClub),
    Seven: new ImageSource(SevenClub),
    Eight: new ImageSource(EightClub),
    Nine: new ImageSource(NineClub),
    Ten: new ImageSource(TenClub),
    Jack: new ImageSource(JackClub),
    Queen: new ImageSource(QueenClub),
    King: new ImageSource(KingClub),
  }
}

export { Resources, CardResources }
