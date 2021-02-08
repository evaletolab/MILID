
// TODO: discuss i18n with client
namespace MILID {
  export enum ColorPalette{
    PINK,
    CYAN,
  }

  export enum AssetType
  {
      PNG = 'image/png',
      SVG = 'image/svg+xml',
      JPG = 'image/jpeg',
      MP4 = 'video/mp4',
      MP3 = 'audio/mpeg'
  }

  export interface Asset {
      type: AssetType;
      url: string;
  }

  export interface Config {
    
  }

  //
  // user
  export interface User {
    id: string | false;
    name: string;
    created: Date;
    updated?: Date;
  }


  //
  // Activities
  export type LessonActivity = VideoActivity | PodcastActivity | MarkdowActivity | GameActivity;

  export interface VideoActivity{

  }

  export interface PodcastActivity{
    
  }

  export interface MarkdowActivity{
    
  }

  //
  // Games 
  export type GameActivity = TinyGame | Quizz | Chart;

  export interface TinyGame {
    
  }

  export interface Quizz {

  }

  export interface Chart {

  }


  //
  // Lesson and module
  export enum LessonType {
    VIDEO ,
    PODCAST ,
    INFOGRAPHIC,
    GAME,
    MARKDOWN 
  }

  export enum LessonState 
  {
    TODO,
    DOING,
    DONE
  }

  export interface Lesson {
      type: LessonType;
      title: string;
      state: LessonState;
      description?: string;
      activity: LessonActivity
  }


  export interface Module {
      title: string;
      id: string;
      description: string;
      published: boolean;
      colors: ColorPalette;
      lessons: Lesson[];
  }
}

