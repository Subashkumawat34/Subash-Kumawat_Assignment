import escapeLava from '../assets/escape_the_lava.jpg';
import findColor from '../assets/find_the_color.jpg';
import redLight from '../assets/red_light_green_light.jpg';
import shooter from '../assets/shooter.jpg';

export const games = [
  {
    id: 'grid',
    name: 'Sharp Shooter',
    thumbnail: shooter,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    colors: ['#8b5cf6', '#06b6d4'],
    howToPlay: 'Navigate the grid, collect blue tiles, avoid obstacles!',
    stats: {
      players: '2 - 4',
      levels: '5+',
      age: '6+',
    },
    description: 'Navigate the neon grid, collect all blue tiles and survive pattern 1 and 2 to win!'
  },
  {
    id: 'find-the-color',
    name: 'Find The Color',
    thumbnail: findColor,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    colors: ['#3b82f6', '#ef4444'],
    howToPlay: 'Team 1 Red Color, Team 2 Blue Color',
    stats: {
      players: '2 - 6',
      duration: '3 mins',
      age: '6+',
    },
    description: 'Find and stand on the correct colored tile before time runs out. Team battle!'
  },
  {
    id: 'red-light-green-light',
    name: 'Red Light Green Light',
    thumbnail: redLight,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    colors: ['#22c55e', '#ef4444'],
    howToPlay: 'Move on Green Light, freeze on Red Light!',
    stats: {
      players: '2 - 4',
      levels: '10+',
      age: '6+',
    },
    description: 'Move when the light is green, stop when it turns red. Get caught moving and you\'re out!'
  },
  {
    id: 'escape-the-lava',
    name: 'Escape The Lava',
    thumbnail: escapeLava,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    colors: ['#f97316', '#ef4444'],
    howToPlay: 'Jump from platform to platform, avoid the rising lava!',
    stats: {
      players: '1 - 6',
      levels: '30+',
      age: '6+',
    },
    description: 'Race against the rising lava. Jump across platforms and avoid falling in!'
  },
];
